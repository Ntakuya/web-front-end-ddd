import * as ff from '@google-cloud/functions-framework'
import type { Request, Response } from '@google-cloud/functions-framework'
import { typescriptFunctionHandler } from './handlers/typescript-function-handler'

ff.http('typescriptFunction', (req: Request, res: Response) => {
  const result = typescriptFunctionHandler()
  res.send(result)
})
