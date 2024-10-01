import { combineReducers } from "redux";
import { IsActiveReduce } from "./IsActiveReducer";
const allReducers = combineReducers({
    IsActiveReduce: IsActiveReduce.reducer
    // thêm reducer
})
export default allReducers;