import React, { useState } from 'react';
import styles from './Form.module.css';

interface SignUpFormProps {
  onSignUp: (email: string, password: string) => void;
}

const SignupForm: React.FC<SignUpFormProps> = ({ onSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignUp(email, password);
  };

  return (
    <div className={styles.pageContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Sign Up</h2>
        <label className={styles.label}>
          Email
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </label>
        <label className={styles.label}>
          Password
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </label>
        <button className={styles.button} type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;
