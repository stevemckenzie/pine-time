import moment from 'moment';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { searchClimateStations } from '../../../api';
import { DATE_FORMAT } from '../../../constants';
import Button from '../../../UI/components/Button';
import Link from '../../../UI/components/Link';

import { normalizeStations } from '../../normalizers';

import styles from './styles.module.scss';

const SearchPage = () => {
  const {
    formState: { isSubmitted, isSubmitting, isValid },
    handleSubmit,
    register,
  } = useForm({
    mode: 'onChange',
  });
  const [results, setResults] = useState([]);
  const showNoResults = isSubmitted && !isSubmitting && results.length === 0;
  const onSubmit = async ({ stationName }) => {
    const { features = [] } = await searchClimateStations(stationName);
    const searchResults = normalizeStations(features);
    setResults(searchResults);
  };

  return (
    <div className={styles.search}>
      <form name="searchForm" onSubmit={handleSubmit(onSubmit)}>
        <input
          autoFocus
          name="stationName"
          placeholder="Search for weather stations..."
          ref={register({ required: true })}
          type="text"
        />
        <Button
          disabled={!isValid}
          kind="primary"
          loading={isSubmitting}
          title="Search"
        />
      </form>
      {results.length > 0 && (
        <ul className={styles.stations}>
          {results.map(({ id, lastUpdated, province, stationName }) => (
            <li key={id}>
              <Link title={stationName} to={`/stations/${id}`}>
                <div>
                  <div>{stationName}</div>
                  <div>
                    <small>
                      Last updated: {moment(lastUpdated).format(DATE_FORMAT)}
                    </small>
                  </div>
                </div>
                <div className={styles.meta}>{province}</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {showNoResults && <p>No stations found.</p>}
    </div>
  );
}

export default SearchPage;
