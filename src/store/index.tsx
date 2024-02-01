import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from './userSlice';
import userListReducer from './userListSlice';

const reducers = combineReducers({
  user: userSlice,
  userList: userListReducer,
});

// 세션 스토리지, 로컬 스토리지에 저장할 때 사용
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const useChatDispatch = () => useDispatch();
export const useChatSelector = useSelector;
