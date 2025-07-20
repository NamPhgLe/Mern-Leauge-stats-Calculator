import React from 'react';
import styles from './InventoryPage.module.css';
import ItemFetcher from '../../lol-ItemFetch/ItemFetch/ItemFetch';

interface InventoryPageProps {
  isOpen: boolean;
  onClose: () => void;
  championId: string | null;
  level: number;
  onCombinedStatsChange?: (stats: Record<string, number>) => void;
}
const InventoryPage: React.FC<InventoryPageProps> = ({
  isOpen,
  championId,
  level,
  onCombinedStatsChange,
}) => {
  
  return (
    <div className={`${styles.inventoryPanel} ${isOpen ? styles.open : ''}`}>
       <ItemFetcher championId={championId} level={level} onCombinedStatsChange={onCombinedStatsChange} />
    </div>
  );
}


export default InventoryPage;