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
  apiSlice.injectEndpoints({
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
  const newStore = configureStore({
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
    reducer: {},
    preloadedState: { storeName: 'masterStore' },
  });

  let storeElements = {};

  storeElements.loadedReducers = {};
  storeElements.storeContext = React.createContext();
  storeElements.selector = createSelectorHook(storeElements.storeContext);
  storeElements.dispatchF = createDispatchHook(storeElements.storeContext);
  storeElements.dispatcher = null;

  let dispatcherExtractor = (storeElements.dispatcherExtractor = ({
    children,
  }) => {
    storeElements.dispatcher = storeElements.dispatchF();
    return <>{children}</>;
  });

  storeElements.provider = ({ children }) => {
    let provider = (
      <Provider store={newStore} context={storeElements.storeContext}>
        {children}
      </Provider>
    );

    return (
      <>
        <provider>
          <dispatcherExtractor></dispatcherExtractor>
        </provider>
      </>
    );
  };

  /**
   * @param {Slice} slice
   */
  storeElements.addSlice = (slice) => {
    let { name, reducer } = slice;
    storeElements.loadedReducers[name] = reducer;
    newStore.replaceReducer(combineReducers(storeElements.loadedReducers));
  };

  const storeKeeper = {
    get state() {
      return storeElements.selector((state) => state);
    },
    set state(act){
      storeElements.dispatcher(act)
    },
    setStateViaAction(act){
      storeElements.dispatcher(act)
    },

    addSlice : storeElements.addSlice,
    provider : storeElements.provider

  };

  return storeKeeper;
};

const stores = {
  master: createEmptyStore(),
};


const $0 = (o, n) => {
  let name = Object.keys(o)[0];
  let out = { [n[0]]: name, [n[1]]: o[name] };
  console.log(out);
  return out;
};

const modifyStore = (props) => {
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

const FinalProvider = ({children}) => {
  let storeList = Object.keys(stores)
  storeList.reverse()
  let provs = <ApiProvider api={apiSlice}>{children}</ApiProvider>
  storeList.forEach(storNm=> {
    let {provider} = stores[storNm]
    provs = <provider>{provs}</provider>
  })

  return provs
}

/** Test - To be deleted */


/** Delete till here  */

const Api = apiSlice
export {modifyStore, FinalProvider, Api, stores}

//const createStoreAcessManager =
