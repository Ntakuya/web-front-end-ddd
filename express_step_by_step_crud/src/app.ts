import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

const app = express()

app.use(morgan('combined'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/health', (_, res) => {
  res.send('health')
})

app.listen(3001, () => {
  console.log('Server is running')
})
