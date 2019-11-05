import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { DATE_FORMAT } from '../../../constants';
import LoadingIndicator from '../../../UI/components/LoadingIndicator';
import Table from '../../../UI/components/Table';

import styles from './styles.module.scss';
import { loadStationData } from '../../actions/loadStationData';
import { getStation, getStationItems } from '../../selectors';

const HEADERS = [
  'Date',
  'Min Temp',
  'Max Temp',
  'Mean Temp',
  'Precipitation',
];

const StationPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
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

  // TODO: figure out better state management around loading data.
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(loadStationData(id, setLoading));
  }, [dispatch, id]);

  return (
    <div className={styles.stationPage}>
      {loading ? (
        <LoadingIndicator className={styles.loadingIndicator} />
      ) : (
        <div>
          <div className={styles.station}>
            <h2>{stationName}</h2>
            <div>{province}</div>
            <div>Elevation: {elevation}m</div>
            <div>First updated: {moment(firstUpdated).format(DATE_FORMAT)}</div>
            <div>Last updated: {moment(lastUpdated).format(DATE_FORMAT)}</div>
          </div>
          {items.length > 0 && (
            <Table headers={HEADERS} rows={rows} />
          )}
        </div>
      )}
    </div>
  );
};

export default StationPage;
