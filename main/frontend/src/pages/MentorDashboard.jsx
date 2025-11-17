import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Calendar, TrendingUp, Clock, BarChart3, GraduationCap, Zap } from 'lucide-react';

// --- Dashboard CSS Styles ---
// Ensure the closing backtick (`) is present at the end of this string!
const dashboardPageStyles = `
/* --- Global Styles --- */
:root {
    --primary-color: #007bff;
    --secondary-color: #28a745;
    --text-color: #333;
    --card-bg: #ffffff;
    --dash-bg: #F0EDEE; 
    --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dashboard-page {
    min-height: 100vh;
    background-color: var(--dash-bg);
    padding: 2rem 0;
    font-family: Arial, sans-serif;
}

.dashboard-header {
    max-width: 1200px;
    margin: 0 auto 2rem;
    padding: 0 1.5rem;
    text-align: left;
    color: var(--text-color);
}

.dashboard-header h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    border-bottom: 3px solid var(--primary-color);
    display: inline-block;
    padding-bottom: 5px;
}

/* --- Dashboard Grid Layout --- */
.dashboard-grid {
    display: grid;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
}

/* Specific item placement for a balanced look */
.dash-welcome { grid-column: span 3; }
.dash-stats { grid-column: span 3; display: grid; grid-template-columns: repeat(4, 1fr); grid-gap: 20px; }
.dash-calendar { grid-column: span 1; }
.dash-performance { grid-column: span 2; }
.dash-upcoming { grid-column: span 2; }
.dash-quiz { grid-column: span 1; }

/* --- Card Styles --- */
.dashboard-card {
    background-color: var(--card-bg);
    border-radius: 12px;
    box-shadow: var(--shadow);
    padding: 1.5rem;
    transition: transform 0.2s;
    min-height: 200px;
    display: flex;
    flex-direction: column;
}

.dashboard-card:hover {
    transform: translateY(-5px);
}

.card-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--primary-color);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
}

.card-title svg {
    margin-right: 8px;
    color: var(--secondary-color);
}

.welcome-message {
    font-size: 1.1rem;
    line-height: 1.6;
}

.stat-item {
    text-align: center;
    padding: 1rem;
    border-radius: 8px;
    background: #f8f9fa;
    border: 1px solid #eee;
}

.stat-value {
    font-size: 2rem;
    font-weight: bold;
    color: var(--primary-color);
}

.stat-label {
    font-size: 0.9rem;
    color: #6c757d;
}

.placeholder-list li {
    padding: 0.5rem 0;
    border-bottom: 1px dashed #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* --- Responsive Design --- */
@media (max-width: 992px) {
    .dashboard-grid {
        grid-template-columns: 1fr;
        grid-gap: 1.5rem;
    }
    .dash-welcome,
    .dash-calendar,
    .dash-performance,
    .dash-upcoming,
    .dash-quiz {
        grid-column: span 1;
    }
    .dash-stats { 
        grid-column: span 1; 
        grid-template-columns: repeat(2, 1fr); 
    }
}

@media (max-width: 600px) {
    .dashboard-header h1 {
        font-size: 2rem;
    }
    .dash-stats { 
        grid-template-columns: 1fr; 
    }
}
`; // <-- THE CRITICAL CLOSING BACKTICK IS HERE

// --- React Component ---

const MentorDashboard = () => {
    // State for dashboard data (simulated)
    const [mentorData, setMentorData] = useState({
        name: 'Rajashekhar',
        totalStudents: 45,
        coursesMentored: 5,
        activeSessions: 3,
        performanceScore: 8.7,
        upcomingEvents: [
            { id: 1, title: 'Code Review Session', time: 'Mon, 3 PM' },
            { id: 2, title: 'Student Progress Meeting', time: 'Tue, 11 AM' },
        ],
    });

    // You can use useEffect to fetch real data here
    useEffect(() => {
        // fetchMentorData().then(data => setMentorData(data));
    }, []);

    // Helper component for a single stat block
    const StatCard = ({ icon: Icon, value, label, color }) => (
        <div className="stat-item" style={{ borderLeft: `5px solid ${color}` }}>
            <Icon size={30} color={color} />
            <div className="stat-value">{value}</div>
            <div className="stat-label">{label}</div>
        </div>
    );

    return (
        <div className="dashboard-page">
            {/* Inject CSS styles into the document head */}
            <style>{dashboardPageStyles}</style>

            <header className="dashboard-header">
                <h1>Mentor Dashboard</h1>
            </header>
            
            <div className="dashboard-grid">

                {/* Welcome Card */}
                <div className="dashboard-card dash-welcome">
                    <div className="card-title"><GraduationCap size={20} /> Welcome Back, {mentorData.name}!</div>
                    <p className="welcome-message">
                        You are doing great work mentoring your students. Check your progress, upcoming events, and student performance metrics below.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="dash-stats">
                    <StatCard 
                        icon={Users} 
                        value={mentorData.totalStudents} 
                        label="Total Students" 
                        color="#007bff" 
                    />
                    <StatCard 
                        icon={BookOpen} 
                        value={mentorData.coursesMentored} 
                        label="Courses Mentored" 
                        color="#28a745" 
                    />
                    <StatCard 
                        icon={Clock} 
                        value={mentorData.activeSessions} 
                        label="Active Sessions" 
                        color="#ffc107" 
                    />
                    <StatCard 
                        icon={TrendingUp} 
                        value={`${mentorData.performanceScore}/10`} 
                        label="Performance Score" 
                        color="#dc3545" 
                    />
                </div>

                {/* Upcoming Events/Calendar Card */}
                <div className="dashboard-card dash-upcoming">
                    <div className="card-title"><Calendar size={20} /> Upcoming Events</div>
                    <ul className="placeholder-list" style={{ listStyleType: 'none', padding: 0 }}>
                        {mentorData.upcomingEvents.map(event => (
                            <li key={event.id}>
                                <span>{event.title}</span>
                                <span style={{ color: '#6c757d', fontWeight: 'bold' }}>{event.time}</span>
                            </li>
                        ))}
                        {mentorData.upcomingEvents.length === 0 && <p style={{ textAlign: 'center', color: '#6c757d' }}>No upcoming events.</p>}
                    </ul>
                </div>
                
                {/* Performance Card */}
                <div className="dashboard-card dash-performance">
                    <div className="card-title"><BarChart3 size={20} /> Student Performance Snapshot</div>
                    <p>A graph of average student scores would typically go here.</p>
                </div>

                {/* Quiz/New Graph Card */}
                <div className="dashboard-card dash-quiz">
                    <div className="card-title"><Zap size={20} /> Quick Links</div>
                    <ul className="placeholder-list" style={{ listStyleType: 'none', padding: 0 }}>
                        <li>View Full Student List</li>
                        <li>Create New Course</li>
                        <li>Access AI Chatbot</li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default MentorDashboard;