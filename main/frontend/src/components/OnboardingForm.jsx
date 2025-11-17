import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const OnboardingForm = () => {
  const [step, setStep] = useState(1); // 1: redirect message, 2: form
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    institution_type: 'college', // 'college' or 'school'
    institution_name: '',
    branch: '',
    interests: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Show redirect message for 2 seconds
  useState(() => {
    const timer = setTimeout(() => {
      setStep(2);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await apiService.onboardUser(formData);
      // Redirect to appropriate dashboard
      const dashboardRoute = data.user.user_type === 'mentor' ? '/mentor-dashboard' : '/dashboard';
      navigate(dashboardRoute);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  if (step === 1) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          maxWidth: '400px'
        }}>
          <h2 style={{ marginBottom: '20px' }}>Redirecting please wait...</h2>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #007bff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '500px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
          Before continuing lets know about you more...
        </h2>

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

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
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

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
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

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Institution Type</label>
            <div style={{ display: 'flex', gap: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="institution_type"
                  value="college"
                  checked={formData.institution_type === 'college'}
                  onChange={handleInputChange}
                  style={{ marginRight: '5px' }}
                />
                College
              </label>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="institution_type"
                  value="school"
                  checked={formData.institution_type === 'school'}
                  onChange={handleInputChange}
                  style={{ marginRight: '5px' }}
                />
                School
              </label>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              {formData.institution_type === 'college' ? 'College Name' : 'School Name'}
            </label>
            <input
              type="text"
              name="institution_name"
              value={formData.institution_name}
              onChange={handleInputChange}
              required
              placeholder={`Enter your ${formData.institution_type} name`}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px'
              }}
            />
          </div>

          {formData.institution_type === 'college' && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Branch</label>
              <select
                name="branch"
                value={formData.branch}
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

          {formData.institution_type === 'school' && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Interests</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {['Science', 'Math', 'English', 'History', 'Art', 'Sports', 'Music', 'Technology'].map(interest => (
                  <label key={interest} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(interest)}
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
            {loading ? 'Submitting...' : 'Continue to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingForm;
