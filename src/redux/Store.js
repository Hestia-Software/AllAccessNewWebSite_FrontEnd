import {  createStore, applyMiddleware,compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers/Reducers.js';
import rootSaga from './sagas/Sagas.js';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

function configureStore(preloadedState) {
 
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducers, preloadedState, composeEnhancers(
    applyMiddleware(...middlewares)
  ));

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept("./reducers/Reducers.js", () => {
      const nextRootReducer = require("./reducers/Reducers.js");
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

const store = configureStore();

export default store;