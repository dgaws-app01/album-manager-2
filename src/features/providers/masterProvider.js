/** Imports ... */
import React from 'react';
import { configureStore, createAction, createSlice } from '@reduxjs/toolkit';
import { legacy_createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider, createSelectorHook, createDispatchHook } from 'react-redux';
import {
  createApi,
  fetchBaseQuery,
  ApiProvider,
} from '@reduxjs/toolkit/query/react';

/** Configuring API Management Capabilities */
/** API Base Query */
const baseUrl = `https://script.google.com/macros/s/AKfycbz-sN9HyNIDWW0hPnaZlfZOFmsXF8M7y_4oq68iDucPDIVonUIbIws_7vu_x2t5zZE75g/exec`;
const apiBaseQuery = fetchBaseQuery({ baseUrl });

/** Create Main API Reducer with new API adding functionality */
const apiSlice = createApi({
  reducerPath: 'masterApi',
  baseQuery: apiBaseQuery,
  endpoints: () => ({}),
});

apiSlice.add = (qs) => {
  api.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => {
      let endPoints = {};
      let apis = qs || {};
      Object.keys(apis).forEach((k) => {
        let { name, respH } = apis[k];
        if (!respH) respH = (r) => r.json();

        endPoints[k] = builder.mutation({
          query: ({ question }) => ({
            url: `${name || ''}`,
            method: 'POST',
            body: question,
            responseHandler: respH,
            validateStatus: (response, result) =>
              response.status === 200 && !result.isError,
          }),
        });
      });

      return endPoints;
    },
  });
};

/** Configuring Store Management Capabilities */
const createEmptyStore = () => {
  let newStore = configureStore({
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
    reducer: {},
    preloadedState: { storeName: 'masterStore' },
  });

  newStore.loadedReducers = {};
  newStore.storeContext = React.createContext();
  newStore.useSelect = createSelectorHook(newStore.storeContext);
  newStore.useDispatch = createDispatchHook(newStore.storeContext);

  newStore.addSlice = (slice) => {
    let { name, reducer } = slice;
    newStore.loadedReducers[name] = reducer;
    newStore.replaceReducer(combineReducers(newStore.loadedReducers));
  };

  return newStore;
};

export const stores = {
  master: createEmptyStore(),
};

const $0 = (o, n) => {
  let name = Object.keys(o)[0];
  let out = { [n[0]]: name, [n[1]]: o[name] };
  console.log(out);
  return out;
};

export const modifyStore = (props) => {
  const { storeName, store } = $0(props, ['storeName', 'store']);
  const retVal = {};
  //const store = props[storeName];

  if (storeName) {
    const {
      name,
      reducer: { initialState, actions },
    } = $0(store, ['name', 'reducer']);

    const slice = createSlice({
      name,
      initialState,
      reducers: actions,
    });

    const targetStore = (stores[storeName] =
      stores[storeName] || createEmptyStore());
    targetStore.addSlice(slice);

    // console.log({
    //   storeName,
    //   store,
    //   name,
    //   initialState,
    //   actions,
    //   acts: slice.actions,
    //   reds: slice.caseReducers,
    // });

    return {
      actions: slice.actions,
    };
  }
};

//const createStoreAcessManager =
