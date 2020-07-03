import React from 'react';
import { useSelector } from 'react-redux';

import { getFavorites, getStations } from '../../selectors';

import Link from '../Link';
import Page from '../Page';
import StationList from '../StationList';

import styles from './styles.module.scss';

const HomePage = () => {
  const favorites = useSelector(getFavorites);
  const stations = useSelector(getStations);
  const favoriteStations = favorites.map((favorite) => stations[favorite]);

  return (
    <Page
      header={
        <Link
          className={styles.searchButton}
          title="Search for a weather station"
          to="/stations/search"
        />
      }
    >
      <div className={styles.homePage}>
        <StationList stations={favoriteStations} />
      </div>
    </Page>
  );
};

export default HomePage;
