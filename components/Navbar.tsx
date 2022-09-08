import Link from 'next/link';
import React from 'react';
import SessionContext from '../contexts/SessionContext';

import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  // Regex for picking out name initials.
  let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
  return (
    <div className={styles.bar}>
      <Link href='/'>
        <a className={styles.item}>Home</a>
      </Link>
      <Link href='/plants'>
        <a className={styles.item}>Plants</a>
      </Link>
      <Link href='/forum'>
        <a className={styles.item}>Forum</a>
      </Link>
      <SessionContext.Consumer>
        {({ user }) =>
          user.name !== '' ? (
            <>
              <Link href='/new-plant'>
                <a className={styles.item}>Add a plant</a>
              </Link>
              <Link href='/my-plants'>
                <a className={styles.item}>My plants</a>
              </Link>
              {/* Displays user initials if user is logged in. Else a login link is displayed.*/}
              <div className={[styles.item, styles.login].join(' ')}>
                {(
                  (([...user.name.matchAll(rgx)] || []).shift()?.[1] || '') +
                  (([...user.name.matchAll(rgx)] || []).pop()?.[1] || '')
                ).toUpperCase()}
              </div>
            </>
          ) : (
            <>
              <Link href='/login'>
                <a className={[styles.item, styles.login].join(' ')}>Login</a>
              </Link>
            </>
          )
        }
      </SessionContext.Consumer>
    </div>
  );
};

export default Navbar;
