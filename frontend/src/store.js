import { configureStore } from "@reduxjs/toolkit";
import { apiSLice } from "./slices/apiSlice.js";
import  cartSliceReducer  from './slices/cartSlice.js'
import authReducer from './slices/authSlice.js';


const store = configureStore({
    reducer: {
        [apiSLice.reducerPath] : apiSLice.reducer,
        cart:cartSliceReducer,
        auth:authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSLice.middleware),
    devTools : true, // we can if we are only in development 
}) 

export default store;