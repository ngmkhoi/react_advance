import { productSlice } from "@/features/product";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import  counterSlice  from '@/features/counter/counterSlice';
import { addressApi } from "@/features/address/addressSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "@/features/auth/authSlice";
import { persistReducer, persistStore, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from 'redux-persist/lib/storage';

// // Configure the Redux store
// export const store = configureStore({
//     reducer: {
//         [counterSlice.reducerPath]: counterSlice.reducer,
//         [productSlice.reducerPath]: productSlice.reducer,
//         [addressApi.reducerPath]: addressApi.reducer,
//         [authSlice.reducerPath]: authSlice.reducer,
//     },
//     middleware: (getDefaultMiddleware) => [
//         ...getDefaultMiddleware(),
//         addressApi.middleware,
//     ]
// })

// 1. Combine reducers
const rootReducer = combineReducers({
    [counterSlice.reducerPath]: counterSlice.reducer,
    [productSlice.reducerPath]: productSlice.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
});

// 2. Config persist
const persistConfig = {
    key: 'root',              // Key trong localStorage
    storage,                  // Sử dụng localStorage
    whitelist: ['auth'],      // ✅ CHỈ persist authSlice
    // blacklist: ['address'], // Hoặc dùng blacklist để loại RTK Query
};

//Wrap rootReducer với persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
        addressApi.middleware,
    ]
})

export const persistor = persistStore(store);

// Optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);