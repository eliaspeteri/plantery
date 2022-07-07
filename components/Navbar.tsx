import Link from 'next/link';
import React from 'react';

import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.bar}>
      <Link href='/'>
        <a className={styles.item}>Home</a>
      </Link>
      <Link href='/plants'>
        <a className={styles.item}>Plants</a>
      </Link>
      <Link href='/new-plant'>
        <a className={styles.item}>Add a plant</a>
      </Link>
      <Link href='/login'>
        <a className={[styles.item, styles.login].join(' ')}>Login</a>
      </Link>
    </div>
  );
};

export default Navbar;
