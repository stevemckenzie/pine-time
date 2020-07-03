import classnames from 'classnames';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { setFavorite } from '../../actions/favorite';
import { loadStation } from '../../actions/loadStation';
import { loadStationItems } from '../../actions/loadStationItems';
import { DATE_FORMAT } from '../../constants';
import {
  getStation,
  getStationItems,
  isFavorite,
  isLoading,
} from '../../selectors';

import Button from '../Button';
import LoadingIndicator from '../LoadingIndicator';
import Page from '../Page';
import Table from '../Table';

import styles from './styles.module.scss';

const HEADERS = ['Date', 'Min Temp', 'Max Temp', 'Mean Temp', 'Precipitation'];

const StationPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const favorite = useSelector(isFavorite(id));
  const handleFavorite = () => dispatch(setFavorite(id, !favorite));
  const { elevation, firstUpdated, lastUpdated, province, stationName } =
    useSelector(getStation(id)) || {};
  const items = useSelector(getStationItems(id)) || [];
  const rows = items.map(
    ({
      date,
      maxTemperature,
      meanTemperature,
      minTemperature,
      totalPrecipitation,
    }) => [
      moment(date).format(DATE_FORMAT),
      `${minTemperature}C`,
      `${maxTemperature}C`,
      `${meanTemperature}C`,
      totalPrecipitation > 0 ? `${totalPrecipitation}mm` : 0,
    ],
  );
  const loading = useSelector(isLoading);
  const showLoading = loading && !stationName;

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(loadStation(id));
    dispatch(loadStationItems(id));
  }, [dispatch, id]);

  return (
    <Page
      header={
        <Button
          className={classnames(styles.favoriteButton, {
            [styles.favorite]: favorite,
          })}
          onClick={handleFavorite}
          title={favorite ? 'Remove from favorites' : 'Add to favorites'}
        />
      }
    >
      <div className={styles.stationPage}>
        {showLoading ? (
          <LoadingIndicator className={styles.loadingIndicator} />
        ) : (
          <div>
            <div className={styles.station}>
              <h2>{stationName}</h2>
              <div>{province}</div>
              <div>Station elevation: {elevation}m</div>
              <div>
                First updated: {moment(firstUpdated).format(DATE_FORMAT)}
              </div>
              <div>Last updated: {moment(lastUpdated).format(DATE_FORMAT)}</div>
            </div>
            {items.length > 0 && <Table headers={HEADERS} rows={rows} />}
          </div>
        )}
      </div>
    </Page>
  );
};

export default StationPage;
