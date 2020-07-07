import { throttle } from 'lodash';
import { applyMiddleware, createStore as createStoreRedux } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './reducer';

export const loadPersistedState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const persistState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    console.log('Failed to persist', e);
  }
};

// TODO: anything to add?
export const createStore = () => {
  const thunkMiddleware = thunk.withExtraArgument({});
  const middleware = [thunkMiddleware];
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    middleware.push(createLogger());
  }

  // TODO: does not support hot reloading yet...
  const createStoreWithMiddleware = applyMiddleware(...middleware)(
    createStoreRedux,
  );

  const persistedState = loadPersistedState();
  const store = createStoreWithMiddleware(reducer, persistedState);

  store.subscribe(() => {
    store.subscribe(
      throttle(() => {
        // TODO: figure out a better way to manage selective persisting.
        const { stations } = store.getState();
        persistState({ stations });
      }, 1000),
    );
  });

  if (!isProduction && module.hot) {
    module.hot.accept('./reducer', () => store.replaceReducer(reducer));
  }

  return store;
};
