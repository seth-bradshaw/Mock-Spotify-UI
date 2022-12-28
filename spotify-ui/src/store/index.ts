import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/example';
import trackReducer from './slices/track';

export default configureStore({ 
  reducer: { 
    counterReducer,
    track: trackReducer
  }
})