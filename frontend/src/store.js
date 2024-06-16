import { configureStore } from "@reduxjs/toolkit";
import { apiSLice } from "./slices/apiSlice";


const store = configureStore({
    reducer: {
        [apiSLice.reducerPath] : apiSLice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSLice.middleware),
    devTools : true, // we can if we are only in development 
}) 

export default store;