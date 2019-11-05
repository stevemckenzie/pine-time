import React from 'react';

import Link from '../UI/components/Link';
import Routes from '../routes';

import styles from './styles.module.scss';

const App = () => (
  <div className={styles.app}>
    <div className={styles.header}>
      <Link className={styles.logo} to="/">
        <h1>Pine Time</h1>
      </Link>
      <Link className={styles.searchButton} title="Search for a weather station" to="/stations/search" />
    </div>
    <div className={styles.content}>
      <Routes />
    </div>
  </div>
);

export default App;
