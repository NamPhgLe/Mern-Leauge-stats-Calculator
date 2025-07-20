import React from 'react';
import styles from './Welcome.module.css';

interface WelcomeProps {
  togglePanel: () => void;
  isPanelVisible: boolean;
}

const Welcome: React.FC<WelcomeProps> = ({ togglePanel }) => {
  return (
    <div className={styles.welcomeContainer}>
      <h1 className={styles.title}>Welcome to Game Simulator</h1>
      <p className={styles.subtitle}>Build, Create, and Experiment.</p>
      <button className={styles.getStartedButton} onClick={togglePanel}>
        Get Started
      </button>
    </div>
  );
};

export default Welcome;