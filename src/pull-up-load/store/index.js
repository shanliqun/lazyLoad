import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

export default function configureStore(preloaderState){
    const store = createStore(
        rootReducer,
        preloaderState,
        compose(
            applyMiddleware(thunk),
        )
    );
    if(module.hot){
        module.hot.accept('../reducers',()=>{
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}
