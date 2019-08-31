const request = require('supertest')
const server = require('./server.js')

describe('server.js', () => {
  describe('GET /', () => {
    it('should return 400 OK', async () => {
      const res = await request(server).get('/api/jokes/')
      expect(res.status).toBe(400)
    })

  })

})
