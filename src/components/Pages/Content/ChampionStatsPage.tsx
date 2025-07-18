import React, { useEffect } from 'react';
import styles from './ChampionStatsPage.module.css';
import CombinedStats from '../../lol-ChampFetch/CombineStats';
import type { ItemData } from '../../../constants/itemData';
import useLatestVersion from '../../../hooks/useLatestVersion';
interface ChampionStatsPageProps {
  championId: string;
  level: number;
  onClose: () => void;
  isClosing: boolean;
  items: { item: ItemData; img: string }[];
  trinket: { item: ItemData; img: string } | null; 
}

const ChampionStatsPage: React.FC<ChampionStatsPageProps> = ({
  championId,
  level,
  onClose,
  isClosing,
  items,
  trinket,
}) => {
  const version = useLatestVersion();

  useEffect(() => {
    if (!isClosing) return;
    const timer = setTimeout(onClose, 300);
    return () => clearTimeout(timer);
  }, [isClosing, onClose]);

  if (!version) return <p>Loading version...</p>;

  return (
    <div className={`${styles.panel} ${isClosing ? styles.exit : ''}`}>
      <div className={styles.header}>
        <button onClick={onClose} className={styles.closeButton} aria-label="Close">
          ×
        </button>
      </div>
      <CombinedStats
        championId={championId}
        level={level}
        items={items}
        trinket={trinket}
        version={version}
        showMore={true}
      />
    </div>
  );
};

export default ChampionStatsPage;
