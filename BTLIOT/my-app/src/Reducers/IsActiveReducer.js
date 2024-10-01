import { createSlice } from "@reduxjs/toolkit"

const intialisActive = {
    isActiveABC: true,
    page: 1,
    colorPage1: 'white',
    colorPage2: 'white',
    colorPage3: 'white',
    colorPage4: 'white',
    currentPageHistory: 1,
    currentPageAction: 1,
    dataHistory: [],
    dataAction: [],
    totalHistory: 0,
    totalAction: 0,
    pageSizeHistory: 10,
    pageSizeAction: 10,
    flagReloadPage1: true,
    flagReloadPage2: true,
    statusFan: false,
    statusAC: false,
    statusLight: false,
    tempFilter: '',
    humidFilter: '',
    lightFilter: '',
    timeFilter: '',
    timeFilter2: '',
    notiAnt: false,
    tempFilterLatest: '',
    humidFilterLatest: '',
    lightFilterLatest: '',
    timeFilterLatest: '',
    tempFilterLatest2: '',
    humidFilterLatest2: '',
    lightFilterLates2: '',
    timeFilterLatest2: '',
    dataChart: {
        temperature: [1, 2, 12, 4, 5, 6, 15, 8, 9, 1, 11, 12],
        humid: [1, 2, 12, 4, 5, 6, 15, 8, 9, 1, 11, 12],
        light: [1, 2, 12, 4, 5, 6, 15, 8, 9, 1, 11, 12],

    },
    loading1: false,
    loading2: false,
    loading3: false,
};
const changeLoading1 = (state, action) => {
    state.loading1 = action.payload;
}
const changeLoading2 = (state, action) => {
    state.loading2 = action.payload;
}
const changeLoading3 = (state, action) => {
    state.loading3 = action.payload;
}
const changeDataChart = (state, action) => {
    state.dataChart = action.payload;
}
const changeHumidFilterLatest2 = (state, action) => {
    state.humidFilterLatest2 = action.payload;
}
const changeLightFilterLatest2 = (state, action) => {
    state.lightFilterLatest2 = action.payload;
}
const changeTempFilterLatest2 = (state, action) => {
    state.tempFilterLatest2 = action.payload;
}
const changeTimeFilterLatest2 = (state, action) => {
    state.timeFilterLatest2 = action.payload;
}

const changeHumidFilterLatest = (state, action) => {
    state.humidFilterLatest = action.payload;
}
const changeLightFilterLatest = (state, action) => {
    state.lightFilterLatest = action.payload;
}
const changeTempFilterLatest = (state, action) => {
    state.tempFilterLatest = action.payload;
}
const changeTimeFilterLatest = (state, action) => {
    state.timeFilterLatest = action.payload;
}

const changeNotiAnt = (state, action) => {
    state.notiAnt = action.payload;
}
const changeHumidFilter = (state, action) => {
    state.humidFilter = action.payload;
}
const changeLightFilter = (state, action) => {
    state.lightFilter = action.payload;
}
const changeTempFilter = (state, action) => {
    state.tempFilter = action.payload;
}
const changeTimeFilter = (state, action) => {
    state.timeFilter = action.payload;
}

///
const changeTimeFilter2 = (state, action) => {
    state.timeFilter2 = action.payload;
}
const changeStatusFan = (state, action) => {
    state.statusFan = action.payload;
}
const changeStatusAC = (state, action) => {
    state.statusAC = action.payload;
}
const changeStatusLight = (state, action) => {
    state.statusLight = action.payload;
}
const changeFlagReloadPage1 = (state, action) => {
    state.flagReloadPage1 = action.payload;
}
const changeFlagReloadPage2 = (state, action) => {
    state.flagReloadPage2 = action.payload;
}
const changePageSizeHistory = (state, action) => {
    state.pageSizeHistory = action.payload;
}
const changePageSizeAction = (state, action) => {
    state.pageSizeAction = action.payload;
}
const changeTotalHistory = (state, action) => {
    state.totalHistory = action.payload;
}
const changeTotalAction = (state, action) => {
    state.totalAction = action.payload;
}
const changeDataHistory = (state, action) => {
    state.dataHistory = action.payload;
}
const changeDataAction = (state, action) => {
    state.dataAction = action.payload;
}
const changeCurrentPageAction = (state, action) => {
    state.currentPageAction = action.payload;
}
const changeCurrentPageHistory = (state, action) => {
    state.currentPageHistory = action.payload;
}
const changeColorPage1 = (state, action) => {
    state.colorPage1 = action.payload;
}
const changeColorPage2 = (state, action) => {
    state.colorPage2 = action.payload;
}
const changeColorPage3 = (state, action) => {
    state.colorPage3 = action.payload;
}
const changeColorPage4 = (state, action) => {
    state.colorPage4 = action.payload;
}
const changePage = (state, action) => {
    state.page = action.payload;
}
const changeStatusABC = (state, action) => {
    state.isActiveABC = action.payload;
}
const IsActiveReduce = createSlice({
    name: "isActive",
    initialState: intialisActive,
    reducers: {
        changeStatusABC, changePage, changeColorPage1, changeColorPage2, changeColorPage3, changeColorPage4, changeCurrentPageHistory,
        changeDataHistory, changeCurrentPageAction, changeDataAction, changeTotalAction, changeTotalHistory, changePageSizeHistory, changePageSizeAction,
        changeFlagReloadPage1, changeStatusFan, changeStatusAC, changeStatusLight,
        changeTempFilter, changeHumidFilter, changeLightFilter, changeTimeFilter, changeNotiAnt,
        changeTempFilterLatest, changeHumidFilterLatest, changeLightFilterLatest, changeTimeFilterLatest,
        changeFlagReloadPage2,
        changeTempFilterLatest2, changeHumidFilterLatest2, changeLightFilterLatest2, changeTimeFilterLatest2,
        changeTimeFilter2,
        changeDataChart,
        changeLoading1, changeLoading2, changeLoading3
    }
})
const IsActiveActions = IsActiveReduce.actions
export { IsActiveReduce, IsActiveActions }