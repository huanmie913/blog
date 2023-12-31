---
title: Linux之前后台运行命令
date: 2023-10-20
tags:
 - linux
 - shell
categories:
 - 运维|网络
---
# Linux之前后台运行命令

## 一、简介

**前台**是指当前可以操控和执行命令的这个操作环境，一般指当前使用的终端`<br />`**后台**是指工作可以自行运行，但是不能直接用 `ctrl+c`来终止它，只能使用 `fg/bg`来调用工作。

**注意事项**

1. 当前的登录终端，只能管理当前终端的工作，而不能管理其他登录终端的工作。

   如 `user1`登录的终端，是不能管理 `user2`终端中的工作的。`<br />`也就是说哪一个终端放入后台运行的程序，只有这个终端能查看到，其他的终端是查看不到该程序的。`<br />`该终端一关闭，由这个终端放入后台运行的程序也会终止。`<br />`也可以关闭终端让其放入后台的程序不终止（参考本文中 `nohup`命令）
2. 放入后台的命令必须可以持续运行一段时间，这样我们才能扑捉和操作这个工作，例如可使用 `sleep` 命令做测试。

   如果把 `ls`命令放入后台执行，它很快就会执行完成，我们很难操作它。
3. 放入**后台**执行的命令不能和**前台**用户有交互或需要前台输入，否则放入后台**只能暂停，而不能执行**。

   比如vim命令放入后台只能暂停，而不能执行，因为vim需要前台输入信息。`<br />`还有一个top命令也不能放入后台执行，而只能放入后台暂停，因为top命令需要和前台有交互。`<br />`也就是说，不是所有的命令都是可以在后台执行的， 只有这个程序不需要用户介入才可以。`<br />`比如说：打包压缩、程序安装等。

## 二、把命令放入后台运行的方法

`<a name="UDOZL"></a>`

### ① `要执行的命令 &`  & 会把其_左侧的命令_放入到后台运行

```shell
# 1.打包etc目录
# 将tar命令放入后台执行，每个后台命令会分配一个工作号，
# 命令既然可以执行，就会有进程产生，所以也会有进程号。
tar -zcf etc.tar.gz /etc &

# [工作号] 进程号
# 工作号：放入后台的顺序。

# 2.查看后台进程
# 使用jobs命令查看
# 可以看到我们刚刚放入后台正在运行的命令。
# 运行状态Running。
jobs
# [1]+  Running                 tar -zcf etc.tar.gz /etc &

# 3.放入后台的命令执行完成后，会给你提示。
# 如果下面信息在终端上出现：
# 证明后台这个任务已经完成了，当然命令如果有执行结果的话，也会显示到操作终端上。
# [1]是这个命令的工作号，+号代表这个任务是最近一个被放入后台的工作。
[1]+  Done                    tar -zcf etc.tar.gz /etc
```

`<a name="IjF80"></a>`

### ② `ctrl+z` 在命令执行过程中按ctrl+z快捷键，命令在后台是暂停状态

使用这种方法放入后台的命令，就算是不和前台有交互，能在后台执行的命令，也是暂停状态。换句话说就是把一个服务先暂停，在放入后台。`<br />`ctrl+z快捷键就是暂停的快捷键。

```shell
# 还是上边打包etc目录
# 1.执行打包etc目录命令，然后快速按下ctrl+z
# 执行的过程中，按下ctrl+z快捷键
# 该tar命令被放入后台，工作号是1，状态是暂停。
[1]+  Stopped                 tar -zcf etc.tar.gz /etc

# 2.这个时候查看后台运行的进程
# 可以看到该tar命令在后台是停止的状态，工作号是1。
jobs
[1]+  Stopped                 tar -zcf etc.tar.gz /etc
# 通过ps aux命令也可以看到该进程。可以看他该进程的状态是T，停止状态。
# 也就是说，执行这个命令的进程就会一直卡在这。
# 你可以强制把这个进程kill掉，也可以把该进程恢复到前台继续进行操作（下一点会说明）。

```

`<a name="X1Ib4"></a>`

## 三、后台管理命令

`<a name="d5Bri"></a>`

### ① `jobs` 查看后台的工作

```shell
jobs -l

# 参数说明
# 选项：
# -l：显示工作的进程号（PID）；
# -p：仅任务对应的显示进程号；
# -n：显示任务状态的变化；
# -r：仅输出运行状态（running）的任务；
# -s：仅输出停止状态（stoped）的任务。

# 实例
jobs
# [1]-  Stopped                 tar -zcf etc.tar.gz /etc
# [2]+  Stopped                 top

# 代-l选项查看
jobs -l
# [1]-  6853 停止                  tar -zcf etc.tar.gz /etc
# [2]+  6855 停止 (tty 输出)     top


```

`<a name="cEKSA"></a>`

### ② `fg %工作号` **将指定的命令调度到前台运行**

```shell
fg %工作号

# 参数：
# 	%工作号：%号可以省略，但是注意工作号和PID的区别

# 示例：
# 执行下面命令，会直接跳转到top命令的交互界面
fg %2
```

`<a name="QG75g"></a>`

### ③ `bg %工作号` 把后台暂停的工作恢复到后台执行

```shell
# 查看后台工作，可以看到tar命令是在后台停止状态
jobs -l
[1]+  6853 停止                  tar -zcf etc.tar.gz /etc

# 把后台暂停的工作恢复到后台执行
bg %1
[1]+ tar -zcf etc.tar.gz /etc &

# 查看后台工作，可以看到tar命令的状态是完成，
# 等一小下，在执行jobs查看后台工作，就会没有任何显示了。
# 证明后台停止的tar命令，已经在后台执行完成了。
jobs -l
[1]+  6853 Done                    tar -zcf etc.tar.gz /etc

```

> **重要提示：**
> 你也可以直接把终端关闭掉，这些通过该终端被放入后台的工作，也会消失。
> 当然这不是正确关闭后台工作的方式。还是应该正确终止后台工作之后，再关闭终端。

`<a name="XpGyG"></a>`

## 四、后台命令脱离登录终端运行

`<a name="rUy1P"></a>`

### ① 常见方法

我们已经知道把命令放入后台，只能在当前登录终端执行。`<br />`那如果我是远程管理的服务器，在远程终端中执行了后台命令，这时我退出登录，这个后台命令就不能继续执行了，这个后台命令会被终止。`<br />`但是我们确实需要在远程终端中执行某些后台命令，使这些命令在关闭终端的时候，也能够继续执行（之前的&做不到）。`<br />`**该如何执行呢？**

- 第一种方法是把需要后台执行的命令加入 `/etc/rc.local`文件，让系统在启动时执行这个后台程序。`<br />`这种方法的问题是，服务器时不能随便重启的，万一有临时后台任务，服务器不能重启，就不能执行。
- 第二种方法是使用系统定时任务，让系统在指定的时间执行某个后台命令。`<br />`这样放入后台的命令与终端无关，是不依赖登录终端的。
- 第三种方法是使用 `nohup`命令（日常开发测试使用比较多）`<br />nohup`命令的作用就是让后台工作在离开操作终端时，也能够正确的在后台执行。

如果让程序始终在后台执行，即使关闭当前的终端也执行，这时候需要nohup。

`<a name="VXUVx"></a>`

### ② `nohup Command [Arg …] [&]`：nohup语法

**语法解释**

- 在默认情况下（非重定向时），会输出一个名叫 nohup.out 的文件到当前目录下。
- 如果当前目录的 nohup.out 文件不可写，输出重定向到 `$HOME/nohup.out`（$HOME为用户主目录）文件中。
- 如果没有文件能创建或打开以用于追加，那么 Command 参数指定的命令不可调用。

**参数说明**

- Command：要执行的命令。
- Arg：一些参数，可以指定输出文件。
- &：让命令在后台执行，终端退出后命令仍旧执行。

**示例**

```shell
# nohup [命令] &

# 示例：
# 用find命令，打印/下所有文件，放入后台执行。
nohup find / -print > /root/file.log &
[3] 23496
# nohup：忽略输入并把输出追加到"nohup.out"
```

`<a name="LrnJG"></a>`

## 五、其他常用命令对比

`<a name="Ojxl1"></a>`

### ① `PS` 用于查看当前系统运行的进程信息

**常用选项：**

- a ： 显示所有程序
- x ：显示所有程序，不区分终端机
- u ：以用户为主的格式来显示
- -f 显示程序间的关系
- -e 显示所有程序

**常用组合 :**`<br />ps aux `观察系统所有的进程数据`<br />ps -ef `显示所有进程基本信息（比aux较简略一些）

```shell
# nohup ./my.sh &
[1] 2179

# nohup: ignoring input and appending output to `nohup.out'

# 查看包含my.sh进程的信息
ps aux | grep my.sh  
root       2179  0.0  0.1 106072  1332 pts/0    S    21:06   0:00 /bin/bash ./my.sh
root       2184  0.0  0.0 103256   872 pts/0    S+   21:07   0:00 grep my.sh

# 查看当前系统所有正在执行进程的前5条
ps aux | head -5  
USER        PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root          1  0.0  0.1  19232  1424 ?        Ss   10:08   0:01 /sbin/init
root          2  0.0  0.0      0     0 ?        S    10:08   0:00 [kthreadd]
root          3  0.0  0.0      0     0 ?        S    10:08   0:00 [migration/0]
root          4  0.0  0.0      0     0 ?        S    10:08   0:00 [ksoftirqd/0]

```

> 上述输出的含义：
> USER：该 process 所属的使用者。
> PID ：该 process 的进程标识符。
> %CPU：该 process 使用掉的 CPU 资源百分比。
> %MEM：该 process 所占用的物理内存百分比。
> VSZ ：该 process 使用掉的虚拟内存量 (Kbytes) 。
> RSS ：该 process 占用的物理的内存量 (Kbytes) 。
> TTY ：该 process 是在哪个终端机上面运作，若与终端机无关则显示 ?。另外，tty1-tty6 是本机上面的登入者程序，若为 pts/0 等，则表示为由网络连接进主机的程序。
> STAT：该进程目前的状态，状态显示与ps -l的 S 旗标相同 (R/S/D/T/Z)
> START：该 process 被触发启动的时间
> TIME ：该 process 实际使用 CPU 运作的时间。
> COMMAND：该程序的实际命令

`<a name="c8i7G"></a>`

### ② `kill` 用于杀死进程

主要有两个选项：

- kill -9 pid （见人就杀，不做善后工作）
- kill -15 pid （调用destory等方法善后）

**优先使用 -15选项，因为-15温柔一些，会做一些善后的处理（比如释放所占用的资源）**`<br />`**如果使用-15无法杀死进程，再用-9 选项**`<br />`一般情况下，先用ps命令查找要杀死进程的pid，再用kill命令杀死进程`<br />`例如：

```shell
sleep 30 &
[1] 2194

ps -aux | grep sleep
Warning: bad syntax, perhaps a bogus '-'? See /usr/share/doc/procps-3.2.8/FAQ
root       2194  0.0  0.0 100916   620 pts/0    S    21:16   0:00 sleep 30
root       2196  0.0  0.0 103256   864 pts/0    S+   21:16   0:00 grep sleep
```

`<a name="Sjb6a"></a>`

### ③ `&`、 `&&`、 `;`、`||` 运算符对比

```shell
# case 1:  运算符：&
# 三个命令同时执行：command1 和 command2 后台执行(异步)，command 3前台执行 
command1 & command2 & command3

# case 2: 运算符：;
# 不管前面命令执行成功没有，后面的命令继续执行; 串行执行；
command1; command2; command3

# case 3: 运算符 &&
# 只有前面命令执行成功，后面命令才继续执行
command1 && command2

# case 4; 同时使用 &  和 &&
# 并不是并发执行command1和command2后再执行command3
# 而是并发执行command1和command2 && command3
command1 & command2 && command3

# case5: 
# ||则与&&相反。如果||左边的命令（命令1）未执行成功，那么就执行||右边的命令（命令2）；
# 或者换句话说，“如果这个命令执行失败了||那么就执行这个命令。
command1 || command2
```
