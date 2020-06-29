import { combineReducers } from 'redux';

// TODO: load from localStorage.
const initialState = {
  favorites: [],
  items: {},
  searchResults: [],
  stations: {},
};

const stations = (state = initialState, { type, ...props }) => {
  switch (type) {
    case 'FAVORITE_ADD': {
      const { id } = props;

      if (state.favorites.includes(id)) {
        return state;
      }

      const favorites = [...state.favorites, id];

      return {
        ...state,
        favorites,
      };
    }

    case 'FAVORITE_REMOVE': {
      const { id } = props;
      const index = state.favorites.findIndex((f) => f === id);

      if (index === -1) {
        return state;
      }

      const favorites = [...state.favorites];
      favorites.splice(index, 1);

      return {
        ...state,
        favorites,
      };
    }

    case 'SEARCH_RESULTS_UPDATE': {
      return {
        ...state,
        ...props,
      };
    }

    case 'STATIONS_UPDATE': {
      const stations = {
        ...state.stations,
        ...props.stations,
      };

      return {
        ...state,
        stations,
      };
    }

    case 'STATION_ITEMS_UPDATE': {
      const items = {
        ...state.items,
        ...props.items,
      };

      return {
        ...state,
        items,
      };
    }

    default:
      return state;
  }
};

export default combineReducers({
  stations,
});
