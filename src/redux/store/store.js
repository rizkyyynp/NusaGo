import { configureStore, combineReducers } from '@reduxjs/toolkit';
import darkModeReducer from '../slices/darkModeSlice';

const rootReducer = combineReducers({
    darkMode: darkModeReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

console.log('On Create Store: ', store.getState());

store.subscribe(() => {
    console.log('On Update Store: ', store.getState());
});

export default store;
