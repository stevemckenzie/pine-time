import { getClimateStation } from '../api';
import { normalizeStations } from '../normalizers';
import { getStation } from '../selectors';

import { setLoading } from './loading';

// TODO: add error handling.
export const loadStation = (id) => async (
  dispatch,
  getState,
) => {
  if (getStation(id)(getState())) {
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

  dispatch(setLoading(false));
};
