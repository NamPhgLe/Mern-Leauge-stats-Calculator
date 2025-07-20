import React from 'react';
import styles from './ChampSearch.module.css';

interface ChampionSearchProps {
    searchChamp: string;
    setSearchChamp: (term: string) => void;
}

const ChampionSearch: React.FC<ChampionSearchProps> = ({ searchChamp, setSearchChamp }) => {
    return (
        <div className={styles.searchContainer}>
            <input
                className={styles.searchInput}
                type="text"
                placeholder="Search champions..."
                value={searchChamp}
                onChange={e => setSearchChamp(e.target.value)}
                autoComplete="off"
                spellCheck={false}
            />
        </div>
    );
};

export default ChampionSearch;
