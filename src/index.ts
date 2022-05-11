import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'

import v1UserRouter from './v1/routes/userRoutes'
import v1CommandRouter from './v1/routes/commandRoutes'
import v1WizardRouter from './v1/routes/wizardRoutes'

const app = express()
const PORT = process.env.SERVER_PORT || 8081

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/v1/users', v1UserRouter)
app.use('/api/v1/commands', v1CommandRouter)
app.use('/api/v1/wizards', v1WizardRouter)


app.listen(PORT, () => {
  console.log(`⚡️ Server listening on port ${PORT}`)
})
