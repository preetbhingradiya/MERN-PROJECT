import {combineReducers,applyMiddleware,createStore} from 'redux'

import thunk from "redux-thunk"

import {composeWithDevTools} from 'redux-devtools-extension'
import {productDetailesReducer, productReducer } from './reducers/productReducer'

const reducer=combineReducers({
    products:productReducer,
    productDetails:productDetailesReducer
})

const initialstate={}

const middleware=[thunk]

const store=createStore(reducer,initialstate,composeWithDevTools(applyMiddleware(...middleware)))

export default store