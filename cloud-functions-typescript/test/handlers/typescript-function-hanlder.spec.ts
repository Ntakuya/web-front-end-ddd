import { typescriptFunctionHandler } from '../../src/handlers/typescript-function-handler'

describe('typescriptFunctionHandler', () => {
  it('should return string', () => {
    const result = setup()
    expect(result).toBe('file changed!!')
  })
})

function setup() {
  return typescriptFunctionHandler()
}
