import { CloudTasksClient } from '@google-cloud/tasks'
import { credentials } from '@grpc/grpc-js'
;(async () => {
  const sslCreds = credentials.createInsecure()

  const client = new CloudTasksClient({
    port: 9090,
    servicePath: 'localhost',
    sslCreds,
  })

  const parent = 'projects/my-sandbox/locations/us-central1'
  const queueName = `${parent}/queues/test`

  try {
    await client.createQueue({ parent, queue: { name: queueName } })
    await client.createTask({
      parent: queueName,
      task: { httpRequest: { httpMethod: 'POST', url: 'http://localhost:8080' } },
    })
  } catch (err: unknown) {
    console.log('%d', err)
    console.log('fail')
  } finally {
    console.log('done process')
  }
})()
