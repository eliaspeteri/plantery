import React from 'react';
import styles from '../styles/SearchResult.module.css';
import { Plant } from '../types';

interface Props {
  result: Plant;
}

const SearchResult = ({ result }: Props) => {
  return (
    <div className={styles.result}>
      {result.name} (<i>{result.scientificName}</i>)
    </div>
  );
};

export default SearchResult;
