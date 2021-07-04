const request = require('supertest')
const server = require('./server.js')
const db = require('../database/dbConfig.js')
describe('GET /', () => {
  it('should return a JSON object', async () => {
    const res = await request(server).get('/api/jokes')
    expect(res.type).toBe('application/json')
  })
})

describe('server.js', () => {
  describe('POST /', () => {
    beforeEach(async () => {
      await db("users").truncate()
    })
    it('should return 201 code', () => {
      return request(server).post('/api/auth/register').send({
          username: 'bruce',
          password: 'wayne'
        })
        .then(res => {
          expect(res.status).toEqual(201)
        })
        .catch(err => {
          console.log(err)
        })
    }, 7500)
  })

})