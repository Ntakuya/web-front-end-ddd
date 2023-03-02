import { CloudTasksClient } from '@google-cloud/tasks'
import { credentials } from '@grpc/grpc-js'

export const typescriptFunctionHandler = async () => {
  return 'file changed!!'
}
