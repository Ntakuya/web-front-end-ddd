import * as ff from '@google-cloud/functions-framework'
import type { Request, Response } from '@google-cloud/functions-framework'

ff.http('TypescriptFunction', (req: Request, res: Response) => {
  res.send('file chanegd!!')
})
