/** Imports ... */
import React from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
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
  const endpointsInReturn = apiSlice.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => {
      let endPoints = {};
      let apis = qs || {};
      Object.keys(apis).forEach((endPointName) => {
        let { respH } = apis[endPointName];
        if (!respH) respH = (r) => r.json();

        endPoints[endPointName] = builder.query({ //builder.mutation({
          query: ({ question }) => ({
            //url: `${name || ''}`,
            method: 'POST',
            body: JSON.stringify(question),
            responseHandler: (r)=> console.log(r)//respH,
            // validateStatus: (response, result) =>
            //   response.status === 200 && !result.isError,
          }),
        });
      });

      return endPoints;
    },
  });
  return endpointsInReturn;
};



/** Configuring Store Management Capabilities */
const createEmptyStore = () => {
  const newStore = configureStore({
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
    reducer: {},
    preloadedState: { storeName: 'masterStore' },
  });

  let storeElements = {};

  const loadedReducers = {};

  const storeContext = React.createContext();
  storeElements.dispatchF = createDispatchHook(storeContext);
  storeElements.selector = createSelectorHook(storeContext);
  storeElements.dispatcher = null;

  const StoreProvider = ({ children }) => {
    return (
      <Provider store={newStore} context={storeContext}>
        {children}
      </Provider>
    );
  };

  const DispatcherExtractor = ({ children }) => {
    storeElements.dispatcher = storeElements.dispatchF();
    return <>{children}</>;
  };

  storeElements.StoreProvider = ({ children }) => {
    return (
      <StoreProvider>
        <DispatcherExtractor>{children}</DispatcherExtractor>
      </StoreProvider>
    );
  };

  /**
   * @param {Slice} slice
   */
  storeElements.addSlice = (slice) => {
    let { name, reducer } = slice;
    loadedReducers[name] = reducer;
    newStore.replaceReducer(combineReducers(loadedReducers));

    let { actions } = slice;
    const retActs = {};
    Object.keys(actions).forEach((actNm) => {
      retActs[actNm] = function (payload) {
        const act = actions[actNm];
        newStore.dispatch(act(payload));
      };
    });
    return retActs;
  };

  const storeKeeper = {
    get state() {
      return storeElements.selector((state) => state);
    },
    set state(act) {
      newStore.dispatch(act);
    },
    setStateViaAction(act) {
      newStore.dispatch(act);
      //storeElements.dispatcher(act);
    },
    get actionDispatcher() {
      return storeElements.dispatcher;
    },

    addSlice: storeElements.addSlice,
    StoreProvider: storeElements.StoreProvider,
    rowStore: newStore,
  };

  return storeKeeper;
};

const stores = {
  master: createEmptyStore(),
};

const $0 = (o, n) => {
  let name = Object.keys(o)[0];
  let out = { [n[0]]: name, [n[1]]: o[name] };
  //console.log(out);
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

    const targetStore = (stores[storeName] =
      stores[storeName] || createEmptyStore());

    const actions2 = {};
    Object.keys(actions).forEach((actNm) => {
      let actF = actions[actNm];
      let actF2 = (state, action) => {
        let state2 = JSON.parse(JSON.stringify(state));
        //console.log(state2)
        let { payload } = action;
        actF(payload, state2);
        return state2;
      };
      actions2[actNm] = actF2;
    });

    const slice = createSlice({
      name,
      initialState,
      reducers: actions2,
    });

    const retActs = targetStore.addSlice(slice);

    return retActs;
  }
};

const FinalProvider = ({ children }) => {
  let storeList = Object.keys(stores);
  storeList.reverse();
  let provs = <ApiProvider api={apiSlice}>{children}</ApiProvider>;
  storeList.forEach((storNm) => {
    let { StoreProvider } = stores[storNm];
    provs = <StoreProvider>{provs}</StoreProvider>;
  });

  return provs;
};

const Api =  apiSlice
const addApi = apiSlice.add

/** Test - To be deleted */
//stores.master.state})
//stMod.testAction_01({name: "aabbcc", ids: [3,7]})

/** Delete till here  */

export { FinalProvider, Api, modifyStore, addApi , stores };

//const createStoreAcessManager =
