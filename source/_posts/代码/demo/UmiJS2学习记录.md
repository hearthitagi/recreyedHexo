---
title: Umijs学习记录02
tags:
  - UmiJS
categories:
  - 代码
date: 2025-09-14 20:00:00
updated: 2025-09-14 20:00:00
cover: https://lsky.kissshot.site/img/2025/04/07/67f31509b45cf.webp
---
# 1.路由
约定式路由内容参考：[约定式路由](https://v2.umijs.org/zh/guide/router.html#%E7%BA%A6%E5%AE%9A%E5%BC%8F%E8%B7%AF%E7%94%B1)
## 1.1配置式路由
在`.umirc.(ts|js)`或`config/config.(ts|js)`配置文件中指定`routes`属性。  

routes配置项存在时，约定式路由不会生效
```javascript
//配置式路由
export default {
  routes: [
    { path: '/', component: './a' },
    { path: '/list', component: './b', Routes: ['./routes/PrivateRoute.js'] },
    { path: '/users', component: './users/_layout',
      routes: [
        { path: '/users/detail', component: './users/detail' },
        { path: '/users/:id', component: './users/id' }
      ]
    },
  ],
};
```
### 1.1.1权限路由
```javascript
[
	{ path: '/', component: './pages/index.js' },
	{ path: '/list', component: './pages/list.js',
	  Routes['./routes/PrivateRoute.js']
	},
]

// PrivateRoute.js 示例
import { Redirect } from 'umi';

export default function PrivateRoute(props) {
  // 假设从某个地方获取了 isLogin 状态
  const isLogin = checkUserLoginStatus();
  if (isLogin) {
    // 若已登录，渲染子组件（即真正的页面组件或其他包装器）
    return <div>{ props.children }</div>;
  } else {
    // 若未登录，重定向到登录页
    return <Redirect to="/login" />;
  }
}
```
`PrivateRoute`组件相当于list组件的父组件/包装器。

## 1.2路由跳转
### 1.2.1声明式
```javascript
import Link from 'umi/link';

export default () => (
  <Link to="/list">Go to list page</Link>
);
```
### 1.2.2命令式
```javascript
import router from 'umi/router';

function goToListPage() {
  router.push('/list');
}
```
# 2.配置
umi 允许在 `.umirc.js` 或 `config/config.js` （二选一，`.umirc.js` 优先）

**区分环境与配置环境变量**  
1. 安装`npm install cross-env --save-dev`
2. 修改`package.json`
```json
{
  "scripts": {
    "start": "cross-env UMI_ENV=dev umi dev",        // 开发环境
    "build:test": "cross-env UMI_ENV=test umi build", // 测试环境
    "build:prod": "cross-env UMI_ENV=prod umi build", // 生产环境
    "build:uat": "cross-env UMI_ENV=uat umi build"   // UAT环境
  }
}
```
3. 创建环境配置文件
```javascript
// 示例：config/config.dev.js 或 .umirc.dev.js - 开发环境
export default {
  define: {
    'process.env.UMI_ENV': 'dev', // 注入环境标识
    'process.env.API_URL': 'http://localhost:3000/api', // 注入API地址
  },
};
// 示例：config/config.prod.js 或 .umirc.prod.js - 生产环境
export default {
  define: {
    'process.env.UMI_ENV': 'prod',
    'process.env.API_URL': 'https://api.yourdomain.com/api',
  },
};
```
配置文件的其他配置参考：[配置](https://v2.umijs.org/zh/config/#mock-exclude)
# 3.Mock数据
在umijs中使用如下方式模拟请求地址
```javascript
import mockjs from 'mockjs';

//冒号后面是时请求的返回内容
export default {
	// 支持值为 Object 和 Array
	'GET /api/users': { users: [1, 2] },
	'GET /api/tags': mockjs.mock({
	    'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }],
	}),
	// 支持自定义函数
	'POST /api/users/create': (req, res) => {
		res.setHeader('Access-Control-Allow-Origin', '*');//添加跨域请求头
		res.end('OK'); 
	},
	//模拟延迟 也可以使用roadhog-api-doc
	'POST /api/forms': (req, res) => {
		setTimeout(() => {
			res.send('Ok');
		}, 1000);
	},
};
```
# 4.Dva（状态管理）
## 4.1在配置文件中启用Dva
```javascript
dva: {
    immer: true, // 启用 immer 以方便 reducer 中直接修改 state
    hmr: false,   // 是否启用热更新
},
```
## 4.2 创建model
 - 全局model放到src/models目录下
 - 页面model放到src/pages/models目录下或src/pages/model.ts文件中
 
| 部分        | 说明                                                                               |
| --------- | -------------------------------------------------------------------------------- |
| namespace | 模型的命名空间，必须是唯一的字符串，用于在全局 state 中标识该模型，也是连接组件时指定模型的关键。                             |
| state     | 模型的初始状态数据。                                                                       |
| effects   | 用于处理异步操作（如异步请求）和业务逻辑。使用 Generator 函数编写，通过 `yield`控制异步流程。                         |
| reducers  | 用于处理同步操作，是唯一可以直接修改 `state`的地方。每个 reducer 都是一个纯函数，接收当前 state 和 action，返回新的 state。 |
示例：
```javascript
// src/models/example.js 示例
export default {
  namespace: 'example', // 命名空间，必须唯一
  state: {
    count: 0,
    data: [],
  },
  effects: {
    // 异步操作，使用 Generator 函数
    *fetchData({ payload }, { call, put }) {
      const response = yield call(api.fetchData, payload); // 调用异步函数
      yield put({ type: 'saveData', payload: response }); // 触发 reducer 更新 state
    },
  },
  reducers: {
    // 同步更新 state
    saveData(state, { payload }) {
      return {
        ...state,
        data: payload, // 更新 state 中的 data
      };
    },
    increment(state) {
      return {
        ...state,
        count: state.count + 1, // 直接更新 count
      };
    },
  },
};
```
在组件中使用
```javascript
// 页面组件示例
import React from 'react';
import { connect } from 'umi'; // 从 umi 中引入 connect

const ExamplePage = ({ dispatch, example }) => {
  // 从 props 中获取 dispatch 方法和 example state（对应 namespace 为 example 的 model）
  
  const handleFetch = () => {
    // 使用 dispatch 触发 effects 中的异步操作
    dispatch({
      type: 'example/fetchData', // format: namespace/effectName
      payload: { query: 'test' }, // 传递参数
    });
  };

  const handleIncrement = () => {
    // 使用 dispatch 触发 reducers 中的同步操作
    dispatch({
      type: 'example/increment', // format: namespace/reducerName
    });
  };

  return (
    <div>
      <p>Count: {example.count}</p>
      <button onClick={handleIncrement}>Add</button>
      <button onClick={handleFetch}>Fetch Data</button>
      <div>{example.data && example.data.result}</div>
    </div>
  );
};

// 将 namespace 为 'example' 的 state 连接到组件的 props
export default connect(({ example }) => ({ example }))(ExamplePage);


//或者使用Hook：useSelector和 useDispatch
import React from 'react';
import { useSelector, useDispatch } from 'umi';

const ExamplePage = () => {
  // 从全局 state 中选择 'example' namespace 的状态
  const exampleState = useSelector(state => state.example);
  // 获取 dispatch 方法
  const dispatch = useDispatch();

  const handleFetch = () => {
    dispatch({
      type: 'example/fetchData',
      payload: { query: 'test' },
    }).then(() => {
      // 如果需要，可以在异步操作完成后执行回调
      console.log('Fetch completed!');
    });
  };

  return (
    <div>
      <p>Count: {exampleState.count}</p>
      <button onClick={handleFetch}>Fetch Data</button>
    </div>
  );
};

export default ExamplePage;
```