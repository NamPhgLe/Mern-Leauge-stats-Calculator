import React, { useEffect, useState, useRef } from 'react';
import styles from '../itemStats.module.css';
import ItemStatsFilter from '../ItemFilters/ItemStats/ItemStatsFilter';
import { useFilteredItems, useAllStatKeys } from '../../../hooks/useItemFilter';
import type { ItemData } from '../../../constants/itemData';
import ItemSearchFilter from '../ItemFilters/ItemSearch/ItemSearchFilter';
import axios from 'axios';
import ItemDescription from '../ItemDescription/ItemDescription';
import { useInventory } from '../../../hooks/useInventory';
import Inventory from '../../lol-Inventory/InventroyDisplay/Inventory';
import InventoryStats from '../../lol-Inventory/InventoryStats/InventoryStats';
import useLatestVersion from '../../../hooks/useLatestVersion';
import CombinedStats from '../../lol-ChampFetch/CombineStats';
import { calculateCombinedStats } from '../../../utils/calculateCombinedStats';
import type { ChampionDetail } from '../../../constants/champData';
type ItemMap = Record<string, ItemData>;

interface ItemFetcherProps {
  championId: string | null;
  level: number;
  onCombinedStatsChange?: (stats: Record<string, number>) => void;
}

export default function ItemFetcher({
  championId,
  level,
  onCombinedStatsChange,
}: ItemFetcherProps) {
  const [items, setItems] = useState<ItemMap | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [nextItemId, setNextItemId] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedMap] = useState<string | null>('11');
  const [selectedSort] = useState<string>('gold');
  const [selectedStats, setSelectedStats] = useState<string[]>(['gold']);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);
  const [showMore, setShowMore] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [championData, setChampionData] = useState<ChampionDetail | null>(null);

  const version = useLatestVersion();

  const allStatKeys = useAllStatKeys(items);
  const filteredItems = useFilteredItems(
    items,
    selectedMap,
    selectedStats,
    selectedSort,
    searchTerm
  );
  const selectedItem = selectedItemId && items ? items[selectedItemId] : null;

  const {
    inventory: inventoryState,
    trinket: trinketState,
    slotCount,
    addItem: handleBuyItem,
    removeItem,
    removeTrinket,
    increaseSlots,
    decreaseSlots,
  } = useInventory();

  const hasInventoryItems = inventoryState.length > 0 || !!trinketState;

  useEffect(() => {
    if (!championId || !version) return;
    fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${championId}.json`)
      .then(r => r.json())
      .then(json => setChampionData(json.data[championId]));
  }, [championId, version]);

  const totalStats = React.useMemo(() => {
    if (!championData) return {};
    const { total } = calculateCombinedStats(championData, level, inventoryState, trinketState);
    return total;
  }, [championData, level, inventoryState, trinketState]);

  useEffect(() => {
    onCombinedStatsChange?.(totalStats);
  }, [totalStats, onCombinedStatsChange]);

  useEffect(() => {
    if (!version) return;

    async function loadItems() {
      try {
        const itemsRes = await axios.get(
          `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/item.json`
        );
        const raw = itemsRes.data.data as Record<string, ItemData>;
        const map: Record<string, ItemData> = {};
        Object.entries(raw).forEach(([id, itm]) => {
          map[id] = { ...itm, id };
        });
        setItems(map);
      } catch (err) {
        console.error(err);
      }
    }

    loadItems();
  }, [version]);

  useEffect(() => {
    if (!isClosing) return;
    const t = setTimeout(() => {
      setSelectedItemId(nextItemId);
      setNextItemId(null);
      setIsClosing(false);
    }, 300);
    return () => clearTimeout(t);
  }, [isClosing, nextItemId]);


  const openItemPanel = (id: string) => {
    if (!selectedItemId) {
      setSelectedItemId(id);
    } else if (id !== selectedItemId) {
      setNextItemId(id);
      setIsClosing(true);
    }
  };

  useEffect(() => {
    if (showMore && panelRef.current) {
      panelRef.current.scrollTo({
        top: panelRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [showMore]);

  return (
    <div className={styles.itemFetcherContainer}>
      <h2 className={styles.itemFetcherHeader}>
      </h2>

      <div className={styles.filtersRow}>
        <div className={styles.filters}>
          <ItemSearchFilter onSearch={setSearchTerm} />
        </div>
        <ItemStatsFilter
          availableStats={allStatKeys}
          selectedStats={selectedStats}
          onChange={setSelectedStats}
        />
      </div>
      <div className={styles.mainContent}>
        <div className={styles.itemsScrollContainer} ref={containerRef}>
          <div className={styles.grid}>
            {filteredItems.map(([id, item], idx) => (
              <div
                key={id}
                onClick={() => openItemPanel(id)}
                onDoubleClick={() =>
                  handleBuyItem(item as unknown as import('../../../constants/itemData').ItemData, `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${id}.png`)
                }
                className={`${styles.itemCard} ${selectedItemId === id ? styles.selected : ''}`}
                style={{ '--delay': `${idx * 50}ms` } as React.CSSProperties}
              >
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${id}.png`}
                  alt={item.name}
                  className={styles.itemImage}
                />
                <h6 className={styles.itemName}>{item.name}</h6>
                <div><strong>Gold:</strong> {item.gold.total}</div>
              </div>
            ))}
          </div>
        </div>
        {selectedItem && (
          <div className={`${styles.panel} ${isClosing ? styles.exit : ''}`}>
            <ItemDescription
              item={selectedItem}
              items={items!}
              version={version!}
              onSelectItem={openItemPanel}
              img={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${selectedItemId}.png`}
              onBuyItem={handleBuyItem}
              selectedMap={selectedMap}
            />
          </div>
        )}

      </div>

      <div className={styles.inventoryRow}>
        <Inventory
          items={inventoryState}
          trinket={trinketState}
          slotCount={slotCount}
          onRemoveItem={removeItem}
          onRemoveTrinket={removeTrinket}
          onIncreaseSlots={increaseSlots}
          onDecreaseSlots={decreaseSlots}
        />


        {hasInventoryItems && (
          <div className={`${styles.itemPanel} ${showMore ? styles.expanded : ''}`} ref={panelRef}>
            <div className={styles.toggleButtonWrapper}>
              <button className={styles.toggleButton} onClick={() => setShowMore((prev) => !prev)}>
                {showMore ? 'Retract Champion Details' : 'Extend Champion Details'}
              </button>
            </div>
            <div className={styles.statsColumns}>
              {championId && version && (
                <>
                  <div className={styles.statsColumn}>
                    <CombinedStats
                      championId={championId}
                      level={level}
                      items={inventoryState}
                      trinket={trinketState}
                      version={version}
                      showMore={showMore}
                      showlevel={true}
                    />
                  </div>
                </>
              )}
              <div className={styles.statsColumn}>
                <InventoryStats items={inventoryState} trinket={trinketState} />
              </div>
              <div ref={bottomRef} />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
