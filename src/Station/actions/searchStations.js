import { searchClimateStations } from '../../api';

import { normalizeStations } from '../normalizers';

export const searchStations = (stationName) => async (dispatch, getState) => {
  const { features = [] } = await searchClimateStations(stationName);
  const searchResults = normalizeStations(features);

  dispatch({
    type: 'SEARCH_RESULTS_UPDATE',
    searchResults,
  });
};
