
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Suspense, lazy } from 'react';
import { PopupProvider } from './components/Layout/PopupContext';
import SignupForm from './components/AccountForms/SignupForm';
import SigninForm from './components/AccountForms/SigninForm';
import NavBar from './components/Layout/NavBar';
import HomePage from './components/Pages/Home/HomePage';
import Popup from './components/Layout/Popup';
import ProfilePage from './components/AccountForms/ProfilePage';
import RequireAuth from './components/AccountForms/RequireAuth';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';


const LeagueOfLegendsPage = lazy(() =>
  import('./components/Pages/Content/LeagueOfLegendsPage')
);

function App() {
  const [signin, setSignIn] = useState(false);
  const navigate = useNavigate();

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
      navigate('/');
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${apiUrl}/api/member/signin`, { email, password }, { withCredentials: true });
      if (response.status === 200 && response.data.token) {
        setSignIn(true);
        navigate('/');
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
  
      if (response.status === 200 && !response.data.error) {
        setSignIn(true);
      } else {
        console.error('Backend error:', response.data.error);
        alert(response.data.error || 'Signup failed');
        setSignIn(false);
      }
    } catch (err: any) {
      if (err.response?.status === 409) {
        alert('That email is already registered.');
      } else {
        console.error('Sign up failed:', err);
        alert('Sign up failed, please try again.');
      }
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
            <Route path="/profile" element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
            />
          </Routes>
        </Suspense>
        <Popup />
      </PopupProvider>
    </>
  );
}

export default App;