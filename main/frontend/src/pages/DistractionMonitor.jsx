import { useRef, useState, useEffect } from "react";
import "../monitor.css";

export default function DistractionMonitor() {
    const videoRef = useRef(null);
    const statusRef = useRef(null);

    const faceLandmarkerRef = useRef(null);
    const audioContextRef = useRef(null);

    const lastVideoTimeRef = useRef(-1);
    const closedFramesRef = useRef(0);
    const noFaceFramesRef = useRef(0);

    // Focus Session states
    const [sessionStarted, setSessionStarted] = useState(false);

    // Timer states
    const [focusMode, setFocusMode] = useState(false);
    const [running, setRunning] = useState(false);
    const [userMinutes, setUserMinutes] = useState(25);
    const [remaining, setRemaining] = useState(25 * 60);
    const timerRef = useRef(null);

    const EAR_THRESHOLD = 0.32;
    const CLOSED_FRAME_LIMIT = 8;
    const NO_FACE_LIMIT = 40;

    // Auto-start timer when session starts
    useEffect(() => {
        if (focusMode) {
            setRemaining(userMinutes * 60);
            setRunning(true);
        } else {
            setRunning(false);
        }
    }, [focusMode, userMinutes]);

    // Countdown logic
    useEffect(() => {
        if (!running) {
            if (timerRef.current) clearInterval(timerRef.current);
            timerRef.current = null;
            return;
        }

        timerRef.current = setInterval(() => {
            setRemaining((r) => {
                if (r <= 1) {
                    clearInterval(timerRef.current);
                    timerRef.current = null;
                    setRunning(false);
                    setFocusMode(false);
                    return 0;
                }
                return r - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [running]);

    const formatTime = (s) => {
        const m = String(Math.floor(s / 60)).padStart(2, "0");
        const sec = String(s % 60).padStart(2, "0");
        return `${m}:${sec}`;
    };

    // --------------------------
    // CAMERA START + MEDIAPIPE
    // --------------------------
    async function startCameraAndFocus() {
        setSessionStarted(true);
        setFocusMode(true);

        const btn = document.getElementById("start-focus-btn");
        if (btn) {
            btn.innerText = "Loading…";
            btn.disabled = true;
        }

        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();

        const vision = await window.FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        faceLandmarkerRef.current = await window.FaceLandmarker.createFromOptions(
            vision,
            {
                baseOptions: {
                    modelAssetPath:
                        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
                    delegate: "GPU",
                },
                runningMode: "VIDEO",
                numFaces: 1,
            }
        );

        enableCamera();

        if (btn) btn.style.display = "none"; // Hide after start
    }

    function enableCamera() {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                if (!videoRef.current) return;
                videoRef.current.srcObject = stream;

                videoRef.current.onloadeddata = () => {
                    predictWebcam();
                };
            })
            .catch((err) => {
                console.error("getUserMedia error:", err);
                if (statusRef.current) {
                    statusRef.current.innerText = "Camera permission required";
                    statusRef.current.className = "status warn";
                }
            });
    }

    // ------------------------
    // STOP CAMERA + RESET PAGE
    // ------------------------
    function endFocusSession() {
        const cam = videoRef.current?.srcObject;
        if (cam) cam.getTracks().forEach((track) => track.stop());
        if (videoRef.current) videoRef.current.srcObject = null;

        setSessionStarted(false);
        setFocusMode(false);
        setRunning(false);
        setRemaining(25 * 60);
        setUserMinutes(25);

        lastVideoTimeRef.current = -1;
        closedFramesRef.current = 0;
        noFaceFramesRef.current = 0;

        if (statusRef.current) {
            statusRef.current.innerText = "Start focusing!";
            statusRef.current.className = "status idle";
        }
    }

    function playBeep() {
        const ctx = audioContextRef.current;
        if (!ctx) return;

        const osc = ctx.createOscillator();
        osc.frequency.value = 600;
        osc.connect(ctx.destination);
        osc.start();
        setTimeout(() => osc.stop(), 160);
    }

    function getDistance(a, b) {
        return Math.sqrt(
            (a.x - b.x) ** 2 +
            (a.y - b.y) ** 2 +
            (a.z - b.z) ** 2
        );
    }

    function getEAR(eye) {
        if (!eye || eye.length < 6) return NaN;
        return (
            (getDistance(eye[1], eye[5]) + getDistance(eye[2], eye[4])) /
            (2.0 * getDistance(eye[0], eye[3]))
        );
    }

    // ------------------------
    // Detection loop
    // ------------------------
    // EAR smoothing buffer
let earHistory = [];
const EAR_SMOOTHING = 5; // average of last 5 frames

async function predictWebcam() {
    const video = videoRef.current;
    const faceLandmarker = faceLandmarkerRef.current;

    if (!video || !faceLandmarker) {
        requestAnimationFrame(predictWebcam);
        return;
    }

    if (video.currentTime === lastVideoTimeRef.current) {
        requestAnimationFrame(predictWebcam);
        return;
    }
    lastVideoTimeRef.current = video.currentTime;

    let result;
    try {
        result = await faceLandmarker.detectForVideo(video, performance.now());
    } catch (err) {
        console.error("detectForVideo error:", err);
        requestAnimationFrame(predictWebcam);
        return;
    }

    const hasFace = result && result.faceLandmarks && result.faceLandmarks.length > 0;

    // ---------- NO FACE ----------
    if (!hasFace) {
        noFaceFramesRef.current++;

        if (statusRef.current) {
            statusRef.current.innerText = "No Face Detected";
            statusRef.current.className = "status warn";
        }

        if (noFaceFramesRef.current > NO_FACE_LIMIT) playBeep();

        requestAnimationFrame(predictWebcam);
        return;
    }

    noFaceFramesRef.current = 0;

    // ---------- EAR CALCULATION ----------
    const lm = result.faceLandmarks[0];

    const leftEye = [
        lm[33], lm[160], lm[158], lm[133], lm[153], lm[144]
    ];
    const rightEye = [
        lm[263], lm[387], lm[385], lm[362], lm[380], lm[373]
    ];

    const leftEAR = getEAR(leftEye);
    const rightEAR = getEAR(rightEye);
    let avgEAR = (leftEAR + rightEAR) / 2;

    // ---------- EAR SMOOTHING ----------
    earHistory.push(avgEAR);
    if (earHistory.length > EAR_SMOOTHING) {
        earHistory.shift();
    }
    avgEAR = earHistory.reduce((a, b) => a + b, 0) / earHistory.length;

    // ---------- CLOSED EYE SYSTEM WITH 2 SECOND THRESHOLD ----------
    const CLOSED_FRAMES_2SECONDS = 60; // assuming 30 FPS

    if (avgEAR < EAR_THRESHOLD) {
        closedFramesRef.current++;

        if (statusRef.current) {
            statusRef.current.innerText = "Eyes Closed";
            statusRef.current.className = "status warn";
        }

        // RING ONLY AFTER 2 SECONDS OF CONTINUOUS CLOSURE
        if (closedFramesRef.current >= CLOSED_FRAMES_2SECONDS) {
            playBeep();
        }

    } else {
        // Eyes open: reset counter
        closedFramesRef.current = 0;

        if (statusRef.current) {
            statusRef.current.innerText = "Focused";
            statusRef.current.className = "status ok";
        }
    }

    requestAnimationFrame(predictWebcam);
}



    return (
        <div className="monitor-container">
            <div className="monitor-card">

                {/* STATUS */}


                {/* CAMERA VIDEO */}
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="monitor-video"
                ></video>

                {/* BEFORE SESSION STARTS */}
                {!sessionStarted && (
                    <div className="focus-row">
                        <div className="preset-row">
                            <button className="preset-btn" onClick={() => setUserMinutes(25)}>25 min</button>
                            <button className="preset-btn" onClick={() => setUserMinutes(50)}>50 min</button>
                            <button className="preset-btn" onClick={() => setUserMinutes(90)}>90 min</button>
                        </div>

                        <button
                            id="start-focus-btn"
                            className="focus-btn"
                            onClick={startCameraAndFocus}
                        >
                            Start Focus Session
                        </button>
                    </div>
                )}

                {/* DURING FOCUS SESSION */}
                {sessionStarted && (
                    <div className="session-controls">

                        {/* PAUSE BUTTON */}
                        <button
                            className="pause-btn"
                            onClick={() => setRunning((prev) => !prev)}
                        >
                            {running ? "Pause" : "Resume"}
                        </button>

                        <button className="end-btn" onClick={endFocusSession}>
                            End Focus Session
                        </button>
                    </div>
                )}

                {/* TIMER */}
                <div className="timer-box">
                    ⏱ {formatTime(remaining)}
                </div>
            </div>
        </div>
    );
}