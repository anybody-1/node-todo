const db = require('../db.js')
const fs = require('fs')
jest.mock('fs')

describe('db', () => {
  afterEach(() => {
    fs.clearMocks()
  })
  it('read', async () => {
    const data = [{ title: 'lv', done: false }]
    fs.setReadFileMock('/lv', null, JSON.stringify(data))
    const list = await db.read('/lv')
    expect(list).toStrictEqual(data)
  })
  it('write', async () => {
    let file
    fs.setWriteFileMock('/lsy', (path, data, callback) => {
      file = data
      callback(null)
    })
    const list = [{ title: '上课', done: true }, { title: '游戏', done: true }]
    await db.write(list, '/lsy')
    expect(file).toBe(JSON.stringify(list))
  })
})