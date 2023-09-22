import {combineReducers,applyMiddleware,createStore} from 'redux'

import thunk from "redux-thunk"

import {composeWithDevTools} from 'redux-devtools-extension'
import { productDetailesReducer, productReducer } from './reducers/productReducer.js'
import { userReducer } from './reducers/userReducer.js'

const reducer=combineReducers({
    products:productReducer,
    productDetaile:productDetailesReducer,
    user:userReducer
})

const initialstate={}

const middleware=[thunk]

const store=createStore(reducer,initialstate,composeWithDevTools(applyMiddleware(...middleware)))

export default store