/** Imports ... */
import React from 'react';
import { configureStore, createAction, createSlice } from '@reduxjs/toolkit';
import { legacy_createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider, createSelectorHook, createDispatchHook } from 'react-redux';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


/** API Base Query */
const baseUrl = `https://script.google.com/macros/s/AKfycbz-sN9HyNIDWW0hPnaZlfZOFmsXF8M7y_4oq68iDucPDIVonUIbIws_7vu_x2t5zZE75g/exec`
const apiBaseQuery = fetchBaseQuery({baseUrl})

/** Create Main API Reducer */
const apiSlice = createApi({
  reducerPath: "masterApi",
  baseQuery : apiBaseQuery,
  endpoints : () => ({})
})