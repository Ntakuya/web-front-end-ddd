import { typescriptFunctionHandler } from '../../src/handlers/typescript-function-handler'

describe('typescriptFunctionHandler', () => {
  it('should return string', async () => {
    const result = await setup()
    expect(result).toBe('file changed!!')
  })
})

async function setup() {
  return await typescriptFunctionHandler()
}
