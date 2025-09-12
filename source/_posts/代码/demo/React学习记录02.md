---
title: React学习记录02
tags:
  - React
categories:
  - 代码
date: 2025-09-04 20:00:00
updated: 2025-09-04 20:00:00
cover: https://lsky.kissshot.site/img/2025/04/07/67f31509b3a67.webp
---
> 参考React19文档

**React组件构建思路**  

1. 将 UI 拆解为组件层级结构
2. 使用 React 构建一个静态版本
3. 找出 UI 精简且完整的 state 表示
4. 验证 state 应该被放置在哪里
5. 添加反向数据流

# 1.组件
```javascript
//标准组件格式
export function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>了不起的科学家们</h1>
      <Profile />
      <Profile />
    </section>
  );
}
//导入组件
import Gallery from './Gallery.js';
import { Profile } from './Gallery.js';
```
## 1.1组件props传值
```javascript
//标准解构props传值
function Avatar({ size }) {
  return (
    <img width={size} height={size}/>
  );
}
export default function Profile() {
  return (
    <div>
      <Avatar size={100}/>
    </div>
  );
}
```

可以用`...props`展开语法传递所有props

```javascript
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

## 1.2组件children传递
与插槽类似，写在组件标签内的内容，会通过`props.children`传递
```javascript
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function Profile() {
  return (
    <Card>
      <Avatarsize={100}/>
    </Card>
  );
}
```
**条件渲染与列表渲染与前文旧版react变化不大，此处省略**

# 2.处理事件
事件可以通过props传递
```javascript
function Button({ onSmash, children }) {
  return (
    <button onClick={onSmash}>
      {children}
    </button>
  );
}

export default function App() {
  return (
    <div>
      <Button onSmash={() => alert('正在播放！')}>
        播放电影
      </Button>
    </div>
  );
}
```
必要时需要使用  
- `e.stopPropagation()`阻止事件冒泡传播；
- `e.preventDefault()`阻止事件默认行为；

# 3.状态
使用`useState`Hook函数声明状态,state是隔离且私有的  

`index`和`setIndex`这种起名方式是约定俗成的
```javascript
import { useState } from 'react';

export default function Gallery() {
  const [index, setIndex] = useState(0);

  function handleClick() {
    setIndex(index + 1);
  }
  
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <div>
        {index}
      </div>
    </>
  );
}

```
首次加载和调用`setIndex`函数会触发一轮React渲染;  

一轮React渲染为：  
1. 触发渲染
2. React渲染组件
3. React更新DOM

state在一轮渲染内只会保存一种状态，相当于一轮渲染为一个快照，所以在一次事件中多次调用`setIndex`函数，只会有一个相同的输入。

想要多次修改state的值，可以给setState函数传入一个**更新函数**，每次调用setState会将更新函数加入队列。在下一次渲染时，会遍历执行队列中的函数，并更新最终的state。  

例如
```javascript
const [number, setNumber] = useState(0);

//下边两次调用，number只会加1，因为传给setNumber函数的是两次 0 + 1
//实际上setNumber(42)这种类型也会加入任务队列，只不过该项任务的逻辑是将number置成42
setNumber(number + 1);
setNumber(number + 1);

//下边两次调用，number会加2，因为队列中有两个更新函数，依次处理后n变成了2
setNumber(n => n + 1);
setNumber(n => n + 1);

```

## 3.1修改state中对象/数组
始终使用setState函数来更新对象
```javascript
const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
});

setPerson({
    ...person,
    firstName: e.target.value
});
```
修改数组时使用展开语法`[...arr]`，`filter`，`map`等不修改数组本身方法新建一个数组，然后再调用`setState`函数来更新。

# 4.状态管理
## 4.1常用内置Hook
先介绍一个常用的内置Hook函数
### 4.1.1 useReducer
作用：管理复杂的组件状态。例如状态的修改要区分不同的情况。  

基本语法：`const [state, dispatch] = useReducer(reducer, initialState, initFunction);`  
- ​**​reducer​**​: 一个纯函数，接收当前状态 `state`和描述操作的 `action`对象，根据 `action.type`决定如何计算并返回​**​新状态​**​
- ​**​initialState​**​: 状态的初始值
- **initFunction​**​ (可选): 用于​**​延迟计算初始状态​**​的函数。如果提供，初始状态将是 `initFunction(initialState)`的结果
- **state**: 当前的状态
- **dispatch**: 用于派发 action、触发状态更新的函数

使用：  

1. 定义`reducer`函数：纯函数，接收当前状态和 action，根据 action 的类型返回新的状态
```javascript
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state; // 务必处理未知 action 类型
  }
}
```
2. 初始化状态​：确定组件的初始状态。
```javascript
const initialState = { count: 0 };
```
3. 在组件中调用`useReducer`：传入定义好的 reducer 和初始状态
```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```
4. 派发`action`更新状态​：通过调用 `dispatch`函数并传入一个描述“发生了什么”的 action 对象来请求状态更新。action 通常有一个 `type`字段（表示操作类型）和可选的 `payload`字段（携带数据）
```javascript
const handleIncrement = () => { dispatch({ type: 'increment' }); };
```
### 4.1.2 useEffect
作用：用来处理​ 那些​**​不直接参与UI渲染​**​，但又必须进行的​**​额外操作**

基本语法：  
```javascript
//副作用函数​：包含需要执行的副作用逻辑。此函数可以返回一个​清理函数​，用于在组件卸载或下一次副作用执行前进行清理（如取消订阅、清除定时器）

/*
依赖数组（可选）​：指定副作用函数依赖的状态或属性值。根据依赖项决定是否重新执行副作用函数
依赖数组不传：每次组件渲染后都执行
依赖数组传空数组：仅在组件首次挂载时执行一次
依赖数组正常传值：组件首次挂载时执行，且依赖项变化时重新执行
*/
import { useEffect } from 'react';
useEffect(() => {
  // 副作用逻辑
  return () => {
    // 清理逻辑（可选）在组件卸载或dep变化引起的下一次副作用执行前触发
  };
}, [dep]); // 依赖数组
```

使用场景：
1. 数据获取
2. 事件监听
3. 定时器
4. 手动操作 DOM
### 4.1.3 useContext
作用：解决组件树中​跨层级传递数据  

使用：  

1. ​创建上下文
```javascript
//使用 `React.createContext`创建一个上下文对象.

// MyContext.js
import React from 'react';

// 创建一个上下文对象，并提供一个默认值（当组件不在 Provider 包裹下时使用）
const MyContext = React.createContext({ name: 'Guest', age: 0 }); 

export default MyContext;
```
2. 提供数据
```javascript
//在组件树中合适的位置（通常是顶层或父组件），使用 `<MyContext.Provider>`组件包裹需要接收数据的子组件，并通过其 `value`属性传递数据

// App.js
import React, { useState } from 'react';
import MyContext from './MyContext';
import ChildComponent from './ChildComponent';

function App() {
  const [user, setUser] = useState({ name: 'John', age: 30 });

  return (
    // 使用 Provider 提供数据。value 可以是任何类型：值、对象、函数等。
    <MyContext.Provider value={{ user, setUser }}>
      <div>
        <ChildComponent />
      </div>
    </MyContext.Provider>
  );
}
```
3. 获取数据
```javascript
//在需要访问上下文数据的子组件（无论层级多深）中，使用 useContext 来获取上下文的值

// ChildComponent.js
import React, { useContext } from 'react';
import MyContext from './MyContext';

function ChildComponent() {
  // 使用 useContext 获取上下文的值
  const { user, setUser } = useContext(MyContext);

  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <button onClick={() => setUser({ ...user, age: user.age + 1 })}>
        Increase Age
      </button>
    </div>
  );
}
```
## 4.2状态提升/在组件间共享内容
这部分与前文**8.1 状态提升**相似，不在赘述

# 5.ref
`useRef` Hook 返回一个对象，该对象有一个名为 `current` 的属性。最初，`myRef.current` 是 `null`。当 React 为这个 `<div>` 创建一个 DOM 节点时，React 会把对该节点的引用放入 `myRef.current`。  

使用方式：  
```javascript
import { useRef } from 'react';

const myRef = useRef(null);

<input ref={inputRef} />

inputRef.current.focus();
```

ref也可以通过props传递
```javascript
import { useRef } from 'react';

function MyInput({ ref }) {
  return <input ref={ref} />;
}

function MyForm() {
  const inputRef = useRef(null);
  return <MyInput ref={inputRef} />
}
```
动态列表绑定ref：使用ref回调
```javascript
const itemsRef = useRef(null);
<ul>
  {catList.map((cat) => (
    <li
      key={cat}
      ref={(node) => {
        const map = getMap();
        map.set(cat, node);
        
        //此处返回清理函数是React19新特性，React18需要在useEffect中清理
        return () => {
          map.delete(cat);
        };
      }}
    >
      <img src={cat} />
    </li>
  ))}
</ul>

function getMap() {
  if (!itemsRef.current) {
    // 首次运行时初始化 Map。
    itemsRef.current = new Map();
  }
  return itemsRef.current;
}
```

## 5.1React强制更新DOM
```javascript
import { flushSync } from 'react-dom';

flushSync(() => {  
	setTodos([ ...todos, newTodo]);  
});

listRef.current.lastChild.scrollIntoView();
```

# 6.自定义Hook
