export const getStation = (id) => ({ stations: { stations = {} } }) => stations[id];
export const getStations = ({ stations: { stations = {} } }) => stations;
export const getStationItems = (id) => ({ stations: { items = {} } }) => items[id];
export const getFavorites = ({ stations: { favorites = [] }}) => favorites;
export const isFavorite = (id) => ({ stations: { favorites = [] }}) => favorites.includes(id);
export const isLoading = ({ ui: { loading } }) => loading > 0;
