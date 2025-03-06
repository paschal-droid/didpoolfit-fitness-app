import { createSlice } from "@reduxjs/toolkit";

const prevState = {
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: new Date(),
    gender: '',
    photoURL: null,
    weight: null,
    height: null,
    goals: '',
    existingUser: false
  }

const UserInfo = createSlice({
    name: 'userInfo',
    initialState: prevState,
    reducers: {
        updateUserInfo: (state, action) => {
            return {...state, ...action.payload}
        },
        resetUserInfo: () => {
            return prevState
        }
    }
})

export const {updateUserInfo, resetUserInfo} = UserInfo.actions

export default UserInfo.reducer