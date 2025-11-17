import React from 'react';

const teamMembers = [
  {
    name: 'Rishabh',
    role: 'Team Lead & Full-Stack Developer',
    description: 'Leads development, integrates features, and ensures smooth end-to-end delivery.',
    avatar: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Rishabh'
  },
  {
    name: 'Sammed P',
    role: 'Frontend & OpenCV Integration',
    description: 'Crafts the UI and handles real-time face tracking with OpenCV and MediaPipe.',
    avatar: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Sammed'
  },
  {
    name: 'Pruthviraj',
    role: 'Business Model & Data Research',
    description: 'Designs the business strategy and curates data for impactful learning modules.',
    avatar: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Pruthviraj'
  },
  {
    name: 'Rahul',
    role: 'API Integration & UI/UX',
    description: 'Connects backend APIs and refines the user experience for seamless interaction.',
    avatar: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Rahul'
  }
];

const About = () => {
  return (
    <div style={{
      textAlign: 'center',
      padding: '60px 20px',
      background: 'linear-gradient(to right, #f0f4ff, #e8f0fe)',
      minHeight: '100vh',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '2.8em', marginBottom: '10px' }}>About ShikshaPlus</h1>
      <p style={{
        fontSize: '1.2em',
        marginBottom: '40px',
        color: '#444',
        maxWidth: '700px',
        margin: 'auto'
      }}>
        ShikshaPlus is an AI-powered microlearning platform designed to help students stay focused, learn smarter, and connect with mentors. Built for digital equity, it works even in low-resource settings.
      </p>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '30px',
        marginBottom: '50px'
      }}>
        <div style={infoCardStyle}>
          <h2>🌟 Vision</h2>
          <p>To bridge the digital education gap by offering personalized, mentor-assisted learning for every student—anytime, anywhere.</p>
        </div>
        <div style={infoCardStyle}>
          <h2>⚙️ How It Works</h2>
          <ul style={{ textAlign: 'left', paddingLeft: '20px' }}>
            <li>🧠 AI Tutor with memory helps explain concepts and answer doubts</li>
            <li>👀 Webcam-based focus tracking monitors attention in real time</li>
            <li>📚 Microcourses with quizzes and certificates</li>
            <li>🧑‍🏫 Mentor dashboard shows real learning behavior</li>
          </ul>
        </div>
      </div>

      <h2 style={{ fontSize: '2em', marginBottom: '30px' }}>Meet the Team</h2>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '30px'
      }}>
        {teamMembers.map((member, index) => (
          <div key={index} style={{
            position: 'relative',
            width: '220px',
            height: '300px',
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '20px',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
            onMouseEnter={e => {
              e.currentTarget.querySelector('.overlay').style.transform = 'translateY(0)';
              e.currentTarget.style.transform = 'translateY(-10px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.querySelector('.overlay').style.transform = 'translateY(100%)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <img src={member.avatar} alt={member.name} style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              marginBottom: '15px'
            }} />
            <h3>{member.name}</h3>
            <p style={{ fontSize: '0.95em', color: '#777' }}>{member.role}</p>
            <div className="overlay" style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              right: '0',
              backgroundColor: '#0077cc',
              color: '#fff',
              padding: '15px',
              fontSize: '0.9em',
              transform: 'translateY(100%)',
              transition: 'transform 0.3s ease-in-out'
            }}>
              <p>{member.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const infoCardStyle = {
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  padding: '25px',
  width: '300px',
  textAlign: 'left'
};

export default About;