import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Slices/authSlice';
import profileReducer from '../Slices/profileSlice';
import cartReducer from '../Slices/cartSlice';
import courseReducer from '../Slices/courseSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        cart: cartReducer,
        course: courseReducer
    }
});

export default store; 