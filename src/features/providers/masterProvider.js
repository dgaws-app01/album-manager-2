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
      Object.keys(apis).forEach((endPointName) => {
        let { respH } = apis[endPointName];
        if (!respH) respH = (r) => r.json();

        // endPoints[endPointName] = builder.mutation({
        //   query: ({ question }) => ({
        //     //url: `${name || ''}`,
        //     method: 'POST',
        //     body: question,
        //     responseHandler: respH,
        //     validateStatus: (response, result) =>
        //       response.status === 200 && !result.isError,
        //   }),
        // });
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
  }

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
  };

  const storeKeeper = {
    get state() {
      return storeElements.selector((state) => state);
    },
    set state(act) {
      //console.log(storeElements)
      newStore.dispatch(act)
      //storeElements.dispatcher(act);
    },
    setStateViaAction(act) {
      //newStore.dispatch(act)
      storeElements.dispatcher(act);
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

    const slice = createSlice({
      name,
      initialState,
      reducers: actions,
    });

    const targetStore = (stores[storeName] =
      stores[storeName] || createEmptyStore());
    targetStore.addSlice(slice);

    return {
      actions: slice.actions,
    };
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

const Api = apiSlice;
/** Test - To be deleted */

let stMod = modifyStore({
  master: {
    testResucer: {
      initialState: { selectedItem: 0, items: ['L', 'P', 'H'] },
      actions: {
        testAction_01: (state, act) => {
          console.log({when:"performing action 'testAction_01'", params : {state, act}})
          state.curtime = new Date().getTime();
          return state;
        },
      },
    },
  },
});

console.log(stMod);
stores.master.state = stMod.actions.testAction_01({name: "aabbcc", ids: [3,7]})
//console.log({when:"after performing action 'testAction_01'", v : stores.master.state})

Api.add({
  q1: { respH: (x) => console.log(x) },
});

/** Delete till here  */

export { modifyStore, FinalProvider, Api, stores };

//const createStoreAcessManager =
