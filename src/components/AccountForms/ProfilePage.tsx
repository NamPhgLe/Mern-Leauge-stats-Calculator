import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ProfilePage.module.css';

const apiUrl = window.location.hostname.includes('localhost')
  ? 'http://localhost:5000'
  : import.meta.env.VITE_API_URL;

const ProfilePage = () => {
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/member/profile`, { withCredentials: true })
      .then((res) => {
        setProfile(res.data.profile);
      })
      .catch((err) => {
        console.error('Profile fetch failed:', err);
        setError('Unauthorized or session expired.');
      });
  }, []);

  if (error) return <p className={styles.errorMessage}>{error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.title}>Profile</h2>

      <div className={styles.profileRow}>
        <div className={styles.label}>Username:</div>
        <div className={styles.value}>{profile.username || '—'}</div>
      </div>

      <div className={styles.profileRow}>
        <div className={styles.label}>Email:</div>
        <div className={styles.value}>{profile.email}</div>
      </div>

      <div className={styles.profileRow}>
        <div className={styles.label}>Member Since:</div>
        <div className={styles.value}>{new Date(profile.since).toLocaleString()}</div>
      </div>
    </div>
  );
};

export default ProfilePage;
