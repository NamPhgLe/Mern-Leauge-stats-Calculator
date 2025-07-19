import { useState } from 'react';
import { KitingGame } from './KitingGame';
import type { ItemData } from '../../../constants/itemData';
import styles from './GameMenu.module.css';

interface GameMenuProps {
  stats: Record<string, number>;
  itemStats: Record<string, number>;
  items: { item: ItemData; img: string }[];
  trinket?: { item: ItemData; img: string } | null;
}

export function GameMenu({ stats, itemStats, items, trinket }: GameMenuProps) {
  const [started, setStarted] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  if (started) {
    return (
      <KitingGame
        stats={stats}
        itemStats={itemStats}
        items={items}
        trinket={trinket}
      />
    );
  }

  const features = [
    { title: 'Kiting Game', action: () => setStarted(true), enabled: true },
    { title: 'Upcoming...', action: () => {}, enabled: false },
    { title: 'Upcoming...', action: () => {}, enabled: false },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Choose a Mode</h1>

      <div className={styles.featureBoxes}>
        {features.map((f, i) => (
          <div
            key={i}
            onClick={f.enabled ? f.action : undefined}
            className={
              f.enabled
                ? `${styles.featureBox} ${styles.featureBoxEnabled}`
                : styles.featureBox
            }
          >
            <h2>{f.title}</h2>
            {f.enabled && (
              <button className={styles.button}>Start</button>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowOptions((prev) => !prev)}
        className={styles.optionsToggle}
      >
        {showOptions ? 'Hide Options' : 'Options'}
      </button>

      {showOptions && (
        <div className={styles.optionsPanel}>
          <h3>Game Options (Coming Soon)</h3>
          <p>Customize settings like difficulty, controls, and more.</p>
        </div>
      )}
    </div>
  );
}
