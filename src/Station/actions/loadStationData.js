import moment from 'moment';

import { getClimateStationItems, getClimateStation } from '../../api';
import { normalizeStations, normalizeStationItems } from '../normalizers';

// TODO: add error handling.
export const loadStationData = (id, setLoading) => async (dispatch, getState) => {
  setLoading(true);

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
  const daysAgo = moment().subtract(30, 'days');
  const month = daysAgo.format('M');
  const year = daysAgo.format('YYYY');

  const { features: climateStationItems } = await getClimateStationItems({
    id,
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

  setLoading(false);
};
