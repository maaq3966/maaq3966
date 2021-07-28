import { combineReducers } from "redux";
import pageReducer from "./page";
import contentReducer from "./content";

// keep that in mind that this file is just combining different reducers
// which is rootreducer


const rootReducer =  combineReducers({
    pageReducer,
    contentReducer
}) 

export default rootReducer