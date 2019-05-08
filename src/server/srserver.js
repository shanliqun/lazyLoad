const path = require('path');
const fs = require('fs');
const srserver = require('react-saber-server').srserver;
const config = require('./config.json');
const serverModules = {};

//动态引入各个入口项目的文件（route，store，server，saberrc）
/** */
import lazyload_server from '../lazyload/server.js';serverModules.lazyload_server=lazyload_server;
import lazyload_route_routesConfig from '../lazyload/route/routesConfig.js';serverModules.lazyload_route_routesConfig=lazyload_route_routesConfig;
serverModules.lazyload_type = '{"subproject": "lazyload","template": "simple","serverrender": false,"prefix": "","path": "lazyload"}';
serverModules.serverPre = [{"filename":"server","path":"lazyload"}]
/** */
//配置项目名称
let server = srserver();

server.setConfig('projectConfig', config);

//配置项目模块
let entryArr = [];
serverModules.serverPre && serverModules.serverPre.map((serverModule)=>{
    let dir = path.basename(serverModule.path),
        module = {};

    entryArr.push(dir);
    module.project = config.project;
    module.dir = dir;
    module.routesConfig = serverModules[`${dir+'_route_routesConfig'}`];
    module.handler = serverModules[`${dir+'_server'}`];
    module.proType =  JSON.parse(serverModules[`${dir+'_type'}`]);
    module.htmlSource = fs.readFileSync('./dist/'+dir+'/index.html', { encoding: 'utf-8' });
    module.entry = module.proType.prefix || '';

    if(module.proType.template === 'standard'){
        module.Provider = require('react-redux').Provider;
        module.store = serverModules[`${dir+'_store'}`];
    }
    server.setConfig(dir, module);
});

//配置项目入口列表
server.setConfig('entryArr', entryArr);

/**
 * 可以动态加入服务所需中间件
 * eg:
 * server.use('name', fun, params, cb)
 * server.beforeUse('beforeName', 'name', fun, params, cb)
 * server.afterUse('afterName', 'name', fun, params, cb)
 */

server.start();