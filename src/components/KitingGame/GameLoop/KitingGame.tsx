import { useState } from 'react';
import { GameCanvas } from './GameCanvas';
import type { Position } from '../Types/Position';
import type { ItemData } from '../../../constants/itemData';
import styles from './KitingGame.module.css';

interface KitingGameProps {
  stats: Record<string, number>;
  itemStats: Record<string, number>;
  items: { item: ItemData; img: string }[];
  trinket?: { item: ItemData; img: string } | null;
}

export function KitingGame({ stats, items, trinket }: KitingGameProps) {
  const gameWidth = 600;
  const gameHeight = 400;

  const [gameStarted, setGameStarted] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [rightClickDown, setRightClickDown] = useState(false);
  const [cursorPos, setCursorPos] = useState<Position | null>(null);
  const [showAttackRangeCircle, setShowAttackRangeCircle] = useState(true);

  const handleRightClick = (pos: Position) => {
    setCursorPos(pos);
  };

  const handleStopMove = () => {
    setRightClickDown(false);
    setCursorPos(null);
  };

  if (!gameStarted) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>League-Style Kiting Game</h1>
        <button
          onClick={() => setGameStarted(true)}
          className={styles.button}
        >
          Start Game
        </button>
        <br />
        <button
          onClick={() => setShowOptions(prev => !prev)}
          className={styles.optionsToggle}
        >
          {showOptions ? 'Hide Options' : 'Options'}
        </button>
  
        {showOptions && (
          <div className={styles.optionsPanel}>
            <h3>Options</h3>
  
            <div className={styles.featureBoxEnabled}>
              <label>
                <input
                  type="checkbox"
                  checked={audioEnabled}
                  onChange={() => setAudioEnabled(prev => !prev)}
                />{' '}
                Audio {audioEnabled ? 'On' : 'Off'}
              </label>
            </div>
  
            <div className={styles.featureBoxEnabled}>
              <label>
                <input
                  type="checkbox"
                  checked={showAttackRangeCircle}
                  onChange={() => setShowAttackRangeCircle(prev => !prev)}
                />{' '}
                Show Attack Range Circle
              </label>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className={styles.container}>
      <div
        className={styles.canvasWrapper}
        onMouseDown={e => e.button === 2 && setRightClickDown(true)}
        onMouseUp={e => e.button === 2 && setRightClickDown(false)}
        onMouseMove={e => {
          if (rightClickDown) {
            const rect = e.currentTarget.getBoundingClientRect();
            setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          }
        }}
      >
        <GameCanvas
          width={gameWidth}
          height={gameHeight}
          showAttackRangeCircle={showAttackRangeCircle}
          rightClickDown={rightClickDown}
          cursorPos={cursorPos}
          onRightClick={handleRightClick}
          onStopMove={handleStopMove}
          stats={stats}
          items={items}
          trinket={trinket}
        />
      </div>
    </div>
  );
}