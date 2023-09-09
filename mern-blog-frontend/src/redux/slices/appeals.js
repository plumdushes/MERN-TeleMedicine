import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAppeals = createAsyncThunk('/appeals/fetchAppeals', async () => {
    const { data } = await axios.get('/appeals');
    return data;
});

export const fetchTags = createAsyncThunk('/appeals/fetchTags', async () => {
    const { data } = await axios.get('/tags');
    return data;
});

export const fetchRemoveAppeal = createAsyncThunk('/appeals/fetchRemoveAppeal', async (id) =>
    axios.delete(`/appeals/${id}`),
)


const initialState = {
    appeals: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading',
    },
};

const appealsSlice = createSlice({
    name: 'appeals',
    initialState,
    reducers: {},
    extraReducers: {
        //Получение обращений
        [fetchAppeals.pending]: (state) => {
            state.appeals.items = [];
            state.appeals.status = 'loading';
        },
        [fetchAppeals.fulfilled]: (state, action) => {
            state.appeals.items = action.payload;
            state.appeals.status = 'loaded';
        },
        [fetchAppeals.rejected]: (state) => {
            state.appeals.items = [];
            state.appeals.status = 'error';
        },
        //Получение тегов
        [fetchTags.pending]: (state) => {
            state.tags.items = [];
            state.tags.status = 'loading';
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = 'loaded';
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = 'error';
        },
        //Удаление обращений
        [fetchRemoveAppeal.pending]: (state, action) => {
            state.appeals.items = state.appeals.items.filter(obj => obj._id !== action.meta.arg);
        },
    },
});

export const appealsReducer = appealsSlice.reducer;