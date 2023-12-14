import express from 'express'
import morgan from 'morgan'
import routerParadas from './routes/routesParada.js'
import routerEntidad from './routes/routesLogin.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/paradas/', routerParadas)
app.use('/entidades/', routerEntidad)

export default app;