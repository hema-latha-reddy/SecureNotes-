/*import React, { useState } from 'react';

const NotesPage = () => {
  const [note, setNote] = useState('');
  const [message, setMessage] = useState('');

  const saveNote = async () => {
    const response = await fetch('/api/notes/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: note }),
    });
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div>
      <h2>Save a Note</h2>
      <textarea
        value={note}
        name="notes"
        onChange={(e) => setNote(e.target.value)}
        placeholder="Enter your note"
      />
      <button onClick={saveNote}>Save</button>
      <button onClick={retrieveNotesHandler}>Retrieve Notes</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default NotesPage;*/

import React, { useState } from 'react';
import axios from 'axios';
import '../styles/pages.css';

const NotesPage = () => {
  const [note, setNote] = useState('');
  const [message, setMessage] = useState('');
  const [retrievedNotes, setRetrievedNotes] = useState([]);
  const [decryptedNotes, setDecryptedNotes] = useState([]);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPasswordField, setShowPasswordField] = useState(false); // To show the password input
  const [name, setName] = useState('');

  const saveNoteHandler = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      if (!token) {
        setMessage('User is not authenticated');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/notes/save',
        { content: note }, // Send the note content in the request body
        {
          headers: {
            "Authorization": `Bearer ${token}`, // Pass token in the Authorization header
          },
        }
      );
      setMessage(response.data.message || 'Note saved successfully');
      setNote(''); // Clear note input after saving
    } catch (error) {
      console.error('Error saving the note:', error);
      setMessage('Failed to save the note');
    }
  };

  const retrieveNotesHandler = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      if (!token) {
        setMessage('User is not authenticated');
        return;
      }

      const response = await axios.get('http://localhost:5000/api/notes/all', {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in the Authorization header
        },
      });
      setRetrievedNotes(response.data || []); // Store the retrieved notes
      setShowPasswordField(true);

      setMessage('Notes retrieved successfully');
    } catch (error) {
      console.error('Error retrieving the notes:', error);
      setMessage('Failed to retrieve notes');
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
        'http://localhost:5000/api/notes/decrypt',
        { username:name,password:password }, // Send password to backend for decryption
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
       if (response.data) {
        setDecryptedNotes(response.data.decryptedNotes); // Set decrypted links
        setPasswordError(''); // Clear any previous errors
        
        setRetrievedNotes([]);
         setTimeout(() => {
        setShowPasswordField(false);
      }, 0);  // Hide password input field *only after links are set*
      } else {
        setPasswordError('Invalid password or username! Please try again.');
      }
    } catch (error) {
      setPasswordError('Error occurred while verifying password.');
    }
  };

  console.log(decryptedNotes);


  

  return (
    <div className='page-container'>
      <h2>Save a Note</h2>
      <textarea
        value={note}
        name="note"
        onChange={(e) => {
          setNote(e.target.value)
          setRetrievedNotes([])
        }}
        placeholder="Enter your note"
      />
      <button onClick={saveNoteHandler}>Save</button>
      <button onClick={retrieveNotesHandler}>Retrieve Notes</button>
      {message && <p>{message}</p>}
      {retrievedNotes.length > 0 && (
        <div className='retrieved-container'>
          <h3>Retrieved Encrypted Notes:</h3>
          <ul>
            {retrievedNotes.map((retrievedNote, index) => (
              <li key={index}>{retrievedNote.content}</li>
            ))}
          </ul>
        </div>
      )}
      
      {showPasswordField && (
        <div>
           <h3>Enter Username and Password to Decrypt Notes</h3>
          <input
          type="text"
          name="name"
          placeholder="Userame"
          value={name}
          onChange={(e) => setName(e.target.value)}/>
        <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {setPassword(e.target.value);
            }}
            placeholder="Enter your password to decrypt"
          />
          <button onClick={handlePasswordSubmit}>Submit</button>
          
          {passwordError && <p style={{ color: 'black' }}>{passwordError}</p>}
        </div>
          )}

          {decryptedNotes.length > 0 && (
                  <div className="retrieved-container">
                    <h3>Decrypted Notes:</h3>
                    <ul>
                      {decryptedNotes.map((decryptedNote, index) => (
                        <li key={index}>{decryptedNote.decryptedData}</li> 
                      ))}
                    </ul>
                  </div>
                )}
    </div>
  );
};

export default NotesPage;

