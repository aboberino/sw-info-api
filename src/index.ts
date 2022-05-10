import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'

import v1WorkoutRouter from './v1/routes/userRoutes'

const app = express()
const PORT = process.env.SERVER_PORT || 8081

app.use(bodyParser.json())
app.use('/api/v1/users', v1WorkoutRouter)

app.listen(PORT, () => {
  console.log(`⚡️ Server listening on port ${PORT}`)
})
