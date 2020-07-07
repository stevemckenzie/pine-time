import { getClimateStationItems } from '../api';
import { normalizeStationItems } from '../normalizers';

import { setLoading } from './loading';

const updateStationItems = (id, items) => ({
  type: 'STATION_ITEMS_UPDATE',
  items: {
    [id]: items,
  },
});

// TODO: add error handling.
export const loadStationItems = ({ id, limit, month, year }) => async (
  dispatch,
  getState,
) => {
  dispatch(setLoading(true));
  dispatch(updateStationItems(id, []));

  const { features: climateStationItems } = await getClimateStationItems({
    id,
    limit,
    month,
    year,
  });

  dispatch(updateStationItems(id, normalizeStationItems(climateStationItems)));
  dispatch(setLoading(false));
};
