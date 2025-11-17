import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const ProfileDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [theme, setTheme] = useState('light');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Load user data
    const loadUserData = async () => {
      try {
        const data = await apiService.getUserProfile();
        setUserData(data);
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };
    loadUserData();
  }, []);

  const handleSignOut = () => {
    apiService.logout();
    navigate('/');
  };

  const handleEditProfile = () => {
    navigate('/profile');
    setShowDropdown(false);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    setShowDropdown(false);
  };

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '10px' }}>
      {userData && userData.profile_photo && (
        <img
          src={userData.profile_photo}
          alt="Profile"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid #ddd'
          }}
        />
      )}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.2em',
          padding: '5px'
        }}
      >
        👤
      </button>
      {showDropdown && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          backgroundColor: 'white',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          borderRadius: '5px',
          padding: '10px',
          minWidth: '150px',
          zIndex: 1001
        }}>
          <div
            style={{ padding: '8px 0', cursor: 'pointer', borderBottom: '1px solid #eee' }}
            onClick={handleEditProfile}
          >
            Edit Profile
          </div>
          <div
            style={{ padding: '8px 0', cursor: 'pointer', borderBottom: '1px solid #eee' }}
            onClick={toggleTheme}
          >
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </div>
          <div style={{ padding: '8px 0', cursor: 'pointer' }} onClick={handleSignOut}>Sign Out</div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
