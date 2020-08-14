import { combineReducers } from 'redux';
import comments from './comments';
import orders from './orders';
import products from './products';
import shop from './shop';

// 合并领域状态
const rootReducer = combineReducers({
    comments,
    orders,
    products,
    shop
})

export default rootReducer;