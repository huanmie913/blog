---
title: TypeScript入门总结（一）
date: 2023-10-20
tags: 
 - typescript(ts)
categories:
 - 前端技术
---

# TypeScript入门总结（一）
> **来源：**
> - 2022 typescript史上最强学习入门文章(2w字)：[https://juejin.cn/post/7018805943710253086](https://juejin.cn/post/7018805943710253086)
> - 1.2W字 | 了不起的 TypeScript 入门教程：[https://juejin.cn/post/6844904182843965453](https://juejin.cn/post/6844904182843965453)
> - 2022年了，我才开始学 typescript ，晚吗？（7.5k字总结）：[https://juejin.cn/post/7124117404187099172](https://juejin.cn/post/7124117404187099172)
> - 官方试验演练场：[https://www.typescriptlang.org/zh/play](https://www.typescriptlang.org/zh/play)

## 一、前言
这篇文章前前后后写了几个月,之前总是零零散散的学习,然后断断续续的写文章(懒),自己参考了很多文章以及看了一些ts视频,然后把基础的知识点全部总结了一下.自我感觉比掘金上的所有typescript入门的热门文章都要详细 哈哈,因为那些热门文章我全部都参考了,内容基本都包含了.这一次一定得沉淀下来。好好的把这篇文章给写完.<br />本来自己以前是不喜欢ts的,因为它有一定的学习成本,代码量增加,代码复杂度增加等.后来慢慢觉得，ts的静态检查使得开发者提前发现错误，在前端工程化开发的今天确实有必要，因为团队成员技术水平参差不齐，TypeScript可以帮助避免很多错误的发生，当然如果你是any大法的信仰者，我劝你善良。不要为了用TypeScript而用TypeScript，用它的前提一定要是它能帮你解决特定的问题。
> 忠告:<br />不要学习TypeScript, 因为它的学习成本很低<br />不要学习TypeScript, 因为它能减少团队无效沟通<br />不要学习TypeScript, 因为它能让你的代码更健壮<br />不要学习TypeScript, 因为它能帮助你快速掌握其它后端语言<br />不要学习TypeScript, 因为你会迷恋它

## 二、`typescript`介绍
### 2.1、什么是typescript?
`TypeScript`简称`TS`<br />`TS`和`JS`之间的关系其实就是`Less/Sass`和`CSS`之间的关系<br />就像`Less/Sass`是对`CSS`进行扩展一样, `TS`也是对`JS`进行扩展<br />就像`Less/Sass`最终会转换成CSS一样, 我们编写好的`TS`代码最终也会换成JS<br />`TypeScript`是`JavaScript`的超集，因为它扩展了`JavaScript`，有`JavaScript`没有的东西。<br />硬要以父子类关系来说的话，`TypeScript`是`JavaScript`子类，继承的基础上去扩展。
### 2.2、为什么需要TypeScript?
简单来说就是因为`JavaScript`是弱类型, 很多错误**_只有在运行时_**才会被发现，<br />而`TypeScript`提供了一套**_静态检测机制_**, 可以帮助我们**_在编译时_**就发现错误
### 2.3、TypeScript特点
支持最新的`JavaScript`新特特性<br />支持代码静态检查<br />支持诸如`C`,`C++`,`Java`,`Go`等后端语言中的特性 (枚举、泛型、类型转换、命名空间、声明文件、类、接口等)
### 2.4、TypeScript 与 JavaScript 的区别
| TypeScript | JavaScript |
| --- | --- |
| JavaScript 的超集用于解决大型项目的代码复杂性 | 一种脚本语言，用于创建动态网页。 |
| 可以在编译期间发现并纠正错误 | 作为一种解释型语言，只能在运行时发现错误 |
| 强类型，支持静态和动态类型 | 弱类型，没有静态类型选项 |
| 最终被编译成 JavaScript 代码，使浏览器可以理解 | 可以直接在浏览器中使用 |
| 支持模块、泛型和接口 | 不支持模块，泛型或接口 |
| 支持 ES3，ES4，ES5 和 ES6 等 | 不支持编译其他 ES3，ES4，ES5 或 ES6 功能 |
| 社区的支持仍在增长，而且还不是很大 | 大量的社区支持以及大量文档和解决问题的支持 |

## 三、搭建typescript学习环境
### 3.1、安装最新版typescript
```javascript
npm i -g typescript
```
### 3.2、创建一个 tsconfig.json 文件
```javascript
tsc --init
```
执行命令后我们就可以看到生成了一个 tsconfig.json 文件，里面有一些配置信息，我们暂时先按下不表<br />创建 `helloworld.ts` 文件,随便写点什么
```javascript
const s:string = "彼时彼刻，恰如此时此刻";
console.log(s);
```
通过`tsc`命令，发现我们的`typescript`代码被转换成了熟悉的`js`代码<br />我们接着执行
```javascript
node helloworld.js
```
即可看到输出结果
### 3.3、安装`tsx`
那么通过我们上面的一通操作，我们知道了运行`tsc`命令就可以编译生成一个`js`文件，但是如果每次改动我们都要手动去执行编译，然后再通过 `node`命令才能查看运行结果岂不是太麻烦了。<br />而 `tsx`正是来解决这个问题的
```javascript
npm i -g tsx // 全局安装ts-node
```
有了这个插件，我们就可以直接运行.ts文件了<br />我们试一下
```javascript
tsx helloworld.ts
// 或使用npx
npx tsx helloworld.ts
```

**tsx相关文档**<br /> NPM：[https://www.npmjs.com/package/tsx](https://www.npmjs.com/package/tsx)<br />github：[https://github.com/esbuild-kit/tsx](https://github.com/esbuild-kit/tsx)

**其他**`**TypeScript**`**运行时工具比较**<br />[https://github.com/privatenumber/ts-runtime-comparison](https://github.com/privatenumber/ts-runtime-comparison)
### 3.4、官方playground
官方也提供了一个在线开发 TypeScript 的云环境——[Playground](https://www.typescriptlang.org/zh/play)。

基于它，我们无须在本地安装环境，只需要一个浏览器即可随时学习和编写 TypeScript，同时还可以方便地选择 TypeScript 版本、配置 tsconfig，并对 TypeScript 实时静态类型检测、转译输出 JavaScript 和在线执行。

而且在体验上，它也一点儿不逊色于任何本地的 IDE，对于刚刚学习 TypeScript 的我们来说，算是一个不错的选择。
### 3.5、推荐工具

- javascript/typescript运行时：[bun.js](https://bun.sh/)
   - 原生支持直接运行`.ts`文件
- 无需配置文件即可构建TS(typescript)，基于esbuild实现：tsup
   - github：[https://github.com/egoist/tsup](https://github.com/egoist/tsup)
   - 官网：[tsup.egoist.dev](https://tsup.egoist.dev/)
## 四、TypeScript 基本类型
### 4.1、JS的八种内置类型
> 来源：
> - MDN之typeof：[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)

```javascript
let str: string = "jimmy";
// ES5：var name = 'jimmy';

let num: number = 24;
// ES5：var count = 24;

let big: bigint = 100n;
let bool: boolean = false;
// ES5：var isDone = false;

let u: undefined = undefined;
let n: null = null;
let obj: object = {x: 1};
let sym: symbol = Symbol("me"); 
```
**注意点：**`**null**`**和**`**undefined**`<br />默认情况下 `null` 和 `undefined` 是所有类型的子类型。 就是说你可以把 `null` 和 `undefined` 赋值给其他类型。
```javascript
// null和undefined赋值给string
let str:string = "666";
str = null
str= undefined

// null和undefined赋值给number
let num:number = 666;
num = null
num= undefined

// null和undefined赋值给object
let obj:object ={};
obj = null
obj= undefined

// null和undefined赋值给Symbol
let sym: symbol = Symbol("me"); 
sym = null
sym= undefined

// null和undefined赋值给boolean
let isDone: boolean = false;
isDone = null
isDone= undefined

// null和undefined赋值给bigint
let big: bigint =  100n;
big = null
big= undefined

// 启用 --strictNullChecks
let x: number;
x = 1; // 编译正确
x = undefined;    // 编译错误
x = null;    // 编译错误

// undefined 可以给 void 赋值, null 不行
let c:void = undefined // 编译正确
let d:void = null // 编译错误

```
如果你在`tsconfig.json`指定了`"strictNullChecks":true `，<br />`null` 和 `undefined` 只能给它们各自的类型赋值。
> 注意：
> - `"strictNullChecks":true `模式下
>    -  `null`**_不能_** 赋值给 `void`
>    -  `undefined` **_可以  _**赋值给 `void`
> - [https://www.typescriptlang.org/tsconfig#strictNullChecks](https://www.typescriptlang.org/tsconfig#strictNullChecks)

### 4.2、`number`和`bigint`
虽然`number`和`bigint`都表示数字，但是这两个类型不兼容。
```javascript
let big: bigint =  100n;
let num: number = 6;
big = num;
num = big;
```
会抛出一个类型不兼容的 ts(2322) 错误。
### 4.3、`Number`、`String`、`Boolean`、`Symbol`
首先，我们来回顾一下初学 `TypeScript` 时，很容易和原始类型 `number`、`string`、`boolean`、`symbol` 混淆的首字母大写的 `Number`、`String`、`Boolean`、`Symbol` 类型，后者是相应原始类型的包装对象，姑且把它们称之为对象类型。<br />从类型兼容性上看，原始类型兼容对应的对象类型，反过来对象类型不兼容对应的原始类型。<br />下面我们看一个具体的示例：
```javascript
let num: number;
let Num: Number;
Num = num; // ok
num = Num; // ts(2322)报错

```
在示例中的第 3 行，我们可以把 number 赋给类型 Number，<br />但在第 4 行把 `Number` 赋给 number 就会提示 ts(2322) 错误。<br />『因此，我们需要铭记不要使用对象类型来注解值的类型，因为这没有任何意义。』
### 4.4、`void`
`void`表示没有任何类型，和其他类型是平等关系，不能直接赋值:
```typescript
let a: void; 
let b: number = a; // Error
```
你只能为它赋予`null`和`undefined`（在`strictNullChecks`未指定为`true`时）。<br />声明一个`void`类型的变量没有什么大用，我们一般也只有在函数没有返回值时去声明。<br />值得注意的是，方法没有返回值将得到`undefined`，但是我们需要定义成`void`类型，而不是`undefined`类型。否则将报错:
```typescript
// 以下代码会异常，不复合预期
function fun(): undefined {
  console.log("this is TypeScript");
};
fun(); // Error

// 以下代码正常，复合预期
function sayHello(): void {
  console.log("hello 啊，树哥！");
}
```
### 4.5、`never`
值会永不存在的两种情况：<br />如果一个函数执行时抛出了异常，那么这个函数永远不存在返回值（因为抛出异常会直接中断程序运行，这使得程序运行不到返回值那一步，即具有不可达的终点，也就永不存在返回了）；<br />函数中执行无限循环的代码（死循环），使得程序永远无法运行到函数返回值那一步，永不存在返回。
```typescript
// 异常
function err(msg: string): never { // OK
  throw new Error(msg); 
}

// 死循环
function loopForever(): never { // OK
  while (true) {};
}

```
`never`类型同`null`和`undefined`一样，也是任何类型的子类型，也可以赋值给任何类型。<br />但是没有类型是`never`的子类型或可以赋值给`never`类型（除了`never`本身之外），即使`any`也不可以赋值给`never`
```typescript
let ne: never;
let nev: never;
let an: any;

ne = 123; // Error
ne = nev; // OK
ne = an; // Error
ne = (() => { throw new Error("异常"); })(); // OK
ne = (() => { while(true) {} })(); // OK
```
在 `TypeScript` 中，可以利用 `never` 类型的特性来实现全面性检查，具体示例如下：
```typescript
type Foo = string | number;

function controlFlowAnalysisWithNever(foo: Foo) {
  if (typeof foo === "string") {
    // 这里 foo 被收窄为 string 类型
  } else if (typeof foo === "number") {
    // 这里 foo 被收窄为 number 类型
  } else {
    // foo 在这里是 never
    const check: never = foo;
  }
}
```
注意在 `else` 分支里面，我们把收窄为 `never` 的 `foo` 赋值给一个显示声明的 `never` 变量。如果一切逻辑正确，那么这里应该能够编译通过。但是假如后来有一天你的同事修改了 Foo 的类型：
```typescript
type Foo = string | number | boolean;
```
然而他忘记同时修改 `controlFlowAnalysisWithNever` 方法中的控制流程，这时候 `else` 分支的 `foo` 类型会被收窄为 `boolean` 类型，导致无法赋值给 `never` 类型，这时就会产生一个编译错误。通过这个方式，我们可以确保`controlFlowAnalysisWithNever` 方法总是穷尽了 `Foo` 的所有可能类型。 

『 通过这个示例，我们可以得出一个结论：_**使用 **_`_**never**_`_** 避免出现新增了联合类型没有对应的实现，目的就是写出类型绝对安全的代码。**_』
### 4.6、`any`
在 `TypeScript` 中，任何类型都可以被归为 `any` 类型。这让 any 类型成为了类型系统的**顶级类型**.<br />如果是一个普通类型，在赋值过程中改变类型是不被允许的：
```typescript
let a: string = 'seven';
a = 7; // TS2322: Type 'number' is not assignable to type 'string'.
```
但如果是 `any` 类型，则允许被赋值为任意类型。
```typescript
let a: any = 666;
a = "Semlinker";
a = false;
a = 66
a = undefined
a = null
a = []
a = {}
```
在`any`上访问任何属性都是允许的,也允许调用任何方法.
```typescript
let anyThing: any = 'hello';
console.log(anyThing.myName);
console.log(anyThing.myName.firstName);
let anyThing: any = 'Tom';
anyThing.setName('Jerry');
anyThing.setName('Jerry').sayHello();
anyThing.myName.setFirstName('Cat');
```
变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：
```typescript
let something;
something = 'seven';
something = 7;
something.setName('Tom');
```
等价于
```typescript
let something: any;
something = 'seven';
something = 7;
something.setName('Tom');
```
在许多场景下，这太宽松了。使用 `any` 类型，可以很容易地编写类型正确但在运行时有问题的代码。如果我们使用 `any` 类型，就无法使用 `TypeScript` 提供的大量的保护机制。<br />_请记住，_`_any_`_ 是魔鬼！尽量不要用any。_<br />为了解决 **any** 带来的问题，**TypeScript 3.0** 引入了 unknown 类型。
### 4.7、`unkown`
`unknown`与`any`一样，所有类型都可以分配给`unknown`:
```typescript
let notSure: unknown = 4;
notSure = "maybe a string instead"; // OK
notSure = false; // OK
notSure = 42; // OK
notSure = []; // OK
notSure = {}; // OK
notSure = Math.random; // OK
notSure = null; // OK
notSure = undefined; // OK
notSure = new TypeError(); // OK
notSure = Symbol("type"); // OK
```
`**_unknown_**`**_与_**`**_any_**`**_的最大区别是： _**

- 任何类型的值可以赋值给`any`，同时`any`类型的值也可以赋值给任何类型。
- `unknown` 任何类型的值都可以赋值给它，但它只能赋值给`unknown`和`any`。
```typescript
let notSure: unknown = 4;
let uncertain: any = notSure; // OK

let notSure: any = 4;
let uncertain: unknown = notSure; // OK

let value3: boolean = uncertain; // Error
let value4: number = uncertain; // Error
let value5: string = uncertain; // Error
let value6: object = uncertain; // Error
let value7: any[] = uncertain; // Error
let value8: Function = uncertain; // Error
```
如果不缩小类型，就无法对`unknown`类型执行任何操作：<br />这种机制起到了很强的预防性，更安全，这就要求我们必须缩小类型，我们可以使用`typeof`、`类型断言`等方式来缩小未知范围：
```typescript
function getDogName() {
 let x: unknown;
 return x;
};
const dogName = getDogName(); // 直接使用
const upName = dogName.toLowerCase(); // Error

// typeof
if (typeof dogName === 'string') {
  const upName = dogName.toLowerCase(); // OK
}

// 类型断言 
const upName = (dogName as string).toLowerCase(); // OK
```

### 4.8、`Tuple`(元组)
#### 4.8.1、元祖定义

- 数组一般由同种类型的值组成，但有时我们需要在单个变量中存储不同类型的值，这时候我们就可以使用元组。
- _在 _`_JavaScript_`_ 中是没有元组的，元组是 _`_TypeScript_`_ 中特有的类型，其工作方式类似于数组。_
- 元组最重要的**特性**是可以**限制数组元素的个数和类型**，它特别适合用来实现**多值返回**。
- 元祖用于保存定长定数据类型的数据
```typescript
let x: [string, number]; 
// 类型必须匹配且个数必须为2

x = ['hello', 10]; // OK 
x = ['hello', 10, 10]; // Error 
x = [10, 'hello']; // Error
```
> **注意：**
> - 元组类型只能表示一个已知元素数量和类型的数组，长度已指定，越界访问会提示错误。
> - 如果一个数组中可能有多种类型，数量和类型都不确定，那就直接any[]

#### 4.8.2、元祖类型的解构赋值
我们可以通过下标的方式来访问元组中的元素，当元组中的元素较多时，这种方式并不是那么便捷。<br />其实元组也是支持解构赋值的：
```typescript
let employee: [number, string] = [1, "Semlinker"];
let [id, username] = employee;
console.log(`id: ${id}`);
console.log(`username: ${username}`);
```
以上代码成功运行后，控制台会输出以下消息：
```typescript
id: 1
username: Semlinker
```
这里需要注意的是，在解构赋值时，如果解构数组元素的个数是不能超过元组中元素的个数，否则也会出现错误，比如：
```javascript
let employee: [number, string] = [1, "Semlinker"];\
let [id, username, age] = employee;
```
在以上代码中，我们新增了一个 `age` 变量，但此时 `TypeScript` 编译器会提示以下错误信息：
```javascript
Tuple type '[number, string]' of length '2' has no element at index '2'.
```
很明显元组类型` [number, string] `的长度是` 2`，在位置索引 `2` 处不存在任何元素。
#### 4.8.3、元组类型的可选元素
与函数签名类型，在定义元组类型时，我们也可以通过 `?` 号来声明元组类型的可选元素，具体的示例如下：
```javascript
let optionalTuple: [string, boolean?];
optionalTuple = ["Semlinker", true];
console.log(`optionalTuple : ${optionalTuple}`);
optionalTuple = ["Kakuqo"];
console.log(`optionalTuple : ${optionalTuple}`);
```
在上面代码中，我们定义了一个名为 `optionalTuple` 的变量，该变量的类型要求包含一个必须的字符串属性和一个可选布尔属性，该代码正常运行后，控制台会输出以下内容：
```javascript
optionalTuple : Semlinker,true
optionalTuple : Kakuqo
```
那么在实际工作中，声明可选的元组元素有什么作用？<br />这里我们来举一个例子，在三维坐标轴中，一个坐标点可以使用` (x, y, z) `的形式来表示，对于二维坐标轴来说，坐标点可以使用` (x, y) `的形式来表示，而对于一维坐标轴来说，只要使用` (x) `的形式来表示即可。针对这种情形，在 `TypeScript` 中就可以利用元组类型可选元素的特性来定义一个元组类型的坐标点，具体实现如下：
```javascript
type Point = [number, number?, number?];

const x: Point = [10]; // 一维坐标点
const xy: Point = [10, 20]; // 二维坐标点
const xyz: Point = [10, 20, 10]; // 三维坐标点

console.log(x.length); // 1
console.log(xy.length); // 2
console.log(xyz.length); // 3
```
#### 4.8.4、元组类型的剩余元素
元组类型里最后一个元素可以是剩余元素，形式为 `...X`，这里 `X` 是数组类型。<br />**剩余元素代表元组类型是开放的，可以有零个或多个额外的元素。**<br />例如：`[number, ...string[]] `表示带有一个 `number` 元素和任意数量`string` 类型元素的元组类型。<br />为了能更好的理解，我们来举个具体的例子：
```javascript
type RestTupleType = [number, ...string[]];
let restTuple: RestTupleType = [666, "Semlinker", "Kakuqo", "Lolo"];
console.log(restTuple[0]);
console.log(restTuple[1]);
```
#### 4.8.5、只读的元组类型
`TypeScript 3.4` 还引入了对只读元组的新支持。我们可以为任何元组类型加上 `readonly` 关键字前缀，以使其成为只读元组。具体的示例如下：
```javascript
const point: readonly [number, number] = [10, 20];
```
在使用 readonly 关键字修饰元组类型之后，任何企图修改元组中元素的操作都会抛出异常：
```javascript
// Cannot assign to '0' because it is a read-only property.
point[0] = 1;
// Property 'push' does not exist on type 'readonly [number, number]'.
point.push(0);
// Property 'pop' does not exist on type 'readonly [number, number]'.
point.pop();
// Property 'splice' does not exist on type 'readonly [number, number]'.
point.splice(1, 1);
```
### 4.9、`Enum`(枚举)
使用枚举我们可以定义一些带名字的常量。 使用枚举可以清晰地表达意图或创建一组有区别的用例。 <br />`TypeScript` 支持**数字**的和基于**字符串**的枚举。
#### **4.9.1、数字枚举**
```javascript
enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}

let dir: Direction = Direction.NORTH;
```
默认情况下，`NORTH` 的初始值为 `0`，<br />`Direction.SOUTH` 的值为 `1`，<br />`Direction.EAST` 的值为 `2`，<br />`Direction.WEST` 的值为 `3`。<br />初始值默认为 0 其余的成员会会按顺序自动增长 可以理解为数组下标。<br />上面的枚举示例代码经过编译后会生成以下代码：
```javascript
"use strict";
var Direction;

(function (Direction) {
  Direction[(Direction["NORTH"] = 0)] = "NORTH";
  Direction[(Direction["SOUTH"] = 1)] = "SOUTH";
  Direction[(Direction["EAST"] = 2)] = "EAST";
  Direction[(Direction["WEST"] = 3)] = "WEST";
})(Direction || (Direction = {}));

var dir = Direction.NORTH;
```
当然我们也可以设置 NORTH 的初始值，比如：
```javascript
enum Direction {
  NORTH = 3,
    SOUTH,
    EAST,
    WEST,
}
```
#### 4.9.2、字符串枚举
在 TypeScript 2.4 版本，允许我们使用字符串枚举。在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化。
```javascript
enum Direction {
  NORTH = "NORTH",
    SOUTH = "SOUTH",
    EAST = "EAST",
    WEST = "WEST",
}
```
以上代码对于的 ES5 代码如下：
```javascript
"use strict";
var Direction;
(function (Direction) {
    Direction["NORTH"] = "NORTH";
    Direction["SOUTH"] = "SOUTH";
    Direction["EAST"] = "EAST";
    Direction["WEST"] = "WEST";
})(Direction || (Direction = {}));
```
#### 4.9.3、异构枚举
异构枚举的成员值是数字和字符串的混合：
```javascript
enum Enum {
  A,
  B,
  C = "C",
  D = "D",
  E = 8,
  F,
}
```
以上代码对于的 ES5 代码如下：
```javascript
"use strict";
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
    Enum[Enum["B"] = 1] = "B";
    Enum["C"] = "C";
    Enum["D"] = "D";
    Enum[Enum["E"] = 8] = "E";
    Enum[Enum["F"] = 9] = "F";
})(Enum || (Enum = {}));
```
通过观察上述生成的 ES5 代码，我们可以发现数字枚举相对字符串枚举多了 “反向映射”：
```javascript
console.log(Enum.A) //输出：0
console.log(Enum[0]) // 输出：A
```

### 4.10、`object`、`Object` 和`{}`
另外，`object`（首字母小写，以下称“小 `object`”）、`Object`（首字母大写，以下称“大 `Object`”）`{}`（以下称“空对象”）

_小 _`_object_`_ 代表的是所有非原始类型，也就是说我们不能把 _`_number_`_、_`_string_`_、_`_boolean_`_、_`_symbol_`_等 原始类型赋值给 _`_object_`_。在严格模式下，_`_null_`_ 和 _`_undefined_`_ 类型也不能赋给 _`_object_`_。_
> JavaScript 中以下类型被视为原始类型：<br />`string`、`boolean`、`number`、`bigint`、`symbol`、`null` 和 `undefined`。


下面我们看一个具体示例：
```typescript
let lowerCaseObject: object;
// 3-7行，异常
lowerCaseObject = 1; // ts(2322)
lowerCaseObject = 'a'; // ts(2322)
lowerCaseObject = true; // ts(2322)
lowerCaseObject = null; // ts(2322)
lowerCaseObject = undefined; // ts(2322)
// 以下正常
lowerCaseObject = {}; // ok
```
在示例中的第`3~7` 行都会提示 `ts(2322) `错误，但是我们在第 9 行把一个空对象赋值给 `object` 后，则可以通过静态类型检测。

_大_`_Object_`_ 代表所有拥有 _`_toString_`_、_`_hasOwnProperty_`_ 方法的类型，所以所有原始类型、非原始类型都可以赋给 _`_Object_`_。同样，在严格模式下，_`_null_`_ 和 _`_undefined_`_ 类型也不能赋给 _`_Object_`_。_<br />下面我们也看一个具体的示例：
```typescript
let upperCaseObject: Object;
// 以下3-4行，异常
upperCaseObject = null; // ts(2322)
upperCaseObject = undefined; // ts(2322)
// 以下5-9行正常
upperCaseObject = 1; // ok
upperCaseObject = 'a'; // ok
upperCaseObject = true; // ok
upperCaseObject = {}; // ok
```
在示例中的第6到9 行都可以通过静态类型检测，而第 3~4 行则会提示 ts(2322) 错误

从上面示例可以看到，大 `Object` 包含原始类型，小 `object` 仅包含非原始类型，所以大 `Object` 似乎是小 `object` 的父类型。<br />实际上，大 `Object` 不仅是小 `object` 的父类型，同时也是小 `object` 的子类型。<br />下面我们还是通过一个具体的示例进行说明。
```typescript
type isLowerCaseObjectExtendsUpperCaseObject = object extends Object ? true : false; // true
type isUpperCaseObjectExtendsLowerCaseObject = Object extends object ? true : false; // true
upperCaseObject = lowerCaseObject; // ok
lowerCaseObject = upperCaseObject; // ok
```
在示例中的第 1 行和第 2 行返回的类型都是 true，第3 行和第 4 行的 upperCaseObject 与 lowerCaseObject 可以互相赋值。
> 注意：
> - 尽管官方文档说可以使用小 `object` 代替大 `Object`，但是我们仍要明白大 `Object` 并不完全等价于小 `object`。


`_{}_`_空对象类型和大 _`_Object_`_ 一样，也是表示原始类型和非原始类型的集合，并且在严格模式下，_`_null_`_ 和 _`_undefined_`_ 也不能赋给_`_{}_` ，如下示例：
```typescript
let ObjectLiteral: {};
ObjectLiteral = null; // ts(2322)
ObjectLiteral = undefined; // ts(2322)

ObjectLiteral = 1; // ok
ObjectLiteral = 'a'; // ok
ObjectLiteral = true; // ok
ObjectLiteral = {}; // ok

type isLiteralCaseObjectExtendsUpperCaseObject = {} extends Object ? true : false; // true
type isUpperCaseObjectExtendsLiteralCaseObject = Object extends {} ? true : false; // true

upperCaseObject = ObjectLiteral;
ObjectLiteral = upperCaseObject;
```
在示例中<br />而第`2` 行、第 `3` 行会提示 `ts(2322)` 错误<br />第 `10` 行 ~ 第 11 行返回的类型都是 `true`<br />第 `13` 行和第 `14` 行的 `ObjectLiteral` 与 `upperCaseObject` 可以互相赋值，<br />第 `5~8` 行的赋值操作都符合静态类型检测；。

『综上结论：`{}`、大 `Object` 是比小 `object` 更宽泛的类型（`least specific`），`{}` 和大 `Object` 可以互相代替，用来表示原始类型（`null`、`undefined` 除外）和非原始类型；而小 `object` 则表示非原始类型。』
### 4.11、`Array`（数组）
对数组类型的定义有两种方式：
```typescript
let arr:string[] = ["1", "2", "3"];
// ES5：var list = [1, 2, 3];

let arr2:Array<string> = ["1","2"]；
// ES5：var list = [1, 2, 3];

```
定义联合类型数组
```typescript
let arr:(number | string)[];
// 表示定义了一个名称叫做arr的数组, 
// 这个数组中将来既可以存储数值类型的数据, 也可以存储字符串类型的数据
arr3 = [1, 'b', 2, 'c'];
```
定义指定对象成员的数组：
```typescript
// interface是接口,后面会讲到
interface Arrobj{
  name:string,
  age:number
}
let arr3:Arrobj[]=[{name:'jimmy',age:22}]
```
定义二维数组的方法
```typescript
// 方法一
let twoM : string[][]; // 

// 方法二
let twoM : Array<Array<string>>;

// 由于twoM只是声明了, 并没有初始化, 所以运行的时候变量的初始值是undefined.
// 要避免这个错误, 可以在声明的时候初始化变量
// 例如：
let twoM : string[][] = []
//或
let twoM : Array<Array<string>> = new Array<Array<string>>()

// 例如
let twoM: Array<Array<boolean>> = new Array(n).fill(0).map(() => new Array(n).fill(0));

```
### 4.12、Function(函数)
#### 4.12.1、函数声明
```typescript
function sum(x: number, y: number): number {
  return x + y;
}
```
#### 4.12.2、函数表达式
```typescript
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y;
};
```
#### 4.12.3、用接口定义函数类型
```typescript
interface SearchFunc{
  (source: string, subString: string): boolean;
}
```
采用函数表达式接口定义函数的方式时，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。
#### 4.12.4、可选参数
```typescript
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + ' ' + lastName;
  } else {
    return firstName;
  }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```
注意点：可选参数后面不允许再出现必需参数
#### 4.12.5、参数默认值
```typescript
function buildName(firstName: string, lastName: string = 'Cat') {
  return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```
#### 4.12.6、剩余参数
```typescript
function push(array: any[], ...items: any[]) {
  items.forEach(function(item) {
    array.push(item);
  });
}
let a = [];
push(a, 1, 2, 3);
```
#### 4.12.7、函数重载
由于 `JavaScript` 是一个动态语言，我们通常会使用不同类型的参数来调用同一个函数，该函数会根据不同的参数而返回不同的类型的调用结果：
```typescript
function add(x, y) {
  return x + y;
}
add(1, 2); // 3
add("1", "2"); //"12"

```
由于 `TypeScript` 是 `JavaScript` 的超集，因此以上的代码可以直接在 `TypeScript` 中使用，但当 `TypeScript` 编译器开启 `noImplicitAny` 的配置项时，以上代码会提示以下错误信息：
```javascript
Parameter 'x' implicitly has an 'any' type.
Parameter 'y' implicitly has an 'any' type.
```
该信息告诉我们参数 x 和参数 y 隐式具有 `any` 类型。<br />为了解决这个问题，我们可以为参数设置一个类型。<br />因为我们希望 add 函数同时支持 `string` 和 `number` 类型，因此我们可以定义一个 `string | number` 联合类型，同时我们为该联合类型取个别名：
```javascript
type Combinable = string | number;
```
在定义完 `Combinable` 联合类型后，我们来更新一下 `add` 函数：
```typescript
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
```
为 `add` 函数的参数显式设置类型之后，之前错误的提示消息就消失了。那么此时的 `add` 函数就完美了么，我们来实际测试一下：
```typescript
const result = add('Semlinker', ' Kakuqo');
result.split(' ');
```
在上面代码中，我们分别使用` 'Semlinker' `和 `' Kakuqo' `这两个字符串作为参数调用 `add` 函数，并把调用结果保存到一个名为 `result` 的变量上，这时候我们想当然的认为此时 `result` 的变量的类型为 `string`，所以我们就可以正常调用字符串对象上的 `split` 方法。<br />但这时 `TypeScript` 编译器又出现以下错误信息了：
```typescript
Property 'split' does not exist on type 'number'.
```
很明显 `number` 类型的对象上并不存在 `split` 属性。<br />问题又来了，那如何解决呢？这时我们就可以利用 `TypeScript` 提供的_**函数重载**_特性：<br />『函数重载或方法重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力。 要解决前面遇到的问题，方法就是为同一个函数提供多个函数类型定义来进行函数重载，编译器会根据这个列表去处理函数的调用。』
```typescript
type Types = number | string
function add(a:number,b:number):number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a:Types, b:Types) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
const result = add('Semlinker', ' Kakuqo');
result.split(' ');
```
在以上代码中，我们为 `add` 函数提供了多个函数类型定义，从而实现函数的重载。之后，可恶的错误消息又消失了，因为这时 `result` 变量的类型是 `string` 类型。

### 4.13、使用Map和Set类型
在 TypeScript 中使用 **Map** 和 **Set** 类型很简单。可以使用以下方式定义变量或函数参数的类型：
```typescript
// 定义 Map 类型变量
const myMap: Map<string, number> = new Map();

// 定义 Set 类型变量
const mySet: Set<string> = new Set();

// 函数参数为 Map 类型
function myFunction(mapParam: Map<string, number>) {
  // ...
}

// 函数参数为 Set 类型
function myOtherFunction(setParam: Set<string>) {
  // ...
}

```

## 五、类型推断
```typescript
{
  let str: string = 'this is string';
  let num: number = 1;
  let bool: boolean = true;
}
{
  const str: string = 'this is string';
  const num: number = 1;
  const bool: boolean = true;
}

```
看着上面的示例，可能你已经在嘀咕了：定义基础类型的变量都需要写明类型注解，`TypeScript` 太麻烦了吧？在示例中，使用 `let` 定义变量时，我们写明类型注解也就罢了，毕竟值可能会被改变。可是，使用 `const` 常量时还需要写明类型注解，那可真的很麻烦。<br />实际上，`TypeScript` 早就考虑到了这么简单而明显的问题。<br />在很多情况下，`TypeScript` 会根据上下文环境自动推断出变量的类型，无须我们再写明类型注解。因此，上面的示例可以简化为如下所示内容：
```typescript
{
  let str = 'this is string'; // 等价 let str: string = 'this is string'; 下面类似
  let num = 1; // 等价
  let bool = true; // 等价
}
{
  const str = 'this is string'; // 不等价
  const num = 1; // 不等价
  const bool = true; // 不等价
}
```
我们把 `TypeScript` 这种**基于赋值表达式推断类型**的能力称之为类型推断。<br />在 `TypeScript` 中，具有初始化值的变量、有默认值的函数参数、函数返回的类型都可以根据上下文推断出来。比如我们能根据 `return` 语句推断函数返回的类型，如下代码所示：
```typescript
{
  /** 根据参数的类型，推断出返回值的类型也是 number */
  function add1(a: number, b: number) {
    return a + b;
  }
  const x1= add1(1, 1); // 推断出 x1 的类型也是 number

  /** 推断参数 b 的类型是数字或者 undefined，返回值的类型也是数字 */
  function add2(a: number, b = 1) {
    return a + b;
  }
  const x2 = add2(1);
  const x3 = add2(1, '1'); // ts(2345) Argument of type "1" is not assignable to parameter of type 'number | undefined
}
```
_**如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 **_`_**any**_`_** 类型而完全不被类型检查：**_
```typescript
let x;
x = 1; // 编译正确
x = true; // 编译正确
```

## 六、类型断言
时候你会遇到这样的情况，**你**会比 `TypeScript` 更了解某个值的详细信息。通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。<br />通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。类型断言好比其他语言里的类型转换，但是不进行特殊的数据检查和解构。它没有运行时的影响，只是在编译阶段起作用。<br />**TypeScript** 类型检测无法做到绝对智能，毕竟程序不能像人一样思考。有时会碰到我们比 `TypeScript` 更清楚实际类型的情况，比如下面的例子：
```typescript
const arrayNumber: number[] = [1, 2, 3, 4];
const greaterThan2: number = arrayNumber.find(num => num > 2); // 提示 ts(2322)
```
其中，`greaterThan2` 一定是一个数字（确切地讲是 3），因为 `arrayNumber` 中明显有大于 2 的成员，但静态类型对运行时的逻辑无能为力。<br />在 `TypeScript` 看来，`greaterThan2` 的类型既可能是数字，也可能是 `undefined`，所以上面的示例中提示了一个 ts(2322) 错误，此时我们不能把类型 undefined 分配给类型 `number`。<br />不过，我们可以使用一种笃定的方式——**类型断言**（类似仅作用在类型层面的强制类型转换）告诉 `TypeScript` 按照我们的方式做类型检查。<br />比如，我们可以使用 `as` 语法做类型断言，如下代码所示：
```typescript
const arrayNumber: number[] = [1, 2, 3, 4];
const greaterThan2: number = arrayNumber.find(num => num > 2) as number;
```
### 6.1、语法
```typescript
// 尖括号 语法
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// as 语法
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```
以上两种方式虽然没有任何区别，<br />_但是尖括号格式会与_`_react_`_中_`_JSX_`_产生语法冲突_，<br />因此我们更推荐使用 `as` 语法。
### 6.2、非空断言
在上下文中当类型检查器无法断定类型时，一个新的后缀表达式操作符 ! 可以用于断言操作对象是非 null 和非 undefined 类型。『**具体而言，x! 将从 x 值域中排除 **`**null**`** 和 **`**undefined**`**』 。**
```typescript
let mayNullOrUndefinedOrString: null | undefined | string;
mayNullOrUndefinedOrString!.toString(); // ok
mayNullOrUndefinedOrString.toString(); // ts(2531)
```
```typescript
type NumGenerator = () => number;

function myFunc(numGenerator: NumGenerator | undefined) {
  // Object is possibly 'undefined'.(2532)
  // Cannot invoke an object which is possibly 'undefined'.(2722)
  const num1 = numGenerator(); // Error
  const num2 = numGenerator!(); //OK
}
```
### 6.3、确定赋值断言
允许在实例属性和变量声明后面放置一个 `!` 号，从而告诉 `TypeScript` 该属性会被明确地赋值。为了更好地理解它的作用，我们来看个具体的例子：
```typescript
let x: number;
initialize();

// Variable 'x' is used before being assigned.(2454)
console.log(2 * x); // Error
function initialize() {
  x = 10;
}

```
很明显该异常信息是说变量 x 在赋值前被使用了，要解决该问题，我们可以使用确定赋值断言：
```typescript
let x!: number;
initialize();
console.log(2 * x); // Ok

function initialize() {
  x = 10;
}
```
通过 `let x!: number;` 确定赋值断言，`TypeScript` 编译器就会知道该属性会被明确地赋值。
## 
