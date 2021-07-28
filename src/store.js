import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import rootReducer from './reducers';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";


const middleware = [thunk];
const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middleware))

);
let persistor = persistStore(store);
export default store
export { persistor };
