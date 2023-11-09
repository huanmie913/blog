---
title: 时间、时区详解
date: 2023-10-20
tags:
	- 时间
categories:
	- 技术专题
---

# 时间、时区详解
> 来源参考：
> 1. 对RFC 3339的时间、时区格式详解（2022-01-01T07:00:00.52Z）：[https://www.jianshu.com/p/f50005a2410c](https://www.jianshu.com/p/f50005a2410c) 
> 2. 互联网上的日期和时间：[https://zhuanlan.zhihu.com/p/31829454](https://zhuanlan.zhihu.com/p/31829454)
> 3. MDN/Date/cn：[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date)
> 4. MDN/Date/us：[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)


[Linux时间问题.xmind](https://www.yuque.com/attachments/yuque/0/2022/xmind/333805/1641371358560-cca447d2-cc63-4171-a016-acfa3a430c5e.xmind?_lake_card=%7B%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2022%2Fxmind%2F333805%2F1641371358560-cca447d2-cc63-4171-a016-acfa3a430c5e.xmind%22%2C%22name%22%3A%22Linux%E6%97%B6%E9%97%B4%E9%97%AE%E9%A2%98.xmind%22%2C%22size%22%3A287340%2C%22ext%22%3A%22xmind%22%2C%22source%22%3A%22%22%2C%22status%22%3A%22done%22%2C%22download%22%3Atrue%2C%22type%22%3A%22application%2Fvnd.xmind.workbook%22%2C%22mode%22%3A%22title%22%2C%22collapsed%22%3Afalse%2C%22taskType%22%3A%22upload%22%2C%22taskId%22%3A%22u52d25704-2d4b-48d4-85bf-423c46f8a1d%22%2C%22__spacing%22%3A%22both%22%2C%22id%22%3A%22xn70u%22%2C%22margin%22%3A%7B%22top%22%3Atrue%2C%22bottom%22%3Atrue%7D%2C%22card%22%3A%22file%22%7D)
## 一、RFC 3339/Date ISO 8601
国际标准组织（ISO）制定了[ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html),我们的中华人民共和国国家标准[GB/T 7408-2005《数据元和交换格式 信息交换 日期和时间表示法》](http://spec.nstl.gov.cn/metadata/download/upload/attpdf/60ab3074-78fb-47b7-96ba-91b66f9c849a.pdf)与`ISO 8601:2000`等效采用。

上面两个标准，对开发者而言，太过于严肃。其实有一份更加简单易读的文件 [RFC3339 Date and Time on the Internet: Timestamps](https://www.ietf.org/rfc/rfc3339.txt)。

本文之后的讨论，都基于 `RFC3339`。

`RFC3339` 和` ISO 8601` 差异

- RFC 3339遵循ISO 8601 DateTime格式
- `ISO`允许`24`点，而 `RFC 3339` 为了减少混淆，限制小时必须在0至23之间。`23:59`过`1`分钟，是第二天的`00:00`。
- `ISO`必须使用 `T`，`RFC 3399`可以使用 `空格代替T`
```
# This is acceptable in ISO 8601 and RFC 3339(with T)
2019-10-12T07:20:50.52Z

# This is only accepted in RFC 3339(without T)
2019-10-12 07:20:50.52Z
```
阅读`RFC3339`，我主要明确下面三个定义：

- 时间戳
- 本地时间
- 标准时间
### 1.1、时间戳
#### 概述
时间戳是一个**_数字_**，定义为格林威治时间`1970年01月01日00时00分00秒`(`北京时间1970年01月01日08时00分00秒`)起至现在的总秒数。<br />**注意，_同一时刻，不同时区获得的时间戳是相同的_。**<br />以前很多用来记录时间的字段，在数据库中往往不会存储为`Datetime`类型，而是直接存储为无符号整形，存放时间戳的值。

使用`javascript`获取当前时间的时间戳
```javascript
// 获取当前时间的时间戳
new Date().getTime(); // 1682485305804
```
#### 精度
说明：13位位毫秒级别；10位为秒级别

- `JavaScript`时间戳的精度：毫秒，共13位。`new Date().getTime()`
- `JAVA`时间戳的精度：毫秒，共13位。`System.out.println(System.currentTimeMillis())`
- `Python`默认`float`类型，通过转换可以得到13位。<br />`time.time()`<br />`int(round(time.time() * 1000))`
- PHP默认10位，秒级

#### 时间戳-特性应用
不重复、签名、文件命名

#### 不同时区的简称

- `**GMT：**Greenwich Mean Time`<br />格林威治标准时间：英国伦敦格林威治定为0°经线开始的地方，地球每15°经度 被分为一个时区，共分为24个时区，相邻时区相差一小时；例: 中国北京位于东八区，GMT时间比北京时间慢8小时。
- `**UTC**: Coordinated Universal Time`**世界协调时间；经严谨计算得到的时间，精确到秒，误差在0.9s以内， 是比GMT更为精确的世界时间。<br />UTC就是0时区的时间
- `**DST**: Daylight Saving Time`<br />夏季节约时间，即夏令时；是为了利用夏天充足的光照而将时间调早一个小时，北美、欧洲的许多国家实行夏令时；
- **CST<br />**四个不同时区的缩写：
   1. Central Standard Time (USA) UT-6:00 美国标准时间
   2. Central Standard Time (Australia) UT+9:30 澳大利亚标准时间
   3. China Standard Time UT+8:00 中国标准时间
   4. Cuba Standard Time UT-4:00 古巴标准时间

### 1.2、本地时间
当前时区的本地时间
```javascript
new Date().toLocaleString(); // '2023/4/26 13:09:37'
```
### 1.3、标准时间
本地时间只包括当前的时间，不包含任何时区信息。<br />同一时刻，东八区的本地时间比零时区的本地时间快了8个小时。<br />在不同时区之间交换时间数据，除了**_用纯数字的时间戳_**，还有一种更方便人类阅读的表示方式：**标准时间的偏移量表示方法**。

`RFC3339`详细定义了互联网上日期/时间的偏移量表示：
```
2017-12-08T00:00:00.00Z
# 这个代表了UTC时间的2017年12月08日零时
```
```
2017-12-08T08:00:00.00+08:00
# 这个代表了同一时刻的，东八区北京时间（CST）表示的方法
```

上面两个时间的时间戳是等价的。<br />两个的区别：在本地时间后面增加了时区信息。<br />Z表示零时区。+08:00表示UTC时间增加8小时。

这种表示方式容易让人疑惑的点是从标准时间换算UTC时间。以CST转换UTC为例，没有看文档的情况下，根据 +08:00 的结尾，很容易根据直觉在本地时间再加上8小时。正确的计算方法是本地时间减去多增加的8小时。`+08:00`减去`8`小时才是`UTC`时间，`-08:00`加上8小时才是`UTC`时间。

## 二、开发相关
### 2.1、客户端&服务端时间选择

- 服务端入库时间以时间戳为标准时间入库
- 前端根据业务所在时区以及业务对时间的要求，对行时间格式进行本地化转换

### 2.2、服务器时区设置
#### Docker 设置时区（使用北京时间）
很多Docker镜像都是UTC时区，在上海使用镜像启用容器，容器里面获取的本地时间都会慢8个小时。可以在Dockerfile里面设置时区。[参考这个问题的回答](https://serverfault.com/questions/683605/docker-container-time-timezone-will-not-reflect-changes)
```dockerfile
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
```

#### Ubuntu设置时区（使用北京时间）
Docker里面大部分镜像是基于Debian的，Docker这么解决，Ubuntu上思路类似，直接执行命令就好了。
```dockerfile
TZ=Asia/Shanghai
ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
```
可以执行`date`命令查看时间，CST是中国标准时间。
```shell
date
# Fri Apri 26 16:00:50 CST 2023
```

### 2.3、javascript常用时间插件推荐
#### 2.3.1、Day.js
官网：[https://dayjs.gitee.io/zh-CN/](https://dayjs.gitee.io/zh-CN/)
#### 2.3.2、moment.js
github：[https://github.com/moment/moment/](https://github.com/moment/moment/)
#### 2.3.3、date-fns（推荐/模块函数）
官网：[https://date-fns.org/docs/Getting-Started/](https://date-fns.org/docs/Getting-Started/)<br />github：[https://github.com/date-fns/date-fns](https://github.com/date-fns/date-fns)<br />注意：locale的使用和引入
```javascript
// 引入通用方法
import { parseISO, format, formatDistance, setDefaultOptions } from 'date-fns'

// 推荐：引入中文语言包，该方法可正常构建
import zhCN from 'date-fns/locale/zh-CN/index';

// 不推荐: 该方法使用vite构建时，可能导致无法识别es模块
import { zhCN } from 'date-fns/locale/';

// 推荐：设置全局默认语言包
setDefaultOptions({locale: zhCN})

// 格式化指定时间字符
format(parseISO('2023-10-24'), 'yyyy-MM-dd')
```

### 2.4、`nodeJS`中`new Date()`的注意项

- `v6`之后的版本`new Date（）`相当于同调用了toISOString（）方法，即new Date() 使用的是`UTC 0时区`时间

### 2.5、`javascript: new Date(dateString)`时间戳问题
前置条件：本地时区为北京时间

- `new Date('2023-01-17').getTime()`
```javascript
new Date('2023-01-17').getTime()
// 1、返回值：1673913600000
// 2、识别为标准格式："2023-01-17"转为"2023-01-17T00:00:00Z"为UTC时间
// 3、使用GMT格式显示为本地时区时间
// 4、控制台输出GMT时间：Tue Jan 17 2023 08:00:00 GMT+0800 (中国标准时间)
// 4、返回的时间戳是指2023年1月17日00:00:00的本地时刻(北京时间)
```

- `new Date('2023-01-17 00:00:00).getTime()`
```javascript
new Date('2023-01-17 00:00:00').getTime()
// 1、返回值：1673884800000
// 2、识别为非标准格式：将"2023-01-17 00:00:00" 识别为本地时间
// 3、使用本地时区进行计算并转换为UTC时间"2023-01-16T16:00:00Z"
// 4、使用GMT格式显示为本地时区时间
// 5、控制台输出GMT时间：Tue Jan 17 2023 00:00:00 GMT+0800 (中国标准时间)
// 6、获取的时间戳为指定时间的时间戳，没有做本地时区转换
```

**实例分析**

- 以上两个例子使用的是[new Date(dateString)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#%E5%8F%82%E6%95%B0) 规范，如参数的`dateString`含有"空格"，可能被识别转换为"`RFC 3339/tc39`"要求的**标准格式**
- 当使用时区相关方法时，例如：`getTime()`，`toISOString()`，`toLocaleString()`,`getUTCDate()`
   - 如`dateString`可识别为`标准格式`，则直接使用。<br />例如：`2023-01-07`将转为标准格式`2023-01-07T00:00:00Z`
   - 如`dateString`不可转转为标准格式，则将dateString识别为本地时区的时间，并使用本地时区为基础，转为UTC时间后，再进行计算。<br />例如：`2023-01-07 00:00:00`为非标准格式，本地时区为北京时间，转为UTC时间后，`2023-01-16T16:00:00Z`
- 当使用时区无关的方法时，例如：`getFullYear()`，`getDate()`，`getMonth()`，`getDate()`
   - 如 `new Date('2023-01-17').getDate()` 和 `new Date('2023-01-17 00:00:00').getDate()` 得到的值都为`17`
## 三、常用时间单位及换算关系
1秒(s) ＝1000毫秒(ms)<br />1毫秒(ms)＝1000微秒 (us)<br />1微秒(us)＝1000纳秒 (ns)<br />1纳秒(ns)＝1000皮秒 (ps)

---

### 皮秒，符号ps（英语：picosecond ）
<br />1皮秒等于一万亿分之一秒<br />1,000 皮秒 = 1纳秒<br />1,000,000 皮秒 = 1微秒<br />1,000,000,000 皮秒 = 1毫秒<br />1,000,000,000,000 皮秒 = 1秒

### 纳秒，符号ns（英语：nanosecond ）
1纳秒等于十亿分之一秒<br />1 纳秒 = 1000皮秒<br />1,000 纳秒 = 1微秒<br />1,000,000 纳秒 = 1毫秒<br />1,000,000,000 纳秒 = 1秒

### 微秒，符号μs（英语：microsecond ）
1微秒等于一百万分之一秒<br />0.000 001 微秒 = 1皮秒<br />0.001 微秒 = 1纳秒<br />1,000 微秒 = 1毫秒<br />1,000,000 微秒 = 1秒

### 毫秒，符号ms（英语：millisecond ）
1毫秒等于一千分之一秒<br />0.000 000 001 毫秒 = 1皮秒<br />0.000 001 毫秒 = 1纳秒<br />0.001 毫秒 = 1微秒<br />1000 毫秒 = 1秒

## 四、其他

- 国际航班机票上的[出发/到达]时间，使用的时区为对应[出发地/目的地]的时区，如需计算航班行程，需使用同一时区进行计算
