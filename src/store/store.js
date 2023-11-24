import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice';
const store = configureStore({
    reducer:{
        auth:authSlice,
        //add one more slice for posts
    }
});


export default store;