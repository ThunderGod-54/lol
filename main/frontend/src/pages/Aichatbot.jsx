import React, { useState, useEffect, useRef } from "react";

// ---
const GEMINI_API_KEY = "lol paste ur api here"; // 👈 PASTE YOUR NEW KEY HERE

// 💡 FIX: Updated to the "2.5 model" as requested
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;


const Loader = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px', fontSize: '1em', fontWeight: '300', color: '#333' }}>
      <span style={{ display: 'inline-block', opacity: 0.4, animation: 'letterAnim 2s infinite', animationDelay: '0s' }}>L</span>
      <span style={{ display: 'inline-block', opacity: 0.4, animation: 'letterAnim 2s infinite', animationDelay: '0.1s' }}>o</span>
      <span style={{ display: 'inline-block', opacity: 0.4, animation: 'letterAnim 2s infinite', animationDelay: '0.2s' }}>a</span>
      <span style={{ display: 'inline-block', opacity: 0.4, animation: 'letterAnim 2s infinite', animationDelay: '0.3s' }}>d</span>
      <span style={{ display: 'inline-block', opacity: 0.4, animation: 'letterAnim 2s infinite', animationDelay: '0.4s' }}>i</span>
      <span style={{ display: 'inline-block', opacity: 0.4, animation: 'letterAnim 2s infinite', animationDelay: '0.5s' }}>n</span>
      <span style={{ display: 'inline-block', opacity: 0.4, animation: 'letterAnim 2s infinite', animationDelay: '0.6s' }}>g</span>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', aspectRatio: '1/1', borderRadius: '50%', animation: 'loaderRotate 2s linear infinite' }}></div>
    </div>
  </div>
);

const Watermark = () => (
  <div style={{ position: 'static', transform: 'none', marginBottom: '20px' }}>
    <p style={{ padding: '8px 16px', borderRadius: '12px', fontSize: '0.9em', background: 'rgba(255, 255, 255, 0.8)', color: '#555', border: '1px solid #ddd' }}>
      Your AI study companion with Follow on feature!
    </p>
  </div>
);

const PromptSuggestions = () => {
  const suggestions = ["Study Tips...", "Homework Help...", "Exam Prep...", "Concept Explanation...", "Study Schedule..."];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIndex(prev => (prev + 1) % suggestions.length), 1500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '2em', fontWeight: '500', color: '#333' }}>
        Ask about, <span key={index} style={{ display: 'inline-block', background: 'linear-gradient(90deg, #4facfe, #00f2fe)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'suggestionFade 1.5s ease-in-out forwards' }}>{suggestions[index]}</span>
      </h2>
    </div>
  );
};

const BubbleActions = ({ messageText, showNotification }) => {
  const handleCopy = () => { navigator.clipboard.writeText(messageText); showNotification(" ✔️  Copied to clipboard"); };
  const handleShare = async () => {
    if (!navigator.share) { showNotification("Share feature not available."); return; }
    try { await navigator.share({ title: "Chat Message", text: messageText }); } catch (error) { showNotification("Could not share content."); }
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 8px', marginTop: '8px', opacity: 0, transition: 'opacity 0.2s ease-in-out' }} className="bubble-actions">
      <button onClick={handleCopy} title="Copy" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px', lineHeight: 0 }}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button>
      <button onClick={() => showNotification("Feedback submitted")} title="Like" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px', lineHeight: 0 }}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg></button>
      <button onClick={handleShare} title="Share" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px', lineHeight: 0 }}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg></button>
    </div>
  );
};

function Aichatbot() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "" });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  const [menuId, setMenuId] = useState(null);
  
  const menuRef = useRef(null);

  // API Key and URL are now defined at the top of the file
  
  const SYSTEM_INSTRUCTION = `You are a helpful AI study assistant focused on helping students learn. Your expertise includes: homework help, study techniques, exam preparation, concept explanations, and academic guidance.
- Always be encouraging and patient with students
- Break down complex topics into simple explanations
- Provide examples when explaining concepts
- If asked about non-academic topics, politely redirect to study-related questions
- You can respond to simple greetings like "hello", "hi", or "how are you?"`;

  const activeChat = chats.find(chat => chat.id === activeChatId);
  const isChatEmpty = !activeChat || activeChat.history.length === 0;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setMenuId(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showNotification = (msg) => {
    setNotification({ show: true, message: msg });
    setTimeout(() => setNotification({ show: false, message: "" }), 2500);
  };

  const createNewChat = () => {
    const newChatId = Date.now();
    const newChat = { id: newChatId, title: `Chat ${chats.length + 1}`, history: [] };
    setChats(prev => [...prev, newChat]);
    setActiveChatId(newChatId);
  };

  const updateActiveChatHistory = (newHistory) => {
    setChats(prevChats => prevChats.map(chat =>
      chat.id === activeChatId ? { ...chat, history: newHistory } : chat
    ));
  };

  const sendMessage = async () => {
    if (!message.trim() || isLoading || !activeChat) return;

    // Check if API key is set
    if (GEMINI_API_KEY === "YOUR_NEW_GOOGLE_AI_STUDIO_API_KEY") {
      const errorHistory = [...activeChat.history, { type: "bot", text: "Error: API key not set. Please add your API key at the top of the Aichatbot.js file." }];
      updateActiveChatHistory(errorHistory);
      return;
    }

    const newMessage = { type: "user", text: message };
    const newHistoryForUI = [...activeChat.history, newMessage];
    updateActiveChatHistory(newHistoryForUI);

    const historyForAPI = newHistoryForUI.map(msg => {
      if (msg.isFollowOn) {
        return {
          role: 'user',
          parts: [{ text: `Please use the following JSON data as the context for our entire conversation. This is the history from a previous chat. Context: ${msg.text}` }]
        };
      }
      return {
        role: msg.type === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      };
    }).filter(msg => msg.parts[0].text);

    setMessage("");
    setIsLoading(true);
    const timer = new Promise(resolve => setTimeout(resolve, 1000));
    
    // 1. Create the system prompt object
    const systemPrompt = {
      role: 'user', 
      parts: [{ text: `System Instruction: ${SYSTEM_INSTRUCTION}` }]
    };
    
    // 2. Create a "priming" response from the model so the history is valid
    const modelPrimer = {
      role: 'model',
      parts: [{ text: "Understood. I am ready to help." }]
    };

    // 3. Combine them: System Prompt + Primer + Actual Chat History
    let contentsForAPI = [];
    if (activeChat.history.length === 0) { // This means newHistoryForUI only has 1 message
      contentsForAPI = [systemPrompt, modelPrimer, ...historyForAPI];
    } else {
      // Always prepend the system prompt and primer to maintain context
      contentsForAPI = [systemPrompt, modelPrimer, ...historyForAPI];
    }
    
    try {
      const requestBody = {
        contents: contentsForAPI,
      };

      const fetchRequest = fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const [res] = await Promise.all([fetchRequest, timer]);
      if (!res.ok) {
        const errorBody = await res.json();
        console.error("API Error:", errorBody);
        if (errorBody.error.message.includes("API key not valid")) {
          throw new Error("API key not valid. Please pass a valid API key.");
        }
        if (errorBody.error.message.includes("is not found for API version")) {
            throw new Error(`Model/API version mismatch. Check your GEMINI_API_URL. (Details: ${errorBody.error.message})`);
        }
        if (errorBody.error.message.includes("Invalid JSON payload")) {
            throw new Error(`Invalid JSON payload. Check the request body structure. (Details: ${errorBody.error.message})`);
        }
        throw new Error(`API request failed: ${errorBody.error.message}`);
      }
      const data = await res.json();
      const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response.";
      const updatedHistoryWithBot = [...newHistoryForUI, { type: "bot", text: botReply }];
      updateActiveChatHistory(updatedHistoryWithBot);
    } catch (error) {
      console.error(error);
      const updatedHistoryWithError = [...newHistoryForUI, { type: "bot", text: `Error: Could not process request. ${error.message}` }];
      updateActiveChatHistory(updatedHistoryWithError);
    } finally {
      setIsLoading(false);
    }
  };

  const renameChat = (id, newTitle) => {
    setChats(prev => prev.map(chat => chat.id === id ? { ...chat, title: newTitle || chat.title } : chat));
  };

  const deleteChat = (idToDelete) => {
    const remainingChats = chats.filter(chat => chat.id !== idToDelete);
    setChats(remainingChats);
    if (activeChatId === idToDelete) {
      setActiveChatId(remainingChats.length > 0 ? remainingChats[0].id : null);
    }
  };

  const createFollowOnChat = (sourceChatId) => {
    const sourceChat = chats.find(chat => chat.id === sourceChatId);
    if (!sourceChat) return;

    const historyJson = JSON.stringify(sourceChat.history, null, 2);
    const contextMessage = {
      type: 'bot',
      text: historyJson,
      isFollowOn: true
    };

    const newChatId = Date.now();
    const newChat = {
      id: newChatId,
      title: `Follow-on: ${sourceChat.title}`,
      history: [contextMessage]
    };

    setChats(prev => [...prev, newChat]);
    setActiveChatId(newChatId);
  };

  const handleRename = (id, currentTitle) => {
    setEditingId(id);
    setRenameValue(currentTitle);
    setMenuId(null);
  };

  const onRenameSubmit = (e, id) => {
    if (e) e.preventDefault();
    renameChat(id, renameValue);
    setEditingId(null);
  };

  return (
    <>
      <style>{`
        @keyframes loaderRotate {
          0% { transform: rotate(90deg); boxShadow: 0 5px 10px 0 #fff inset, 0 10px 15px 0 #ad5fff inset, 0 30px 30px 0 #471eec inset; }
          50% { transform: rotate(270deg); boxShadow: 0 5px 10px 0 #fff inset, 0 10px 5px 0 #d60a47 inset, 0 20px 30px 0 #311e80 inset; }
          100% { transform: rotate(450deg); boxShadow: 0 5px 10px 0 #fff inset, 0 10px 15px 0 #ad5fff inset, 0 30px 30px 0 #471eec inset; }
        }
        @keyframes letterAnim {
          0%, 100% { opacity: 0.4; transform: translateY(0); }
          20% { opacity: 1; transform: scale(1.15); }
          40% { opacity: 0.7; transform: translateY(0); }
        }
        @keyframes suggestionFade {
          0% { opacity: 0; transform: translateY(10px); }
          20%, 80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; transform: translate(-50%, -10px); }
          10%, 90% { opacity: 1; transform: translate(-50%, 0); }
        }
        .chat-bubble-wrapper:hover .bubble-actions {
          opacity: 1 !important;
        }
        .sidebar-chat-item:hover .chat-menu-btn {
          opacity: 1 !important;
        }
      `}</style>
      
      <div style={{ display: 'flex', height: 'calc(100vh - 80px)', background: '#F0EDEE', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', overflow: 'hidden' }}>
        
        {/* Notification */}
        {notification.show && (
          <div style={{ position: 'fixed', top: '100px', left: '50%', transform: 'translateX(-50%)', padding: '12px 24px', borderRadius: '8px', fontWeight: '500', zIndex: 1000, animation: 'fadeInOut 2s ease-in-out', background: '#fff', color: '#333', border: '1px solid #ddd', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
            {notification.message}
          </div>
        )}

        {/* Sidebar */}
        <aside style={{ width: isSidebarCollapsed ? '80px' : '300px', height: '100%', display: 'flex', flexDirection: 'column', padding: '15px', boxSizing: 'border-box', transition: 'width 0.3s ease', background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(15px)', borderRight: '1px solid rgba(0, 0, 0, 0.1)', flexShrink: 0 }}>
          
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <button onClick={createNewChat} style={{ width: '100%', padding: '12px', border: 'none', borderRadius: '8px', color: 'white', fontSize: '1em', cursor: 'pointer', transition: 'background 0.3s', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: isSidebarCollapsed ? 'center' : 'flex-start', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
              <span>+</span>
              {!isSidebarCollapsed && <span>New Chat</span>}
            </button>
            <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#888', padding: '5px', lineHeight: 0, marginLeft: '10px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
            </button>
          </div>

          {/* Chat History */}
          <div style={{ flexGrow: 1, overflowY: 'auto', marginBottom: '20px', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            {!isSidebarCollapsed && <p style={{ color: '#444', marginBottom: '10px', fontSize: '0.9em', fontWeight: '600' }}>Chat History</p>}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {chats.map(chat => (
                <li key={chat.id} className="sidebar-chat-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '8px', position: 'relative', background: chat.id === activeChatId ? 'rgba(79, 172, 254, 0.1)' : 'transparent', marginBottom: '4px', transition: 'background 0.2s' }} onMouseEnter={(e) => !editingId && (e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)')} onMouseLeave={(e) => !editingId && chat.id !== activeChatId && (e.currentTarget.style.background = 'transparent')}>
                  {editingId === chat.id ? (
                    <div style={{ width: '100%', padding: '8px' }}>
                      <input type="text" value={renameValue} onChange={(e) => setRenameValue(e.target.value)} onBlur={(e) => onRenameSubmit(e, chat.id)} onKeyDown={(e) => e.key === 'Enter' && onRenameSubmit(e, chat.id)} autoFocus style={{ width: '100%', padding: '8px 10px', borderRadius: '5px', fontFamily: 'inherit', fontSize: '0.9em', boxSizing: 'border-box', background: '#fff', border: '2px solid #4facfe', color: '#1c1e21', outline: 'none' }} />
                    </div>
                  ) : (
                    <>
                      <button onClick={() => setActiveChatId(chat.id)} style={{ padding: '10px', textDecoration: 'none', transition: 'color 0.2s', flexGrow: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#444', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '0.95em' }}>
                        {!isSidebarCollapsed && chat.title}
                      </button>
                      {!isSidebarCollapsed && (
                        <div style={{ position: 'relative' }}>
                          <button className="chat-menu-btn" onClick={() => setMenuId(menuId === chat.id ? null : chat.id)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: '8px', opacity: 0, transition: 'opacity 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'} onMouseLeave={(e) => e.currentTarget.style.background = 'none'}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                          </button>
                          {menuId === chat.id && (
                            <div ref={menuRef} style={{ position: 'absolute', right: '5px', top: '35px', zIndex: 10, width: '180px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', padding: '8px', background: '#ffffff', border: '1px solid #ddd' }}>
                              <button onClick={() => createFollowOnChat(chat.id)} style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '10px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '0.9em', borderRadius: '8px', color: '#333' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f0f0f0'} onMouseLeave={(e) => e.currentTarget.style.background = 'none'}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 14 20 9 15 4"></polyline><path d="M4 20v-7a4 4 0 0 1 4-4h12"></path></svg> Follow-on
                              </button>
                              <button onClick={() => handleRename(chat.id, chat.title)} style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '10px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '0.9em', borderRadius: '8px', color: '#333' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f0f0f0'} onMouseLeave={(e) => e.currentTarget.style.background = 'none'}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Rename
                              </button>
                              <div style={{ height: '1px', margin: '5px 0', background: '#ddd' }}></div>
                              <button onClick={() => { deleteChat(chat.id); setMenuId(null); }} style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '10px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '0.9em', borderRadius: '8px', color: '#d32f2f' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#ffebee'; }} onMouseLeave={(e) => e.currentTarget.style.background = 'none'}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Chat Area */}
        <main style={{ flexGrow: 1, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          
          {/* Chat Window */}
          <div style={{ flexGrow: 1, overflowY: 'auto', padding: '20px', paddingBottom: '140px' }}>
            {isChatEmpty ? (
              <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px', minHeight: '60vh' }}>
                <Watermark />
                <PromptSuggestions />
              </div>
            ) : (
              activeChat && activeChat.history.map((chat, idx) => (
                <div key={idx} className="chat-bubble-wrapper" style={{ display: 'flex', flexDirection: 'column', margin: '10px 0', maxWidth: '75%', position: 'relative', alignItems: chat.type === 'user' ? 'flex-end' : 'flex-start', marginLeft: chat.type === 'user' ? 'auto' : '0', marginRight: chat.type === 'user' ? '0' : 'auto' }}>
                  <div style={{ padding: '15px 20px', borderRadius: '20px', lineHeight: '1.5', wordWrap: 'break-word', width: 'fit-content', background: chat.type === 'user' ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' : '#fff', color: chat.type === 'user' ? 'white' : '#1c1e21', borderBottomRightRadius: chat.type === 'user' ? '5px' : '20px', borderBottomLeftRadius: chat.type === 'bot' ? '5px' : '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                    {chat.isFollowOn ? (
                      <details style={{ backgroundColor: 'rgba(79, 172, 254, 0.1)', borderRadius: '8px', border: '1px solid rgba(79, 172, 254, 0.3)', padding: '5px' }}>
                        <summary style={{ padding: '10px 15px', fontWeight: 'bold', cursor: 'pointer', outline: 'none', color: '#4facfe' }}>📚 Context from previous chat (click to view)</summary>
                        <pre style={{ padding: '0 15px 15px 15px', marginTop: '5px', backgroundColor: 'rgba(0, 0, 0, 0.03)', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px', whiteSpace: 'pre-wrap', wordBreak: 'break-all', maxHeight: '200px', overflowY: 'auto', fontSize: '0.85em' }}>{chat.text}</pre>
                      </details>
                    ) : (
                      chat.text
                    )}
                  </div>
                  {chat.text && !chat.isFollowOn && <BubbleActions messageText={chat.text} showNotification={showNotification} />}
                </div>
              ))
            )}
          </div>

          {/* Input Area */}
          {activeChat && (
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(to top, #F0EDEE 80%, transparent)' }}>
              {isLoading && <Loader />}
              <div style={{ width: '100%', maxWidth: '700px' }}>
                <div style={{ display: 'flex', position: 'relative', alignItems: 'center', minHeight: '60px', borderRadius: '15px', padding: '0 10px', transition: 'box-shadow 0.3s, border-color 0.3s', border: '2px solid rgba(79, 172, 254, 0.3)', background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', boxShadow: '0 4px 12px rgba(79, 172, 254, 0.15)' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(79, 172, 254, 0.6)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(79, 172, 254, 0.25)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(79, 172, 254, 0.3)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(79, 172, 254, 0.15)'; }}>
                  <input 
                    type="text" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()} 
                    placeholder="Type your message..."
                    disabled={isLoading}
                    style={{ flexGrow: 1, height: '100%', padding: '15px', border: 'none', background: 'transparent', fontSize: '1em', outline: 'none', color: '#1c1e21', fontFamily: 'inherit' }}
                  />
                  <button 
                    onClick={sendMessage} 
                    disabled={isLoading || !message.trim()} 
                    style={{ 
                      background: isLoading || !message.trim() ? '#ccc' : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', 
                      border: 'none', 
                      fontSize: '1.2em', 
                      cursor: isLoading || !message.trim() ? 'not-allowed' : 'pointer', 
                      padding: '10px 20px', 
                      fontWeight: 'bold', 
                      color: 'white',
                      borderRadius: '10px',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      boxShadow: '0 2px 8px rgba(79, 172, 254, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isLoading && message.trim()) {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(79, 172, 254, 0.5)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(79, 172, 254, 0.3)';
                    }}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default Aichatbot;