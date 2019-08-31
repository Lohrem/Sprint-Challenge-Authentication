const request = require('supertest')
const server = require('./server.js')

describe('server.js', () => {
  describe('GET /', () => {
    it('should return a JSON object', async () => {
      const res = await request(server).get('/api/jokes')
      expect(res.type).toBe('application/json')
    })
  })
})