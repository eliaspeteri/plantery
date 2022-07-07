import Link from 'next/link';
import React from 'react';
import styles from '../styles/SearchResult.module.css';
import { Plant } from '../types';

interface Props {
  result: Plant;
}

const SearchResult = ({ result }: Props) => {
  return (
    <div className={styles.result}>
      <Link
        href='/[plant]'
        as={`/${result.name?.toLocaleLowerCase().replace(' ', '-')}`}
      >
        <a>
          {result.name} (<i>{result.scientificName}</i>)
        </a>
      </Link>
    </div>
  );
};

export default SearchResult;
