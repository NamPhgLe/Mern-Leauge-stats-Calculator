
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SignupForm from './components/AccountForms/SignupForm';
import SigninForm from './components/AccountForms/SigninForm';
import NavBar from './components/Layout/NavBar';
import HomePage from './components/Pages/Home/HomePage';
import { Suspense, lazy } from 'react';
import { PopupProvider } from './components/Layout/PopupContext';
import Popup from './components/Layout/Popup';
import axios from 'axios';

const LeagueOfLegendsPage = lazy(() =>
  import('./components/Pages/Content/LeagueOfLegendsPage')
);

function App() {
  const [signin, setSignIn] = useState(false);

  const getApiUrl = () => {
    return window.location.hostname.includes('localhost')
      ? 'http://localhost:5000'
      : import.meta.env.VITE_API_URL;
  };
  
  const apiUrl = getApiUrl();
  
  useEffect(() => {
    const checkSigninStatus = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/member/protected`, { withCredentials: true });
        if (response.status === 200 && response.data.user) {
          setSignIn(true);
        } else {
          setSignIn(false);
        }
      } catch (error) {
        setSignIn(false);
      }
    };
  
    checkSigninStatus();
  }, []);

  const handleSignout = async () => {
    try {
      await axios.post(`${apiUrl}/api/member/signout`, {}, { withCredentials: true });
      setSignIn(false);
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };
  
  const handleSignIn = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${apiUrl}/api/member/signin`, { username, password }, { withCredentials: true });
      if (response.status === 200 && response.data.token) {
        setSignIn(true);
      }
    } catch (err) {
      console.error('Sign in failed:', err);
      setSignIn(false);
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/member/signup`,
        { email, password },
        { withCredentials: true }
      );
  
      if (response.status === 200 && response.data.token) {
        setSignIn(true);
      } else {
        console.error('Unexpected response:', response);
        setSignIn(false);
      }
    } catch (err) {
      console.error('Sign up failed:', err);
      setSignIn(false);
    }
  };
  
  return (
    <>
      <PopupProvider>
        <NavBar signin={signin} onSignout={handleSignout} />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/signup" element={<SignupForm onSignUp={handleSignUp} />} />
            <Route path="/signin" element={<SigninForm onSignIn={handleSignIn} />} />
            <Route path="/league" element={<LeagueOfLegendsPage />} />
            
          </Routes>
        </Suspense>
        <Popup />
      </PopupProvider>
    </>
  );
}

export default App;