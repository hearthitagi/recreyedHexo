---
title: React学习记录01
tags:
  - React
categories:
  - 代码
date: 2025-08-26 19:00:00
updated: 2025-08-26 19:00:00
cover: https://lsky.kissshot.site/img/2025/04/07/67f31509c61ff.webp
---
> 从React15的文档开始，照着文档走一遍
# 1.创建应用

安装create-react-app
```shell
npm install -g create-react-app

create-react-app react-demo

cd react-demo

npm start
```

降级react
```json
{
  "name": "react-demo",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/dom": "^6.1.5",
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.5.0",
    "@testing-library/user-event": "^10.4.1",
    "react": "^15.6.2",
    "react-dom": "^15.6.2",
    "react-scripts": "3.4.4",
    "web-vitals": "^2.1.4"
  },
......
}
```
# 2.JSX
js拓展语法，将dom作为js的变量，使用`{}`在dom嵌入js变量。
```javascript
const element = <img src={user.avatarUrl}></img>;
const element = (
	<div>
		<h1>你好。</h1>
	</div> 
);
```
## 2.1将元素渲染到DOM中/更新元素
通过创建一个新元素来更新元素
```javascript
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}
setInterval(tick, 1000);
```

## 2.2组件
### 2.2.1函数式组件
```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
### 2.2.1类组件
```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
### 2.2.3渲染自定义组件
```javascript
//上文的Welcome是一个自定义组件；组件名始终以大写字母开头
const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```
- 自定义组件可以并列和嵌套
- **组件的props不可以修改**

# 3.状态和生命周期

State 与 props 类似，但它是私有的并且完全由组件控制。  

## 3.1 函数式组件转换成类组件的步骤
1. 创建一个具有相同名称的 [ES6 类](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)来扩展 `React.Component`
2. 向其中添加一个名为 `render()` 的空方法
3. 将函数主体移至 `render()` 方法中
4. 在 `render()` 主体中用 `this.props` 替换 `props`
5. 删除剩余的空函数声明
```javascript
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>泥嚎!</h1>
        <h2>{this.props.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}
```
## 3.2 向类组件添加state
```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props); //props 传递给基础构造函数
    this.state = {date: new Date()};
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
## 3.3 向类组件添加生命周期方法
```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props); //props 传递给基础构造函数
    this.state = {date: new Date()};
  }
  componentDidMount() {
	  //在组件输出渲染到 DOM 之后运行
	  this.timerID = setInterval( () => this.tick(), 1000 );
  }
  componentWillUnmount() {
	  clearInterval(this.timerID);
  }
  tick() {
	  this.setState({ date: new Date() });
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
注意：  
- **不要直接修改`state`**，更新`state`使用`setState()`
- **`state`更新可能为异步**
