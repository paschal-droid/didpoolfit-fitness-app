import { createSlice } from "@reduxjs/toolkit";

const prevState = {
    schedules: [],
    selectedSchedule: {},
}

const WorkoutSchedule = createSlice({
    name: 'workoutSchedule',
    initialState: prevState,
    reducers: {
        addNewSchedule: (state, action) => {
            const schedule = action.payload
            state.schedules.push(schedule)
        },
        setSelectedSchedule: (state, action) => {
            return {...state, selectedSchedule: action.payload}
        },
        confirmCheckedSchedule: (state, action) => {
            const {id, checked} = action.payload
            return {...state, schedules: state.schedules.map((item) => item.id === id ? {...item, checked} : item)}
        },
        resetSchedule: () => {
            return prevState
        }
    }
})

export const { resetUserInfo, addNewSchedule, setSelectedSchedule, confirmCheckedSchedule } = WorkoutSchedule.actions

export default WorkoutSchedule.reducer