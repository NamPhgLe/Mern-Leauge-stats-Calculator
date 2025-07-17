import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { usePopup } from '../Layout/PopupContext';

const SigninForm: React.FC<{ setSignIn: (value: boolean) => void }> = ({ setSignIn }) => {  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();
  const { showPopup } = usePopup();

  const getApiUrl = () => {
    return window.location.hostname.includes('localhost')
      ? 'http://localhost:5000'
      : import.meta.env.VITE_API_URL;
  };
  
  const apiUrl = getApiUrl();

  console.log('Signing out to:', apiUrl + '/api/member/signout');
  const handleSignin = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/member/signin`, {
        email: emailOrUsername.includes('@') ? emailOrUsername : undefined,
        username: !emailOrUsername.includes('@') ? emailOrUsername : undefined,
        password,
      }, { withCredentials: true });

      if (response.data.error) {
        setMessage(response.data.error);
      } else if (response.data.success) {
        showPopup('Sign In Successful!');
        setSignIn(true);
        navigate('/');
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
      console.error(error);
    }
  };

  return (
    <>
      <div style={{ maxWidth: 400, margin: 'auto', padding: '1rem' }}>
        <h2>Sign In</h2>
        <input
          type="text"
          placeholder="Email or Username"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          style={{ width: '100%', marginBottom: '0.5rem' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: '0.5rem' }}
        />
        <button onClick={handleSignin} style={{ width: '100%' }}>
          Sign In
        </button>
        {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
      </div>
    </>
  );
};

export default SigninForm;
