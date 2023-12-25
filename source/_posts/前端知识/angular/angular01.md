---
title: angular基础 01
tags:
  - angular
categories:
  - 前端知识
abbrlink: cb24f466
date: 2022-03-19 20:31:01
updated: 2022-04-12 16:30:18
keywords:
description:
top_img:
comments:
cover:
toc:
toc_number:
toc_style_simple:
copyright:
copyright_author:
copyright_author_href:
copyright_url:
copyright_info:
mathjax:
katex:
aplayer:
highlight_shrink:
aside:
---
![angular思维图(简)](https://img.hitagi.site/202211142239481.png)

demo项目地址:[angular-demo](https://github.com/recreyed/angular-demo)


## 组件
### 插槽
1. 组件中引入具名插槽  
`<ng-content select="[slot]"></ng-content>`  
2. 父组件的子组件标签中写入插槽内容
```html
<app-a-zujian>
  <p slot>这是具名插槽</p>
</app-a-zujian>
```

### 父子传值
#### 父传子@Input
1. 子组件定义接受数据的变量
   `@Input() name: string;`
2. 父组件通过属性型绑定传递数据 `[name] = "数据"`,`[name]` 是子组件中定义的接受数据的变量
   `<app-a-zujian [name]='fatherData'></app-a-zujian>`
#### 子传父EventEmitter
1. 子组件创建事件发射器,并通过时间发射器传递数据
  ```javascript
    @Output() toFather = new EventEmitter()

    someToFather() {
        //触发someToFather事件时,传递数据
        this.toFather.emit(this.data);
    }
  ```
  `<button (click)='someToFather()'>EventEmitter子传父</button>`
2. 绑定`(toFather)`时间发射器,通过$event接受传递的参数  
  ```javascript
    fromSon(data): void {
        console.log(data);
    }
  ```
  `<app-a-zujian (toFather)="fromSon($event)"></app-a-zujian>`  
#### 子传父模板引用(推荐)
1. 父组件标记子组件模板
`<app-a-zujian #child></app-a-zujian>`
2. 父组件引用子组件方法或数据
`<div>子传父模板引用----{{child.mobanData}}</div>`
#### 子传父@ViewChild(推荐)
1. 父组件ts中引入子组件模板
`@ViewChild("child") childData;`
2. 父组件ts中获得子组件方法或数据
`getSon(): void { console.log(this.childData.viewData) }`
## 模板
### 插值表达式
`{{data}}`
### 管道
- 内置管道
Date：格式化日期  
UpperCase：转化为大写  
LowerCase：转化为小写  
Currency：把数字转换成金额字符串  
Percent：把数字转换成百分比字符串  
Json：把一个值转换成 JSON 字符串格式。在调试时很有用。  
```html
<p>使用参数格式化日期： {{ dateTime | date:"yyy/MM/dd" }}</p>
<!-- 特殊的映射管道:i18nPlural -->
<div>{{ sex | i18nPlural: sexMapping }}</div>
```
```javascript
// 管道数据映射
public sex: string = '2';
sexMapping: { [k: string]: string } = { '=1': '男', '=2': '女', 'other': '其他' };
```
## 指令
### 结构型指令
```html
<div *ngIf="isActive">*ngIf 变量为true时显示</div>
<div>*ngFor</div>
<span *ngFor="let item of arrayList; let key = index">
  {{key}}:{{item}}
</span>
<div [ngSwitch]="htmltags">
  <div>[ngSwitch]</div>
  <div *ngSwitchCase="'div'">div标签</div>
  <span *ngSwitchCase="'span'">span标签</span>
  <a *ngSwitchDefault>a标签</a>
</div>
```
### 属性型指令
```html
<!-- 如果flag变量为true 将会添加current类,否则移除 -->
<div [class.current]="flag"></div>
<!-- 使用简单的表达式,表达式为true则添加selected类,否则移除 -->
<div [class.selected]="hero == 0"></div>
<!-- 使用三元运算符,flag变量为true添加item01类,否则添加item02类 -->
<div [ngClass]="flag?'item01':'item02'"></div>
<!-- 使用对象 对象中的每个 key 都是一个 CSS 类名，如果它的 value 是 true,这个类就会被添加，否则就会被移除。 -->
<div [ngClass]="cssObj"></div>
<!-- 如果flag变量为true 将会添加“#000”颜色值,否则添加“#fff”值。 -->
<div [style.color]="flag? '#000' : '#fff'"></div>
<!-- 带单位的样式绑定 -->
<div [style.padding.px]="isSpecial"></div>
```
### 模板驱动表单
`<input type="text" [(ngModel)]="value3">{{value3}}`
## 路由
第一步 导入  
```javascript
// app.module.ts中
import { Routes, RouterModule } from '@angular/router';
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ]
})
```
第二步  定义
```javascript
// app.module.ts中
const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'biaodan', component: EBiaodanComponent },
  { path: 'index', component: AppComponent },
  { path: '**', component: NotFoundComponent },
];
```
第三步 置入
`<router-outlet></router-outlet>`
## 表单
使用前先导入所需要的控件
### 单个表单
`public name = new FormControl("");`
### 表单组
- 使用FormBuilder生成表单
```javascript
// 使用前先注入FormBuilder服务
constructor(private fb: FormBuilder) { }

public profileForm = this.fb.group({
    firstName: ['', Validators.required],
    address: this.fb.group({
      street: ['',],
      city: [''],
    })
  });
```
- FormArray动态表单
```javascript
public profileForm = this.fb.group({
    aliases: this.fb.array([
      this.fb.control('')
    ])
  });
// 动态表单添加
this.aliases.push(this.fb.control(''));
```
- 修改表单组的值
```javascript
this.profileForm.patchValue({
  firstName: 'Tom',
  address: {
    street: '123 Drew Street'
  }
})
```
### 表单验证
```javascript
export function ipv4Validator(nameRe: RegExp) {
  return (control) => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? null : { forbiddenName: control.value };
  };
}

public profileForm = this.fb.group({
    firstName: ['',
     [Validators.required, ipv4Validator(/^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$/)]
    ]
  });
```
## 请求
### get
```javascript
this.http.get("url")
  .subscribe(res => { console.dir(res); });
```
### post
```javascript
this.http.post("url",params)
  .subscribe(res => { console.log(val); });
```
## 动画
使用前先导入
```javascript
// ts文件中
@Component({
  ...
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.8,
        backgroundColor: 'blue'
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ]
})

public isOpen = true;
toggle() { this.isOpen = !this.isOpen; }
```
```html
<!-- html文件中 -->
<button (click)="toggle()">切换</button>
<div [@openClose]="isOpen ? 'open' : 'closed'"></div>
```