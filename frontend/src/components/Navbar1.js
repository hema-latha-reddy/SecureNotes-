import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar1 = () => {

    const navigate=useNavigate();
    const logout=()=>{
        navigate('/login')
    }
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'green', padding: '20px', position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
      {/* Logo or Branding */}
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
        
      <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link>
      <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link>
      </div>

      {/* Navigation Links */}
      <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '200px' }}>
        <button type="button" style={{border:'0px'}} onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar1;