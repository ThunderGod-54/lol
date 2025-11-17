import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CourseContinued = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  // Course data (same as in Courses.jsx)
  const allCourses = [
    { id: 1, title: 'Data Structures & Algorithms', category: 'cs', difficulty: 'Intermediate', duration: '8 weeks', icon: 'link', description: 'Learn fundamental data structures and algorithms essential for coding interviews and efficient programming.', concepts: ['Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Trees', 'Graphs', 'Sorting Algorithms', 'Searching Algorithms'] },
    { id: 2, title: 'Web Development Fundamentals', category: 'cs', difficulty: 'Beginner', duration: '6 weeks', icon: 'globe', description: 'Build a strong foundation in HTML, CSS, and JavaScript to create modern web applications.', concepts: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'DOM Manipulation', 'Event Handling'] },
    { id: 3, title: 'Java Programming', category: 'cs', difficulty: 'Intermediate', duration: '8 weeks', icon: 'code', description: 'Master object-oriented programming with Java, from basics to advanced concepts.', concepts: ['Object-Oriented Programming', 'Classes & Objects', 'Inheritance', 'Polymorphism', 'Exception Handling', 'Collections'] },
    { id: 5, title: 'Python Programming', category: 'cs', difficulty: 'Beginner', duration: '6 weeks', icon: 'code', description: 'Learn Python programming fundamentals and build practical applications.', concepts: ['Variables & Data Types', 'Control Structures', 'Functions', 'Lists & Dictionaries', 'File Handling', 'Modules'] },
    { id: 16, title: 'Introduction to Artificial Intelligence', category: 'ai', difficulty: 'Beginner', duration: '8 weeks', icon: 'cpu', description: 'Explore the basics of AI, machine learning, and neural networks.', concepts: ['AI Fundamentals', 'Machine Learning', 'Neural Networks', 'Supervised Learning', 'Unsupervised Learning'] },
    { id: 17, title: 'Machine Learning Fundamentals', category: 'ai', difficulty: 'Intermediate', duration: '10 weeks', icon: 'brain', description: 'Dive deep into machine learning algorithms and their applications.', concepts: ['Regression', 'Classification', 'Clustering', 'Decision Trees', 'Neural Networks', 'Deep Learning'] },
    { id: 18, title: 'Deep Learning & Neural Networks', category: 'ai', difficulty: 'Advanced', duration: '12 weeks', icon: 'activity', description: 'Advanced concepts in deep learning, CNNs, RNNs, and their implementations.', concepts: ['Convolutional Neural Networks', 'Recurrent Neural Networks', 'Transformers', 'GANs', 'Reinforcement Learning'] },
    { id: 21, title: 'Digital Communication Skills', category: 'digital', difficulty: 'Beginner', duration: '4 weeks', icon: 'mail', description: 'Improve your digital communication and online collaboration skills.', concepts: ['Email Etiquette', 'Video Conferencing', 'Online Collaboration Tools', 'Digital Writing'] },
    { id: 22, title: 'Online Safety & Privacy', category: 'digital', difficulty: 'Beginner', duration: '3 weeks', icon: 'shield', description: 'Learn to protect yourself online and maintain digital privacy.', concepts: ['Password Security', 'Data Privacy', 'Cybersecurity Basics', 'Safe Browsing'] },
    { id: 23, title: 'Digital Citizenship', category: 'digital', difficulty: 'Beginner', duration: '4 weeks', icon: 'users', description: 'Understand your rights and responsibilities in the digital world.', concepts: ['Digital Ethics', 'Online Behavior', 'Information Literacy', 'Digital Rights'] },
  ];

  const course = allCourses.find(c => c.id === parseInt(courseId));

  if (!course) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <button
          onClick={() => navigate('/courses')}
          style={{
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            background: '#4facfe',
            color: 'white',
            fontSize: '1rem',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          Back to Courses
        </button>
        <h1>Course Not Found</h1>
        <p>The requested course could not be found.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', minHeight: '100vh', background: '#F0EDEE' }}>
      <button
        onClick={() => navigate('/courses')}
        style={{
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
          background: '#4facfe',
          color: 'white',
          fontSize: '1rem',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        Back to Courses
      </button>

      <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '20px' }}>
          {course.title}
        </h1>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', color: '#6b7280' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>
            <span style={{ fontWeight: '500' }}>{course.difficulty}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', color: '#6b7280' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span>{course.duration}</span>
          </div>
        </div>

        <p style={{ fontSize: '1.2rem', color: '#374151', lineHeight: '1.6', marginBottom: '30px' }}>
          {course.description}
        </p>

        <h2 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#1e3a8a', marginBottom: '20px' }}>
          Key Concepts Covered
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px', marginBottom: '30px' }}>
          {course.concepts.map((concept, index) => (
            <div
              key={index}
              style={{
                padding: '15px 20px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                border: '1px solid #d1d5db',
                fontSize: '1rem',
                fontWeight: '500',
                color: '#374151',
                textAlign: 'center'
              }}
            >
              {concept}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            style={{
              padding: '15px 30px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(79, 172, 254, 0.3)',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            onClick={() => navigate(`/courses-continued2/${course.id}`)}
          >
            Start Learning
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseContinued;
