const supertest = require('supertest')
const app = require('../app')
const expectedResponse = require('./fixtures/answers-expected.json')

jest.mock('axios', () => {
  const fixedResponse = require('./fixtures/answers.json')
  return {
    get (url) {
      return Promise.resolve({
        data: fixedResponse
      })
    }
  }
})

describe('/answers Endpoint', () => {
  it('GET /answers', async () => {
    const response = await supertest(app)
      .get('/answers')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(expectedResponse)
  })
})
