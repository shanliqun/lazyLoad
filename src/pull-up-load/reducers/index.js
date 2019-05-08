import {combineReducers} from 'redux';

var def = {
    data:{list:[],status:'loading',hasMore:true,pageNum:1}
};
function reducer(state=def,action){
    switch (action.type){
        case 'start':
            return {...state,data:{...state.data,status:'loading'}};
        case 'success':
            const data = state.data;
            data.hasMore = action.data.hasMore;
            data.pageNum = ++data.pageNum;
            data.list = data.list.concat(action.data.list);
            return {...state,data:{...data,status:'success'}};
        case 'error':
            return {...state,data:{...state.data,status:'error'}};
    }
    return state;
}
const rootReducer = combineReducers({
    reducer
});

export default rootReducer;