import { useState, useEffect } from 'react';
import apiService from '../services/api';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    institution_name: '',
    institution_type: '',
    branch: '',
    interests: []
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Load user data on component mount
    const loadUserData = async () => {
      try {
        const data = await apiService.getUserProfile();
        setUserData(data);
      } catch (error) {
        setError('Failed to load profile data');
      }
    };
    loadUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (interest) => {
    setUserData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const formData = new FormData();
      Object.keys(userData).forEach(key => {
        if (Array.isArray(userData[key])) {
          formData.append(key, JSON.stringify(userData[key]));
        } else {
          formData.append(key, userData[key]);
        }
      });
      if (profilePhoto) {
        formData.append('profile_photo', profilePhoto);
      }

      await apiService.updateUserProfile(formData);
      setSuccess('Profile updated successfully!');
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div style={{
      padding: '100px 20px 20px',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Edit Profile</h2>

      {error && (
        <div style={{
          color: 'red',
          marginBottom: '20px',
          textAlign: 'center',
          padding: '10px',
          backgroundColor: '#ffe6e6',
          borderRadius: '5px'
        }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{
          color: 'green',
          marginBottom: '20px',
          textAlign: 'center',
          padding: '10px',
          backgroundColor: '#e6ffe6',
          borderRadius: '5px'
        }}>
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        {/* Profile Photo */}
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Profile Photo</label>
          {photoPreview && (
            <div style={{ marginBottom: '10px' }}>
              <img
                src={photoPreview}
                alt="Profile Preview"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #ddd'
                }}
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            style={{
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              width: '100%'
            }}
          />
        </div>

        {/* Name */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '16px'
            }}
          />
        </div>

        {/* Phone */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '16px'
            }}
          />
        </div>

        {/* Institution Name */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            {userData.institution_type === 'college' ? 'College Name' : 'School Name'}
          </label>
          <input
            type="text"
            name="institution_name"
            value={userData.institution_name}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '16px'
            }}
          />
        </div>

        {/* Branch (for college) */}
        {userData.institution_type === 'college' && (
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Branch</label>
            <select
              name="branch"
              value={userData.branch}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px'
              }}
            >
              <option value="">Select Branch</option>
              <option value="cse">CSE</option>
              <option value="ece">ECE</option>
              <option value="mech">MECH</option>
              <option value="civil">CIVIL</option>
              <option value="aiml">AIML</option>
            </select>
          </div>
        )}

        {/* Interests (for school) */}
        {userData.institution_type === 'school' && (
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Interests</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {['Science', 'Math', 'English', 'History', 'Art', 'Sports', 'Music', 'Technology'].map(interest => (
                <label key={interest} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={userData.interests.includes(interest)}
                    onChange={() => handleInterestChange(interest)}
                    style={{ marginRight: '5px' }}
                  />
                  {interest}
                </label>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '20px'
          }}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
