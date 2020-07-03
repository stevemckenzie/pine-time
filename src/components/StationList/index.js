import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import { DATE_FORMAT } from '../../constants';

import Link from '../Link';

import styles from './styles.module.scss';

const StationList = ({ stations }) => (
  <ul className={styles.stationList}>
    {stations.map(({ id, lastUpdated, province, stationName }) => (
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
);

StationList.propTypes = {
  stations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    lastUpdated: PropTypes.string,
    province: PropTypes.string,
    stationName: PropTypes.string,
  })).isRequired,
}

export default StationList;
