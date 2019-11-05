import { omitBy } from 'lodash';
import { stringify } from 'querystring';

const API_URL = 'https://geo.weather.gc.ca/geomet/features/collections';
const DEFAULT_QUERY = { f: 'json' };

export const apiClient = async ({
  url,
  options = {},
  query = {},
}) => {
  const q = stringify({
    ...DEFAULT_QUERY,
    ...omitBy(query, (v) => !v),
  });
  const response = await fetch(`${API_URL}${url}?${q}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  return response.json();
};

export const searchClimateStations = async (stationName) =>
  apiClient({
    url: '/climate-stations/items',
    query: {
      limit: 25,
      STATION_NAME: stationName,
    },
  });

export const getClimateStation = async (id) =>
  apiClient({
    url: '/climate-stations/items',
    query: { CLIMATE_IDENTIFIER: id },
  });

export const getClimateStationItems = async ({ id, day, limit = 30, month, year }) =>
  apiClient({
    url: `/climate-daily/items/`,
    query: {
      CLIMATE_IDENTIFIER: id,
      limit,
      LOCAL_YEAR: year,
      LOCAL_MONTH: month,
      LOCAL_DAY: day,
    },
  });
