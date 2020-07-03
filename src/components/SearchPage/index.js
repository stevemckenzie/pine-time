import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { searchClimateStations } from '../../api';
import { normalizeStations } from '../../normalizers';

import Button from '../Button';
import Page from '../Page';
import StationList from '../StationList';

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
    const { features = [] } = await searchClimateStations({ stationName });
    const searchResults = normalizeStations(features);
    setResults(searchResults);
  };

  return (
    <Page>
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
          <StationList stations={results} />
        )}
        {showNoResults && <p>No stations found.</p>}
      </div>
    </Page>
  );
}

export default SearchPage;
