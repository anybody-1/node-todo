# node-todo

该程序实现了 node cli，通过命令行实现新建、编辑、删除任务。
涉及技术栈为 `commander`实现命令完整界面 `inquirer`实现交互

## 使用方法

1.安装

```
npm install -g node-todo-lsy
```

或者

```
yarn global add node-todo-lsy
```

2.使用
`t`命令查看当前任务，并可选择创建新任务

```
t
```

![命令效果图](http://ww1.sinaimg.cn/large/0067zCCtly1gf2u8xy8eoj30bk04ljrc.jpg)

3.直接添加任务

```
t add <taskName>
```

4.清空任务

```
t clear
```
