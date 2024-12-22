/*import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/links">Links</Link>
      <Link to="/notes">Notes</Link>
      <Link to="/passwords">Passwords</Link>
    </div>
  );
};

export default Dashboard;*/

import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Dashboard</h1>
      <div style={styles.buttonContainer}>
        <Link to="/links" style={styles.button}>
          Links
        </Link>
        <Link to="/notes" style={styles.button}>
          Notes
        </Link>
        <Link to="/passwords" style={styles.button}>
          Passwords
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '2rem',
    color: '#333',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
  },
  button: {
    textDecoration: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '1rem',
    textAlign: 'center',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

export default Dashboard;

