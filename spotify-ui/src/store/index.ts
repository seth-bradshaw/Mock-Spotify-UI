import { configureStore } from '@reduxjs/toolkit';
import trackReducer from './slices/track';

export default configureStore({ 
  reducer: { 
    track: trackReducer
  }
})