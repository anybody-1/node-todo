const homePath = process.env.HOME || require('os').homedir()
const p = require('path')
const fs = require('fs')
const dbPath = p.join(homePath, '.todo')
const db = {
  read(path = dbPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, { flag: 'a+' }, (err, data) => {

        if (err) return reject(err)
        let list
        try {
          list = JSON.parse(data.toString())
        } catch{
          list = []
        }
        resolve(list)
      })
    })
  },
  write(list, path = dbPath) {
    return new Promise((resolve, reject) => {
      let string = JSON.stringify(list)
      fs.writeFile(path, string, err => {
        if (err) return reject(err)
        resolve()
      })
    })
  }
}
module.exports = db