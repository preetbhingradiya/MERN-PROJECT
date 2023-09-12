import {combineReducers,applyMiddleware,createStore} from 'redux'

import thunk from "redux-thunk"

import {composeWithDevTools} from 'redux-devtools-extension'
import { productReducer } from './reducers/productReducer'

const reducer=combineReducers({
    products:productReducer
})

let initialstate={}

const middleware=[thunk]

const store=createStore(reducer,initialstate,composeWithDevTools(applyMiddleware(...middleware)))

export default store