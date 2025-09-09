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