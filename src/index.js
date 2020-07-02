import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import reducer from './reducer';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import './styles/index.scss';

// TODO: anything to add?
const thunkMiddleware = thunk.withExtraArgument({});
const middleware = [thunkMiddleware];
const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  middleware.push(createLogger());
}

// TODO: does not support hot reloading yet...
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
const store = createStoreWithMiddleware(reducer);

if (!isProduction && module.hot) {
  module.hot.accept('./reducer', () => store.replaceReducer(reducer));
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
