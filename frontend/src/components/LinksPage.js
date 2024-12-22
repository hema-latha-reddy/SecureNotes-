

import React, { useState } from 'react';
import axios from 'axios';
import '../styles/pages.css';

const LinkPage = () => {
  const [link, setLink] = useState('');
  const [message, setMessage] = useState('');
  const [retrievedLinks, setRetrievedLinks] = useState([]);
  const [decryptedLinks, setDecryptedLinks] = useState([]);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPasswordField, setShowPasswordField] = useState(false); // To show the password input
  const [name, setName] = useState('');

  const isValidURL = (url) => {
    const urlRegex = /^(https?:\/\/)[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(:\d{1,5})?(\/.*)?$/;
    return urlRegex.test(url);
  };

  const saveLinkHandler = async () => {
    if (!isValidURL(link)) {
      setMessage('Invalid URL! Please enter a valid link.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('User is not authenticated');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/links/save',
        { content: link },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data.message || 'Link saved successfully');
      setLink('');
    } catch (error) {
      setMessage('Failed to save the link');
    }
  };

  const retrieveLinksHandler = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('User is not authenticated');
        return;
      }

      const response = await axios.get('http://localhost:5000/api/links/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Show encrypted links first
      setRetrievedLinks(response.data || []);
     // setDecryptedLinks([]); // Reset decrypted links
      setShowPasswordField(true);
      setMessage('Encrypted links retrieved successfully. Enter password to decrypt.');
    } catch (error) {
      setMessage('Failed to retrieve links');
    }
  };

  const handlePasswordSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('User is not authenticated');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/links/decrypt',
        { username:name,password:password }, // Send password to backend for decryption
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );


      //}
      if (response.data) {
        setDecryptedLinks(response.data.decryptedLinks); // Set decrypted links
        setPasswordError(''); // Clear any previous errors
        setRetrievedLinks([]);
         setTimeout(() => {
        setShowPasswordField(false);
      }, 0);  // Hide password input field **only after links are set**
      } else {
        setPasswordError('Invalid password or username! Please try again.');
      }
    } catch (error) {
      setPasswordError('Error occurred while verifying password.');
    }
  };

  console.log(decryptedLinks);

  return (
    <div className="page-container">
      <h2>Save a Link</h2>
      <input
        type="text"
        value={link}
        onChange={(e) => {
          setLink(e.target.value);
          setRetrievedLinks([]);
        }}
        placeholder="Enter your link"
      />
      <button onClick={saveLinkHandler}>Save</button>
      <button onClick={retrieveLinksHandler}>Retrieve Links</button>
      {message && <p>{message}</p>}

      {retrievedLinks.length > 0 && (
        <div className="retrieved-container">
          <h3> Retrieved Encrypted Links:</h3>
          <ul>
            {retrievedLinks.map((retrievedLink, index) => (
              <li key={index}>{retrievedLink.content}</li> // Show encrypted data
            ))}
          </ul>
        </div>
      )}

      {showPasswordField && (
        <div>
           <h3>Enter Username and Password to Decrypt Links</h3>
          <input
          type="text"
          name="name"
          placeholder="Userame"
          value={name}
          onChange={(e) => setName(e.target.value)}
          
        />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {setPassword(e.target.value);
            }}
            placeholder="Enter your password to decrypt"
          />
          <button onClick={handlePasswordSubmit}>Submit Password</button>
          
          {passwordError && <p style={{ color: 'black' }}>{passwordError}</p>}
        </div>
      )}

      {decryptedLinks.length > 0 && (
              <div className="retrieved-container">
                <h3>Decrypted Links:</h3>
                <ul>
                  {decryptedLinks.map((decryptedLink, index) => (
                    <li key={index}>{decryptedLink.decryptedData}</li> 
                  ))}
                </ul>
              </div>
            )}

    </div>
  );
};

export default LinkPage;

