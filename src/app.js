import express from 'express'
import morgan from 'morgan'
import routerEventos from './routes/routesEvento.js'
import routerEntidad from './routes/routesLogin.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/eventos', routerEventos)
app.use('/entidades', routerEntidad)

export default app;