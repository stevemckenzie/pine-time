export const apiClient = async (url, options = {}) => {
  const response = await fetch(`https://geo.weather.gc.ca/geomet/features/collections${url}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  return response.json();
}

export const searchClimateStations = async (stationName) =>
  apiClient(
    `/climate-stations/items?f=json&limit=10&STATION_NAME=${stationName}`,
  );

export const getClimateStationItems = async (featureId) => {
  apiClient(`/climate-daily/items/${featureId}?f=json`);
};
