#!/usr/bin/env node
const { program } = require('commander');
const api = require('./index.js')
const pak = require('./package.json')
if (process.argv.length === 2) {
  api.showAll()
} else {
  program
    .option('add <task>', '添加一个任务')
  program
    .version(pak.version)
  program
    .command('add')
    .description('add a task')
    .action((source, destination) => {
      if (!destination) { return console.log('请按照格式输入-add <任务名称>') }
      let words = destination.join(' ')
      api.add(words).then(() => console.log('添加成功'), () => console.log('添加失败'))
    });
  program
    .command('clear')
    .description('clear all tasks')
    .action((source, destination) => {
      api.clear().then(() => console.log('清除成功'), () => console.log('清除失败'))
    });
  program.parse(process.argv);
}







