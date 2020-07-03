import moment from 'moment';

import { getClimateStationItems } from '../api';
import { normalizeStationItems } from '../normalizers';

import { setLoading } from './loading';

// TODO: add error handling.
export const loadStationItems = (id) => async (
  dispatch,
  getState,
) => {
  dispatch(setLoading(true));

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
