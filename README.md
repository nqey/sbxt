# 申报系统

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 项目布局
├── build                                       // webpack配置文件    
├── config                                      // 项目打包路径   
├── dist                                        // 上线项目文件，放在服务器即可正常访问   
├── node_modules                                // npm install 安装的依赖代码库     
├── src                                         // 源码目录   
│   ├── assets                                  // 放置一些图片，如logo等    
│   │   ├── img                                 // 公共图片   
│   │   │   └── logo.png    
│   │   ├── css                                 // 公共样式   
│   │   │   └── common.scss                     // 公共样式文件   
│   │   │   └── mixin.scss                      // 样式配置文件   
│   ├── components                              // 组件   
│   │   ├── common                              // 公共组件   
│   │   ├── leftMenu    
│   │   │   └── menu.vue                        // 左侧菜单公共组件   
│   │   └── header    
│   │       └── head.vue                        // 头部公共组件   
│   ├── config                                  // 基本配置   
│   │   ├── env.js                              // 环境切换配置   
│   │   ├── fetch.js                            // 获取数据   
│   │   ├── utils.js                            // 常用的js方法    
│   ├── page    
│   │   ├── home    
│   │   │   └── home.vue                        // 首页   
│   │   ├── login   
│   │   │   └── login.vue                       // 登录注册页    
│   │   ├── search    
│   │   │   └── search.vue                      // 搜索页    
│   │   ├── bindEnterprise    
│   │   │   └── bEnt.vue                        // 企业绑定页    
│   ├── router    
│   │   └── index.js                            // 路由配置   
│   ├── service                                 // 数据交互统一调配   
│   │   ├── api.js                              // 获取数据的统一调配文件，对接口进行统一管理    
│   │   └── tempdata                            // 开发阶段的临时数据    
│   ├── store                                   // vuex的状态管理    
│   │   ├── action.js                           // 配置actions    
│   │   ├── getters.js                          // 配置getters    
│   │   ├── index.js                            // 引用vuex，创建store   
│   │   ├── modules                             // store模块    
│   │   ├── mutation-types.js                   // 定义常量muations名    
│   │   └── mutations.js                        // 配置mutations    
│   ├── App.vue                                 // 页面入口文件   
│   ├── main.js                                 // 程序入口文件，加载各种公共组件    
├── static                                      // 存放第三方静态资源(如图片、字体等)     
│   ├── .gitkeep                                // 为了当static目录为空Git也可以提交到代码仓库而存在的文件（因为当目录为空时Git会忽略该目录，不会提交到代码仓库里）     
├── index.html                                  // 入口html文件   
├── .babelrc                                    // ES6语法编译配置    
├── .editorconfig                               // 代码编写规格   
├── .eslintignore                               // 忽略语法检查的目录文件    
├── .eslintrc.js                                // eslint规则的配置文件    
├── .gitignore                                  // 忽略的文件    
├── .postcssrc                                  // css补全    
├── package.json                                // 项目及工具的依赖配置文件   
├── README.md                                   // 说明   
