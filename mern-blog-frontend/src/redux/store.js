import { configureStore } from '@reduxjs/toolkit';
import { appealsReducer } from './slices/appeals';
import { authReducer } from './slices/auth';

const store = configureStore({
    reducer: {
        appeals: appealsReducer,
        auth: authReducer,
    },
});

export default store;