import { configureStore } from '@reduxjs/toolkit';
import trackReducer from './slices/track';
import artistReducer from './slices/artist';

export default configureStore({ 
  reducer: { 
    track: trackReducer,
    artist: artistReducer
  }
})