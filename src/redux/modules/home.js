import { FETCH_DATA } from '../middleware/api';
import { schema } from './entities/products';
import url from './../../utils/url'

export const types = {
    // 开始获取猜你喜欢请求
    FETCH_LIKES_REQUEST: 'HOME/FETCH_LIKES_REQUEST',
    // 获取猜你喜欢成功
    FETCH_LIKES_SUCCESS: 'HOME/FETCH_LIKES_SUCCESS',
    // 获取猜你喜欢失败
    FETCH_LIKES_FAILURE: 'HOME/FETCH_LIKES_FAILURE'
}

const fetchLikesRequest = () => ({
    type: types.FETCH_LIKES_REQUEST
})

const fetchLikesSuccess = (data) => ({
    type: types.FETCH_LIKES_SUCCESS,
    data
})

const fetchLikesFailure = (error) => ({
    type: types.FETCH_LIKES_FAILURE,
    error
})

export const actions = {
    loadLikes: () => {
        return (dispatch, getState) => {
            const endpoint = url.getProductList(0, 10);
            return dispatch(fetchLikes(endpoint));
        }
    }
}

const fetchLikes = endpoint => ({
    [FETCH_DATA]: {
        types: [
            types.FETCH_LIKES_REQUEST,
            types.FETCH_LIKES_SUCCESS,
            types.FETCH_LIKES_FAILURE
        ],
        endpoint,
        schema
    }
})

const reducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_LIKES_REQUEST:

        case types.FETCH_LIKES_SUCCESS:

        case types.FETCH_LIKES_FAILURE:

        default:
            return state;
    }
}

export default reducer;