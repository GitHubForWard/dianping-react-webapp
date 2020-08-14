import { get } from './../../utils/request';

// 经过中间件处理的 action 所具有的标识
export const FETCH_DATA = 'FETCH_DATA';

export default store => next => action => {
    const callAPI = action[FETCH_DATA];
    if (typeof callAPI === 'undefined') {
        return next(action);
    }

    const { endpoint, schema, types } = callAPI;
    if (typeof endpoint !== 'string') {
        throw new Error('endpoint必须是字符串类型的URL');
    }
    if (!schema) {
        throw new Error('必须指定领域实体的schema');
    }
    if (!Array.isArray(types) && types.length !== 3) {
        throw new Error('必须制定一个包含3个action type的数组');
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('action type 必须是字符串类型');
    }

    const actionWith = data => {
        const finalAction = { ...action, ...data };
        delete finalAction[FETCH_DATA];
        return finalAction;
    }

    const [requestType, successType, failureType] = types;

    next(actionWith({ type: requestType }));
    return fetchData(endpoint, schema).then(
        response => next(actionWith({
            type: successType,
            response
        })),
        error => next(actionWith({
            type: failureType,
            error: error.message || '获取数据失败'
        }))
    )
}

// 执行网络请求
const fetchData = (endpoint, schema) => {
    return get(endpoint).then(data => {
        return normalizeData(data, schema)
    })
}

// 根据schema，将获取的数据扁平化处理
const normalizeData = (data, schema) => {
    const { name, id } = schema;
    // key value 对象用于存储最后扁平化的对象
    const kvObj = {};
    // 用于存储获取到的数据对象的每一项id
    const ids = [];
    if (Array.isArray(data)) {
        data.forEach(item => {
            kvObj[item[id]] = item;
            ids.push(item[id])
        })
    } else {
        kvObj[data[id]] = data;
        ids.push(data[id]);
    }
    return {
        [name]: kvObj,
        ids
    }
}

