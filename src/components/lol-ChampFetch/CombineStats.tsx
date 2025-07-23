import { useState, useEffect, useMemo } from 'react';
import LevelSelector from './ChampLevelSelector';
import type { ItemData } from '../../constants/itemData';
import { statNameMap } from '../../constants/statNameMap';
import type { ChampionDetail } from '../../constants/champData';
import ChampionAbilities from './ChampAbilites';
import { calculateCombinedStats } from '../../utils/calculateCombinedStats';
import styles from './CombineStats.module.css'

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

  const { total, base, item } = useMemo(() => {
    if (!championData) return { total: {}, base: {}, item: {} };
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
          {Object.keys(item).length === 0 ? (
            <table className={styles.statsTable}>
              <thead>
                <tr>
                  <th>Stat</th>
                  <th>Base</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(base).map(([statKey, baseValue]) => (
                  <tr key={statKey}>
                    <td>{getStatName(statKey)}</td>
                    <td>{baseValue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className={styles.statsTable}>
              <thead>
                <tr>
                  <th>Stat</th>
                  <th>Base</th>
                  <th>Item</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(total).map((statKey) => (
                  <tr key={statKey}>
                    <td>{getStatName(statKey)}</td>
                    <td>{(base[statKey] ?? 0) === 0 ? '-' : (base[statKey] ?? 0).toFixed(2)}</td>
                    <td>{(item[statKey] ?? 0) === 0 ? '-' : (item[statKey] ?? 0).toFixed(2)}</td>
                    <td>{(total[statKey] ?? 0) === 0 ? '-' : (total[statKey] ?? 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <br />
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
