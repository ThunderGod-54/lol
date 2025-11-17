import { Link } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';

const Navbar = () => {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 20px',
      background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.8) 100%)',
      backdropFilter: 'blur(10px)',
      color: 'black',
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      borderBottom: '1px solid rgba(0,0,0,0.1)'
    }}>
      <Link to="/about" style={{
        color: 'black',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '1.2em',
        transition: 'color 0.3s'
      }}>SHIKSHA PLUS</Link>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/dashboard" style={{
          color: 'black',
          textDecoration: 'none',
          padding: '8px 15px',
          borderRadius: '5px',
          transition: 'background-color 0.3s',
          fontSize: '1.1em'
        }}>Dashboard</Link>
        <Link to="/courses" style={{
          color: 'black',
          textDecoration: 'none',
          padding: '8px 15px',
          borderRadius: '5px',
          transition: 'background-color 0.3s',
          fontSize: '1.1em'
        }}>Courses</Link>
        <Link to="/focus" style={{
          color: 'black',
          textDecoration: 'none',
          padding: '8px 15px',
          borderRadius: '5px',
          transition: 'background-color 0.3s',
          fontSize: '1.1em'
        }}>Focus</Link>
        <Link to="/todolist" style={{
          color: 'black',
          textDecoration: 'none',
          padding: '8px 15px',
          borderRadius: '5px',
          transition: 'background-color 0.3s',
          fontSize: '1.1em'
        }}>Todolist</Link>
        <Link to="/aichatbot" style={{
          color: 'black',
          textDecoration: 'none',
          padding: '8px 15px',
          borderRadius: '5px',
          transition: 'background-color 0.3s',
          fontSize: '1.1em'
        }}>AI Chatbot</Link>
        <ProfileDropdown />
      </div>
    </nav>
  );
};

export default Navbar;
