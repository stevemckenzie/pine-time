export const getStation = (id) => ({ stations: { stations = {} } }) => stations[id];
export const getStationItems = (id) => ({ stations: { items = {} } }) => items[id];

export const isLoading = ({ ui: { loading } }) => loading > 0;
