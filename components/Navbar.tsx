import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import SessionContext from '../contexts/SessionContext';

import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  // Regex for picking out name initials.
  let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

  return (
    <SessionContext.Consumer>
      {(session) => (
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
          {session.user ? (
            <>
              <Link href='/new-plant'>
                <a className={styles.item}>Add a plant</a>
              </Link>
              <Link href='/my-plants'>
                <a className={styles.item}>My plants</a>
              </Link>
              {/* Displays user initials if user is logged in. Else a login link is displayed.*/}
              <Link href='/logout'>
                <a
                  className={[
                    styles.item,
                    session ? styles.logout : styles.login
                  ].join(' ')}
                >
                  Logout
                </a>
              </Link>
              {/* <div className={[styles.item, styles.login].join(' ')}>
                {(
                  (([...session.user.name.matchAll(rgx)] || []).shift()?.[1] || '') +
                  (([...session.user.name.matchAll(rgx)] || []).pop()?.[1] || '')
                ).toUpperCase()}
              </div> */}
            </>
          ) : (
            <>
              <Link href='/login'>
                <a className={[styles.item, styles.login].join(' ')}>Login</a>
              </Link>
            </>
          )}
        </div>
      )}
    </SessionContext.Consumer>
  );
};

export default Navbar;
