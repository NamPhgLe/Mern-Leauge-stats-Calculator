import React, { useState, useEffect, useMemo } from 'react';
import LevelSelector from './ChampLevelSelector';
import type { ItemData } from '../../constants/itemData';
import { statNameMap } from '../../constants/statNameMap';
import type { ChampionDetail } from '../../constants/champData';
import ChampionAbilities from './ChampAbilites';
import { calculateCombinedStats } from '../../utils/calculateCombinedStats';

interface CombinedStatsProps {
  level: number;
  championId: string | null;
  items?: { item: ItemData; img: string }[];
  trinket?: { item: ItemData; img: string } | null;
  version?: string | null;
  showMore?: boolean;
  showlevel?: boolean;
}

function getStatName(statKey: string): string {
  return statNameMap[statKey] || statKey.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
}

export default function CombinedStats({
  championId,
  items,
  trinket,
  version,
  showMore = false,
  showlevel = false,
}: CombinedStatsProps) {
  const [championData, setChampionData] = useState<ChampionDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(1);

  useEffect(() => {
    if (!version || !championId) return;
    setLoading(true);
    fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${championId}.json`)
      .then(r => r.json())
      .then(j => setChampionData(j.data[championId]))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [championId, version]);

  const combinedStats = useMemo(() => {
    if (!championData) return {};
    return calculateCombinedStats(championData, selectedLevel, items, trinket);
  }, [championData, selectedLevel, items, trinket]);

  return (
    <div>
      {loading && <p>Loading champion data…</p>}
      {!loading && championData && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {showMore && <h2>{championData.name} — {championData.title}</h2>}
            {showlevel && (
              <LevelSelector
                selectedLevel={selectedLevel}
                onChange={setSelectedLevel}
                minLevel={1}
                maxLevel={18}
              />
            )}
          </div>

          <ul>
            {Object.entries(combinedStats).map(([statKey, value]) => (
              <li key={statKey}>
                <strong>{getStatName(statKey)}:</strong> {value.toFixed(2)}
              </li>
            ))}
          </ul>

          {showMore && (
            <ChampionAbilities
              championData={championData}
              version={version!}
            />
          )}
        </>
      )}
    </div>
  );
}
