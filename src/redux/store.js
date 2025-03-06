import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage'
import User from "./reducers/User";
import UserInfo from './reducers/AccountCreationInfo'
import ChartData from "./reducers/ChartData";
import WorkoutSchedule from "./reducers/WorkoutSchedule";

const rootReducer = combineReducers({
    user: User,
    userInfo: UserInfo,
    chartData: ChartData,
    workoutSchedule: WorkoutSchedule
})

const configStorage = {
    key: 'root',
    storage: AsyncStorage,
    version: 1
}

const persistorReducer = persistReducer(configStorage, rootReducer);


const store = configureStore({
    reducer: persistorReducer,
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware({
        serializableCheck: false, // Disabling serializableCheck to avoid non-serializable warnings
      }), // No logger middleware included
  });

export default store

export const persistor = persistStore(store);

// persistor.purge()  //! this is used to reset the state from all the reducers created (users, donation, categories)


