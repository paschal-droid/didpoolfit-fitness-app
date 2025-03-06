import { createSlice } from "@reduxjs/toolkit";
import { barData } from "../../data/constants";

const prevState = {
   chartData: [],
  }

const ChartData = createSlice({
    name: 'chartData',
    initialState: prevState,
    reducers: {
        updateChartInfo: (state, action) => {
            return {...state, chartData: action.payload}
        },
        resetChartData: () => {
            return prevState
        }
    }
})

export const {resetChartData, updateChartInfo} = ChartData.actions


export const fetchChartData = () => (dispatch) => {
   const chartData = barData

   dispatch(updateChartInfo(chartData))
}

export default ChartData.reducer