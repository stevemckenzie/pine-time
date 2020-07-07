import classnames from 'classnames';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { parse, stringify } from 'querystring';

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
import DatePicker from '../DatePicker';
import LoadingIndicator from '../LoadingIndicator';
import Page from '../Page';

import styles from './styles.module.scss';

const dateToString = (date) => moment(date).format(DATE_FORMAT);
const getDayMonthYear = (date) => {
  const d = moment(date);

  return {
    day: d.format('D'),
    month: d.format('M'),
    year: d.format('YYYY'),
  };
};

const StationPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const favorite = useSelector(isFavorite(id));
  const handleFavorite = () => dispatch(setFavorite(id, !favorite));
  const { elevation, firstUpdated, lastUpdated, stationName } =
    useSelector(getStation(id)) || {};
  const items = useSelector(getStationItems(id)) || [];
  const loading = useSelector(isLoading);
  const history = useHistory();
  const handleDateChange = (date) => {
    history.push({
      search: stringify({ date: dateToString(date) }),
    });
  };

  const { search } = useLocation();
  const { date: queryDate } = parse(search.substr(1));
  const currentDate = queryDate ? moment(queryDate, DATE_FORMAT) : moment();
  const currentDateTitle = currentDate.format('MMMM YYYY');

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(loadStation(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!id) {
      return;
    }

    const { month, year } = getDayMonthYear(queryDate);
    dispatch(loadStationItems({ id, month, year }));
  }, [dispatch, id, queryDate]);

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
        {stationName && (
          <div className={styles.station}>
            <h2>{stationName}</h2>
            <div>Station elevation: {elevation}m</div>
            <div>First updated: {moment(firstUpdated).format(DATE_FORMAT)}</div>
            <div>Last updated: {moment(lastUpdated).format(DATE_FORMAT)}</div>
          </div>
        )}
        {items.length > 0 && (
          <div className={styles.items}>
            <div className={styles.filter}>
              <DatePicker
                minDate={moment(firstUpdated).toDate()}
                onChange={handleDateChange}
                title={currentDateTitle}
                value={currentDate.toDate()}
              />
            </div>
            {items.map(
              ({
                date,
                maxTemperature,
                minTemperature,
                totalPrecipitation,
              }) => (
                <div
                  className={classnames(styles.item, {
                    [styles.selected]: moment(date).isSame(currentDate),
                  })}
                >
                  <div className={styles.day}>{moment(date).format('D')}</div>
                  <div className={styles.temp}>
                    <div className={styles.high}>{maxTemperature}</div>
                    <div className={styles.right}>
                      <div className={styles.c}>°C</div>
                      <div className={styles.low}>{minTemperature}</div>
                    </div>
                  </div>
                  <div className={styles.mm}>{totalPrecipitation}mm</div>
                </div>
              ),
            )}
          </div>
        )}
        {loading && <LoadingIndicator className={styles.loadingIndicator} />}
      </div>
    </Page>
  );
};

export default StationPage;
