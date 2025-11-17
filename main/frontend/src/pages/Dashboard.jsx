import React from 'react';

// All the CSS styles are embedded as a string within the component
const dashboardPageStyles = `
/* --- Global Styles --- */
:root {
  --dash-bg: #F0EDEE;
  --sidebar-bg-start: #1e3a8a;
  --sidebar-bg-end: #2563eb;
  --card-bg: rgba(255, 255, 255, 0.4);
  --text-primary: #1f2937;
  --text-secondary: #4b5563;
  --border-light: rgba(255, 255, 255, 0.2);
  --blue-primary: #2563eb;
  --blue-secondary: #60a5fa;
  --blue-light: #dbeafe;
  --violet-primary: #8b5cf6;
}

.dashboard-page {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background-color: var(--dash-bg);
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  /* FIXED: Remove height constraints that cause nested scrolling */
  position: relative;
  overflow-x: hidden;
}

/* --- Decorative Blur Circles --- */
.dashboard-page::before,
.dashboard-page::after {
  content: '';
  position: fixed; /* Changed to fixed to prevent scroll issues */
  width: 500px;
  height: 500px;
  border-radius: 50%;
  filter: blur(150px);
  z-index: 0;
  opacity: 0.3;
  pointer-events: none; /* Prevent interaction */
}
.dashboard-page::before {
  background: var(--blue-secondary);
  top: -100px;
  left: -100px;
}
.dashboard-page::after {
  background: #a5b4fc;
  bottom: -150px;
  right: -150px;
}

/* --- Main Content Area --- */
.dashboard-main {
  flex-grow: 1;
  padding: 2rem;
  /* FIXED: Remove overflow properties */
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  width: 100%;
}

/* --- Dashboard Grid --- */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(180px, auto);
  grid-gap: 1.5rem;
  
  /* FIXED: Ensure grid doesn't force container to overflow */
  min-height: 0;
  min-width: 0;
}

.dash-card {
  background-color: var(--card-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--border-light);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  
  /* FIXED: Prevent cards from causing overflow */
  min-height: 0;
  overflow: hidden;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}
.card-subtitle {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-top: -1rem;
  margin-bottom: 1.5rem;
}

/* --- BENTO GRID LAYOUT --- */
.dash-welcome {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  background-image: linear-gradient(100deg, rgba(219, 234, 254, 0.5), rgba(255, 255, 255, 0.3));
}
.dash-welcome p {
  color: var(--text-secondary);
}

.dash-calendar {
  grid-column: 3 / 5;
  grid-row: 1 / 3;
}

.dash-performance {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}

.dash-my-visit {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
}

.dash-new-graph {
  grid-column: 1 / 3;
  grid-row: 3 / 4;
}

.dash-mentor {
  grid-column: 1 / 3;
  grid-row: 4 / 5;
}

.dash-quiz {
  grid-column: 3 / 4;
  grid-row: 3 / 4;
}

.dash-upcoming {
  grid-column: 4 / 5;
  grid-row: 3 / 4;
}

/* --- Chart Placeholders --- */
.bar-chart-container {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 100%;
  min-height: 150px;
  border-bottom: 2px solid var(--border-light);
  padding-bottom: 0.5rem;
  flex-grow: 1;
}

.bar-chart-bar {
  width: 12%;
  background-color: var(--blue-primary);
  border-radius: 4px 4px 0 0;
  animation: growBar 1.5s ease-out;
}

@keyframes growBar {
  from { height: 0; }
}

/* Doughnut Charts */
.doughnut-charts-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 1rem;
  flex-grow: 1;
}

.doughnut-chart-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.doughnut-chart {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: spinIn 1s ease-out;
}

.doughnut-chart::before {
  content: '';
  position: absolute;
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(2px);
  border-radius: 50%;
  z-index: 1;
}

.doughnut-chart span {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--blue-primary);
  z-index: 2;
}

@keyframes spinIn {
  from { transform: rotate(-90deg); opacity: 0; }
  to { transform: rotate(0deg); opacity: 1; }
}

.doughnut-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
}

/* --- NEW COMPONENT STYLES --- */

/* New Progress Bars */
.progress-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  flex-grow: 1;
  justify-content: center;
}
.progress-item {
  width: 100%;
}
.progress-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
}
.progress-label span:first-child {
  color: var(--text-primary);
}
.progress-label span:last-child {
  color: var(--violet-primary);
}
.progress-bar-bg {
  width: 100%;
  height: 8px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
.progress-bar-fill {
  height: 100%;
  background-color: var(--violet-primary);
  border-radius: 4px;
  animation: fillBar 1.5s ease-out;
}
@keyframes fillBar {
  from { width: 0; }
}

/* Mentor Card */
.mentor-card-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1rem;
}
.mentor-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--violet-primary);
  flex-shrink: 0;
}
.mentor-details h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.25rem 0;
}
.mentor-details p {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0 0 1rem 0;
}
.mentor-connect-btn {
  background-color: var(--violet-primary);
  color: #fff;
  border: none;
  border-radius: 9999px;
  padding: 0.6rem 1.25rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}
.mentor-connect-btn:hover {
  opacity: 0.8;
}

/* Quiz Card */
.quiz-question {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}
.quiz-options {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}
.quiz-option-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid var(--border-light);
  color: var(--text-primary);
  padding: 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-align: left;
  transition: all 0.3s ease;
}
.quiz-option-btn:hover {
  background: rgba(255, 255, 255, 0.4);
  border-color: var(--blue-secondary);
}

/* --- Responsive --- */
@media (max-width: 1200px) {
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .dash-welcome,
  .dash-calendar,
  .dash-performance,
  .dash-my-visit,
  .dash-upcoming,
  .dash-new-graph,
  .dash-mentor,
  .dash-quiz {
    grid-column: span 2;
    grid-row: auto;
  }
}

@media (max-width: 900px) {
  .dashboard-main {
    padding: 1rem; /* Reduced padding on mobile */
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
    grid-gap: 1rem; /* Reduced gap on mobile */
  }
  
  .dash-welcome,
  .dash-calendar,
  .dash-performance,
  .dash-my-visit,
  .dash-upcoming,
  .dash-new-graph,
  .dash-mentor,
  .dash-quiz {
    grid-column: span 1;
    grid-row: auto;
  }
}
`;

const Dashboard = () => {
  // Placeholder data for charts
  const performanceData = [
    { label: 'Algo', value: 85 },
    { label: 'OOP', value: 64 },
    { label: 'DB', value: 82 },
    { label: 'Web', value: 40 },
    { label: 'ML', value: 75 },
  ];

  const visitData = [
    { label: 'Algo', value: 92 },
    { label: 'OOP', value: 83 },
    { label: 'DB', value: 78 },
  ];

  // Placeholder data for new graph
  const subjectProgressData = [
    { subject: 'Data Structures', value: 75 },
    { subject: 'Web Development', value: 40 },
    { subject: 'Machine Learning', value: 60 },
  ];

  return (
    <>
      <style>{dashboardPageStyles}</style>
      <div className="dashboard-page">
        {/* --- Main Content --- */}
        <main className="dashboard-main">
          {/* --- Dashboard Grid --- */}
          <div className="dashboard-grid">
            
            {/* Welcome Card */}
            <div className="dash-card dash-welcome">
              <h2 className="card-title">Hello Grace!</h2>
              <p>You have 3 new tasks. It's a lot of work for today! So let's start!</p>
            </div>

            {/* Calendar Card */}
            <div className="dash-card dash-calendar">
              <h2 className="card-title">Calendar</h2>
              <p>Placeholder for calendar widget...</p>
            </div>

            {/* Performance Card */}
            <div className="dash-card dash-performance">
              <h2 className="card-title">Performance</h2>
              <div className="bar-chart-container">
                {performanceData.map((item) => (
                  <div 
                    key={item.label}
                    className="bar-chart-bar"
                    style={{ height: `${item.value}%` }}
                    title={`${item.label}: ${item.value}%`}
                  ></div>
                ))}
              </div>
            </div>

            {/* My Visit Card */}
            <div className="dash-card dash-my-visit">
              <h2 className="card-title">My Visit</h2>
              <div className="doughnut-charts-container">
                {visitData.map((item) => (
                  <div className="doughnut-chart-wrapper" key={item.label}>
                    <div 
                      className="doughnut-chart"
                      style={{ background: `conic-gradient(var(--blue-primary) 0% ${item.value}%, rgba(229, 231, 235, 0.5) ${item.value}% 100%)` }}
                    >
                      <span>{item.value}%</span>
                    </div>
                    <span className="doughnut-label">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subject Progress Card */}
            <div className="dash-card dash-new-graph">
              <h2 className="card-title">Subject Progress</h2>
              <div className="progress-list">
                {subjectProgressData.map((item) => (
                  <div className="progress-item" key={item.subject}>
                    <div className="progress-label">
                      <span>{item.subject}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div 
                        className="progress-bar-fill"
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mentor Card */}
            <div className="dash-card dash-mentor">
              <h2 className="card-title">Featured Mentor</h2>
              <div className="mentor-card-content">
                <img 
                  src="https://placehold.co/100x100/a5b4fc/0D1127?text=Mentor" 
                  alt="Mentor Avatar"
                  className="mentor-avatar"
                />
                <div className="mentor-details">
                  <h4>Dr. Evelyn Reed</h4>
                  <p>Lead Data Scientist @ TechCorp</p>
                  <button className="mentor-connect-btn">View Profile</button>
                </div>
              </div>
            </div>

            {/* Upcoming Events Card */}
            <div className="dash-card dash-upcoming">
              <h2 className="card-title">Upcoming Events</h2>
              <p>Placeholder for upcoming events list...</p>
            </div>

            {/* Quiz Card */}
            <div className="dash-card dash-quiz">
              <h2 className="card-title">Quick Quiz</h2>
              <p className="quiz-question">What is the capital of Japan?</p>
              <div className="quiz-options">
                <button className="quiz-option-btn">A) Beijing</button>
                <button className="quiz-option-btn">B) Seoul</button>
                <button className="quiz-option-btn">C) Tokyo</button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;