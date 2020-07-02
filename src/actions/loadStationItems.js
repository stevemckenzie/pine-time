import moment from 'moment';

import { getClimateStationItems, getClimateStation } from '../api';
import { normalizeStations, normalizeStationItems } from '../normalizers';
import { getStationItems } from '../selectors';

import { setLoading } from './loading';

// TODO: add error handling.
export const loadStationItems = (id) => async (
  dispatch,
  getState,
) => {
  if (getStationItems(id)(getState())) {
    return;
  }

  dispatch(setLoading(true));

  const { features: climateStations } = await getClimateStation(id);

  if (!climateStations.length) {
    // TODO: handle when we do not get a station back.
  }

  const stations = normalizeStations(climateStations);
  const [station] = stations;

  dispatch({
    type: 'STATIONS_UPDATE',
    stations: {
      [id]: station,
    },
  });

  // TODO: make this configurable for the user.
  const limit = 30;
  const today = moment();
  const month = today.format('M');
  const year = today.format('YYYY');

  const { features: climateStationItems } = await getClimateStationItems({
    id,
    limit,
    month,
    year,
  });
  const items = normalizeStationItems(climateStationItems);

  dispatch({
    type: 'STATION_ITEMS_UPDATE',
    items: {
      [id]: items,
    },
  });

  dispatch(setLoading(false));
};
