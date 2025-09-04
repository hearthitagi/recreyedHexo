---
title: React学习记录01
tags:
  - React
categories:
  - 代码
date: 2025-08-26 19:00:00
updated: 2025-09-04 19:00:00
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
```javascript
// 由于this.props和this.state可能会异步更新,因此需要使用如下方法更新计算值

//该函数将接收以前的状态作为第一个参数，并将应用更新时的 props 作为第二个参数
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));

```

# 4.处理事件
1. React 事件使用驼峰命名法，而不是小写
2. 使用 JSX来传递事件
3. 必须显式调用preventDefault()来阻止默认事件
```javascript
//函数式组件
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
//类组件
//常用做法
class LoggingButton extends React.Component {
  handleClick = () => {
    console.log('this is:', this);
  }
  render() {
    return (
      <button onClick={this.handleClick}>Click me</button>
    );
  }
}
//较少使用
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);// 绑定this，必要
  }
  handleClick() {
    console.log('this is:', this);
  }
  render() {
    return (
      <button onClick={this.handleClick}>Click me</button>
    );
  }
}
```

# 5.条件渲染

React使用js中的if语句来判断控制显示哪些组件，例如
```javascript
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
} 
ReactDOM.render(
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);

//内联JSX语句方式
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>You have {unreadMessages.length} unread messages.</h2>
      }
    </div>
  );
}
```
## 5.1阻止组件渲染
```javascript
//使用return null来隐藏组件
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }
  return (
    <div className="warning">Warning!</div>
  );
}
```
# 6.列表渲染
```javascript
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}
const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
//内联表达式
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
```
# 7.表单
## 7.1受控组件
```javascript
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
	    input1: '',
		input2:'',
		textarea1:'',
		select1:'',
    };
  
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
	const target = event.target;
	const name = target.name;
	this.setState({ [name]: value });
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Name:
        //输入框
        <input name="input1" type="text" 
	        value={this.state.input1} onChange={this.handleChange} />
        </label>
        //多选框
		<input name="input2" type="checkbox"
			checked={this.state.input2} onChange={this.handleInputChange} />
        //textarea
        <textarea name="textarea1" 
	        value={this.state.textarea1} onChange={this.handleChange} />
        //下拉框
        <select name="select1" 
	        value={this.state.select1} onChange={this.handleChange}>
			<option value="grapefruit">Grapefruit</option>
		</select>
		
		//提交按钮
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```
# 8.状态提升/组合继承
## 8.1 状态提升
- 当两个兄弟组件需要根据**同一个变量**来改变显示时，将共同变量定义到最近父组件的state中。
- 由于**props是只读的，单向传递**。所以父组件需要定义一个修改此共同变量的方法，并将此方法传递给两个兄弟组件。兄弟组件调用此方法来修改共同变量
## 8.2 组合继承
### 8.2.1 插槽
```javascript
//默认插槽是 children
function FancyBorder(props) {
  return (
    <div>
      {props.children}
    </div>
  );
}
function WelcomeDialog() {
  return (
    <FancyBorder>
      <h1>Welcome</h1>
    </FancyBorder>
  );
}
//具名插槽
function SplitPane(props) {
  return (
    <div className="flexBox">
      <div>
        {props.left}
      </div>
      <div>
        {props.right}
      </div>
    </div>
  );
}
function App() {
  return (
    <SplitPane
      left={
	      <div>left</div>
      }
      right={
	      <div>right</div>
      } 
    />
  );
}
```
### 8.2.2 实例化组件
```javascript
function Dialog(props) {
  return (
    <div className="Dialog-Wrap">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </div>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
  );
}
```