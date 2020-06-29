import moment from 'moment';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { DATE_FORMAT } from '../../../constants';
import Button from '../../../UI/components/Button';
import Link from '../../../UI/components/Link';

import { searchStations } from '../../actions/searchStations';
import { getSearchResults } from '../../selectors';

import styles from './styles.module.scss';

const SearchPage = () => {
  const {
    formState: { isSubmitted, isSubmitting, isValid },
    handleSubmit,
    register,
  } = useForm({
    mode: 'onChange',
  });
  const dispatch = useDispatch();
  const onSubmit = async ({ stationName }) =>
    dispatch(searchStations(stationName));

  const results = useSelector(getSearchResults);
  const showNoResults = isSubmitted && !isSubmitting && results.length === 0;

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
