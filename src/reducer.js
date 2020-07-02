import { combineReducers } from 'redux';

const stations = (state = {
  favorites: [],
  items: {},
  stations: {},
}, { type, ...props }) => {
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

const ui = (state = { loading: 0 }, { type, ...props }) => {
  switch (type) {
    case 'SET_LOADING': {
      const loading = state.loading + props.loading;

      return {
        ...state,
        loading,
      };
    }

    default:
      return state;
  }
};

export default combineReducers({
  stations,
  ui,
});
