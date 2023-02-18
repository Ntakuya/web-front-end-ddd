import supertest from 'supertest'

describe('typescriptFunction', () => {
  it('should return 200', async () => {
    const { testServer } = await setup()
    await testServer.post('/').set('Content-Type', 'application/json').expect('file changed!!').expect(200)
  })
})

async function setup() {
  await import('../src/index')
  const { getTestServer } = require('@google-cloud/functions-framework/testing')
  const testServer = supertest(getTestServer('typescriptFunction'))
  return { testServer }
}
