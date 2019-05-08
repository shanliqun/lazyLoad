import IndexPage from '../container/IndexPage';
import App from '../container/App';
import Config from '../../server/config.json';
import subConfig from '../.saberrc';
const ROOT = `/${Config.project}/${subConfig.path || subConfig.subproject + subConfig.subproject}`;

const routesConfig= [{
    component: App,
    routes: [{
        path: `${ROOT}/`,
        exact: true,    //为true时，则要求路径与location.pathname必须完全匹配
        strict: false,  //true的时候，有结尾斜线的路径只能匹配有斜线的
        component: IndexPage
    }, {
        path: `${ROOT}/user`,
        component: IndexPage
    }, {
        path: `${ROOT}/user/aaa`,
        component: IndexPage
    }, {
        path: `${ROOT}/user/index`,
        component: IndexPage
    }]
}];
    
export default routesConfig;