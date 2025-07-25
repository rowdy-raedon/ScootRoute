import { configureStore } from '@reduxjs/toolkit';

// TODO: Add specific reducers as they are created
const store = configureStore({
  reducer: {
    // Add reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;