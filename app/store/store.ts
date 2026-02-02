import {combineReducers, configureStore} from "@reduxjs/toolkit";
import todoReducer from "@/app/store/slices/todoSlice";
// eslint-disable-next-line import/namespace
import authReducer from "@/app/store/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {persistReducer, persistStore} from 'redux-persist'

const rootReducer = combineReducers({
    todos: todoReducer,
    auth: authReducer
})

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ['todos', 'auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            }
        })
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;