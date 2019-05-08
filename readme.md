# 项目的使用
- [文件的结构](#文件的结构)
- [可用脚本](#可用脚本)
    - [npm start](#`npm-start`)
    - [npm run dev](#`npm-run-dev`)
    - [npm run buildDll](#`npm-run-buildDll`)
    - [npm run build](#`npm-run-build`)
    - [npm run buildAll](#`npm-run-buildAll`)
- [项目开发](#项目开发)
    - [修改配置](#修改配置)
    - [访问地址](#访问地址)
    - [新增组件](#新增组件)
    - [增加首屏服务端渲染接口](#增加首屏服务端渲染接口)
    - [修改路由](#修改路由)
    - [css预处理](#css预处理)
    - [自定义服务](#自定义服务)
        - [现有的服务及对子项目请求的处理](#现有的服务及对子项目请求的处理)
        - [增加业务线项目的服务](#增加业务线项目的服务)
        - [增加子项目请求的处理](#增加子项目请求的处理)
    - [自定义需要抽离的第三方库](#自定义需要抽离的第三方库)
    - [自定义代码规范](#自定义代码规范)
    - [提供了服务端的部分统计数据](#提供了服务端的部分统计数据)
- [本地调试](#本地调试)
    - [设置host](#1.设置host)
    - [运行启动命令](#2.运行启动命令)
    - [打开浏览器](#3.打开浏览器)
- [本地服务端渲染调试](#本地服务端渲染调试)
    - [设置host](#1.设置host)
    - [编译项目](#2.编译项目)
    - [配置nginx](#3.配置nginx)
    - [启动nginx](#4.启动nginx)
    - [pm2管理服务](#5.pm2管理服务)
    - [打开浏览器](#6.打开浏览器)

## 文件的结构
通过init命令初始化业务线项目之后，项目的结构如下：
```
myproject
├── README.md
├── node_modules
├── package-lock.json
├── package.json
├── .gitignore
├── .eslintrc
└── src
    ├── publiclib(自定义)
    ├── server
        ├── config.json
        └── srserver.js
    ├── mysubproject1(simple)
        ├── components
        ├── container
        ├── request
        ├── route
        ├── static
        ├── .saberrc
        ├── index.html
        ├── index.js
        └── server.js
    └── mysubproject2(standard)
        ├── actions
        ├── components
        ├── container
        ├── reducers
        ├── route
        ├── static
        ├── store
        ├── .saberrc
        ├── index.html
        ├── index.js
        └── server.js
```

## 可用脚本
### `npm start`
在开发模式下运行项目

相当于执行
```
saber buildDll && saber dev
```
因为dev依赖了第三方库，所以需要先对第三方库进行打包

### `npm run dev`
如果已经执行过saber buildDll，则可以直接通过此命令启动测试服务器

相当于执行
```
saber dev
```

### `npm run buildDll`
对第三方包进行打包

相当于执行
```
saber buildDll && saber buildServerDll
```
两种模式的第三方包都进行打包

### `npm run build`
对项目进行打包且生成服务端启动文件

如果已经执行过npm run buildDll，则可以直接运行此命令进行打包

相当于执行
```
saber build && saber buildServer
```

### `npm run buildAll`
对整个项目进行打包

相当于执行
```
npm run buildDll && npm run build
```

## 项目开发

找到要进行开发的子项目
```
src/mysubproject
```

### 修改配置
业务线项目相关的配置，可以在src/server/config.json中修改

子项目相关的配置，可以在子项目的.saberrc中修改

所有配置均在后续的编译过程中会用到，请谨慎修改

### 访问地址
生成的访问地址为
```js
/**
 * domain 域名，config.json中对应的domain
 * projectname 业务线项目名称，config.json中对应的project
 * prefix 前缀，子项目中.saberrc中对应的prefix
 * subprojectname 子项目名称，子项目中.saberrc中对应的subproject
 * route 对应的路由，各个子项目中
 */
var url = `http(s)://${domain}/${projectname}/${prefix}${subprojectname}/${route}`
```

### 新增组件
找到container/component，你可以在这两个目录中，新增你需要的组件

### 增加首屏服务端渲染接口
在两套模版中，我们都提供了fillData的静态方法，将在首屏服务端渲染时用到的接口放在这个方法中即可。

**注意：最后返回的需要是一个promise对象**

### 修改路由
找到route文件夹
```
├── route
    ├── index.js
    └── routesConfig.js
```
在这里使用了react-router-config来配置路由，将需要修改的路由加入这个json对象即可。

更多关于react-router4的使用方法，请参考
[react-router4官网](http://reacttraining.cn/)

更多关于react-router-config的使用方法，请参考
[react-router-config](https://www.npmjs.com/package/react-router-config)

### css预处理
我们为你提供了三种css预处理方式
* sass
* less
* stylus

我们会自动根据文件的后缀进行编译，不需要你进行额外的设置

* 如果你使用sass，则文件名后缀需要是scss/sass
* 如果你使用less，则文件名后缀需要是less
* 如果你使用stylus，则文件名后缀需要是styl
* 如果你什么都不想用，则文件名后缀直接是css即可

### 自定义服务
你可以为业务线项目增加自己的服务，为每个子项目增加对该请求的处理

#### 现有的服务及对子项目请求的处理
可以参考服务端渲染使用文档

#### 增加业务线项目的服务
在src/server文件夹中，找到srserver.js对它进行修改

文件内容解释及需要注意：
* **请不要删除现有内容**
* 每次编译服务端启动文件时，会自动匹配所有子项目的相关文件，存入两个/** */注释符之间
* server时当前服务对象，通过setConfig来设置对应数据

增加服务方法
```js
//在服务最后加入服务
server.use('name', fun, params, cb)
//在指定服务前加入服务
server.beforeUse('beforeName', 'name', fun, params, cb)
//在指定服务后加入服务
server.afterUse('afterName', 'name', fun, params, cb)
```
服务执行方法，对应上面的fun
```js
/**
 * @params use方法传的参数，对应上 main的params
 * @cb 回调方法，可自行设置和处理
 * @app 当前启动的服务
 * @config 当前启动的服务对象中的配置
 * @next 调用下一个服务中间件
 */
middleWare.serverfun = (params, cb) => (app, config, next) => {
    //todo
}
```
* name：当前服务名称
* beforeName：要加在哪个服务之前
* afterName：要加在哪个服务之后
* fun：服务执行方法
* params：服务用到的参数，没有可以不传
* cb：服务执行后的回调

#### 增加子项目请求的处理
以在src/mysubproject文件夹中，找到server.js对它进行修改

请求中需要执行所有过程都在service列表中，由于service可能会存在异步的回调，所以每个service又包含一个component列表

component为service回调之后执行的对象，每一个component都依赖于一个service

下面是一个例子
```js
[{
    logserver : {
        type: 'service',
        fun: function(req, res, config, cb){
            console.log('');
        },
        serviceName: 'matchRoute',
        pos: 'before'
    },
    logcomponent : {
        serviceName: 'matchRoute',
        type: 'component',
        fun: function(req, res, config, cb){
            console.log('');
        },
        componentName: 'matchComponent',
        pos: 'before'
    }
}]
```
* 整个server.js最后返回的是一个数组
* 数组中的每一个对象键值是当前过程的名称
* 数组中的每一个对象既可以是service，也可以是component，用type来区分
* type: 'service'
    * fun：当前过程执行的方法
    * serviceName：现有的过程，根据pos参数，来决定加在它前面或者后面
    * pos：before/after
* type: 'component'
    * serviceName：属于哪个service
    * fun：当前过程执行的方法
    * componentName：现有的过程，根据pos参数，来决定加在它前面或者后面
    * pos：before/after

### 自定义需要抽离的第三方库
项目中，会通过saber buildDll对引用的第三库进行打包。

因为第三库很少会变动，从而可以一次打包，多次调用，并且如果你使用cdn，通过cdn的缓存，也会提升项目的性能。

可以在项目中进行修改需要打包的第三方库，对应的位置为

```
src/server/config.json
```

### 自定义代码规范
代码规范也是每个项目所必须的，你可以在项目的根目录下（和src同级）找到.eslintrc文件，对它进行修改，从而在使用saber对项目进行编译时，会自动去匹配这个文件。

### 提供了服务端的部分统计数据
提供了部分服务器统计数据，在window对象中
```js
window.__TJ__
```
- refer：所在环境 m/app/weixin
- city：城市号
- net：网络环境
- device：设备类型
- os：系统类型 android/iOS
- browerType：浏览器类型
- fetchTime：接口请求时间
- serverTime：服务端请求时间
- project：项目名称 业务线项目名称_子项目名称

## 本地调试
### 1.设置host
将你配置的域名及cdn域名都设置为127.0.0.1

### 2.运行启动命令
通过npm start/npm run dev启动测试服务

### 3.打开浏览器
输入地址

http://域名/myproject/mysubproject

## 本地服务端渲染调试
### 1.设置host
将你配置的域名及cdn域名都设置为127.0.0.1
### 2.编译项目
对项目进行编译，可以根据自己的情况，使用合适的命令进行编译，如果你不知道那个合适，就直接使用npm run buildAll进行编译

**使用合适的命令可以大大缩短编译时间**
### 3.配置nginx
在nginx中进行相应的配置
```nginx
upstream myproject1_online {
    # 设置对应的端口
    server 127.0.0.1:端口;
}
upstream myproject2_online {
    server 127.0.0.1:端口;
}
server {
    listen 80;
    server_name 你配置的域名;
    # 你配置的业务线项目名称
    location '/myproject1' {
        proxy_set_header Host $http_host;
        proxy_pass http://myproject1_online;
        proxy_redirect off;
    }
    location '/myproject2（你配置的业务线项目名称）' {
        proxy_set_header Host $http_host;
        proxy_pass http://myproject2_online;
        proxy_redirect off;
    }
}
```
### 4.启动nginx
```sh
nginx
```
### 5.pm2管理服务
通过pm2管理服务

如果你没有安装pm2，先安装pm2
```
npm install pm2 -g
```
安装完成后，启动服务

```
pm2 start ./myproject.js -- port 端口
```
打开日志信息
```
pm2 log
```
### 6.打开浏览器
输入地址

http://域名/myproject/mysubproject

此时，可以通过打开的日志信息，查看服务日志