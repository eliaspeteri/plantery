import React, { useState } from 'react';
import styles from '../styles/Searchbar.module.css';
import { Plant } from '../types';
import SearchResult from './SearchResult';

import data from '../data/plants.json';

const Searchbar = () => {
  const [results, setResults] = useState<Plant[]>([]);
  const [search, setSearch] = useState('');

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    // If search matches data item, add to results
    const matches = data.filter((item) => {
      const regex = new RegExp(e.target.value, 'gi');
      return item.name.match(regex) || item.latin.match(regex);
    });
    setResults(matches);
    // If search is empty, reset results
    if (e.target.value === '') {
      setResults([]);
    }
  };

  return (
    <div>
      <input
        type='text'
        placeholder='Search for a plant...'
        className={styles.searchbar}
        value={search}
        onChange={onSearchChange}
      />
      {results.map((result) => (
        <SearchResult result={result} key={result.id} />
      ))}
    </div>
  );
};

export default Searchbar;
