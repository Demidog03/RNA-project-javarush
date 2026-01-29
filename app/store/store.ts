import {combineReducers, configureStore} from "@reduxjs/toolkit";
import todoReducer from "@/app/store/slices/todoSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {persistReducer, persistStore} from 'redux-persist'

const rootReducer = combineReducers({
    todos: todoReducer,
})

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ['todos']
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