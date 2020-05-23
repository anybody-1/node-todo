
const db = require('./db.js')
const inquirer = require('inquirer');
module.exports.add = async (title) => {
  let list = await db.read()
  list.push({
    title,
    done: false
  })
  await db.write(list)
}
module.exports.clear = async (title) => {
  await db.write([])
}
module.exports.showAll = async (title) => {
  const list = await db.read()
  printTasks(list)
}
function printTasks(list) {
  inquirer.prompt({
    type: 'list',
    name: 'index',
    message: '请选择你要操作的任务',
    choices: [{ name: '退出', value: -1 }, ...list.map((task, index) => {
      return {
        name: `${task.done ? '[x]' : '[_]'} ${index + 1} - ${task.title}`, value: index.toString()
      }
    }), { name: '创建新任务', value: -2 }]
  }).then(answer => {
    const index = parseInt(answer.index)
    if (index >= 0) {
      return askForAction(list, index)
    }
    if (index === -2) {
      createNewAsk(list)
    }

  })
}
function askForAction(list, index) {
  const actionList = { done, unDone, changeTitle, deleteAsk }
  inquirer.prompt({
    type: 'list',
    name: 'action',
    message: '请选择操作',
    choices: [{ name: '退出', value: 'quite' }, { name: '已完成', value: 'done' }, { name: '未完成', value: 'unDone' }, { name: '改标题', value: 'changeTitle' }, { name: '删除', value: 'deleteAsk' }]
  }).then(answer => {
    actionList[answer.action] && actionList[answer.action](list, index)

  })
}
function done(list, index) {
  list[index].done = true
  db.write(list)
}
function unDone(list, index) {
  list[index].done = false
  db.write(list)
}
function changeTitle(list, index) {
  inquirer.prompt({
    type: 'input',
    name: 'title',
    message: '请输入新名称'
  }).then(answer => {
    list[index].title = answer.title
    db.write(list)
  })
}
function deleteAsk(list, index) {
  list.splice(index, 1)
  db.write(list)
}
function createNewAsk(list) {
  inquirer.prompt({
    type: 'input',
    name: 'title',
    message: '请输入标题'
  }).then(answer => {
    list.push({
      title: answer.title,
      done: false
    })
    db.write(list)
  })
}