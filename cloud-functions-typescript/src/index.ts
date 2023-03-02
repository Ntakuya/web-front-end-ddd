import * as ff from '@google-cloud/functions-framework'
import type { Request, Response } from '@google-cloud/functions-framework'
import { typescriptFunctionHandler } from './handlers/typescript-function-handler'

ff.http('typescriptFunction', async (req: Request, res: Response) => {
  const result = await typescriptFunctionHandler()
  res.send({ result })
})
