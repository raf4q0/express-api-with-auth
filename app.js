import express from 'express'

// ==== Rutas ==== //
import usersRoutes from './src/routes/usersRoutes'
import postsRoutes from './src/routes/postsRoutes'
import registerRoutes from './src/routes/registerRoutes'
import sessiosRoutes from './src/routes/sessionsRoutes'

// ==== Middlewares ==== //
import errorHandler from './src/middlewares/errorHandler'
import jsonMiddleware from './src/middlewares/json'
import corsMiddleware from './src/middlewares/cors'
import loggerMiddleware from './src/middlewares/logger'

import { connectToDatabase } from './src/config/mongoose'

const app = express()

// Middlewares
app.use(
  jsonMiddleware,
  corsMiddleware,
  loggerMiddleware
)

// Routes
app.use(
  usersRoutes,
  postsRoutes,
  registerRoutes,
  sessiosRoutes
)

// Error middleware
app.use(errorHandler)

app.use((_, response) => {
  response.status(404).send({
    error: 'Endpoint no soportado!'
  })
})

//mongodb client
connectToDatabase()

app.get('/welcome', (_, res) => {
  res.status(200).json({ 
    response: 'Bienvenido a mi API de Koders' 
  })
})

export default app
