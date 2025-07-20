import React from 'react';
import styles from './ChampLevel.module.css';

interface ChampLevelSelectorProps {
  selectedLevel: number;
  onChange: (level: number) => void;
  minLevel?: number;
  maxLevel?: number;
}

export default function ChampLevelSelector({
  selectedLevel,
  onChange,
  minLevel = 1,
  maxLevel = 18,
}: ChampLevelSelectorProps) {
  return (
    <label className={styles.label}>
      Level:
      <select
        className={styles.select}
        value={selectedLevel}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
      >
        {Array.from({ length: maxLevel - minLevel + 1 }, (_, i) => i + minLevel).map(
          (level) => (
            <option key={level} value={level}>
              {level}
            </option>
          )
        )}
      </select>
    </label>
  );
}
