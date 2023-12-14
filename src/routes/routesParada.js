import express from 'express'

import { getAll, getParadasPorLineaSentido, getParadasPorNombre, 
    getParadasCercanas, getUbicacion } from '../controllers/paradaController.js'

const routerParadas = express.Router()

routerParadas.get('/', getAll)
routerParadas.put('/linea/', getParadasPorLineaSentido)
routerParadas.put('/nombre/', getParadasPorNombre)
routerParadas.put('/cercanas/', getParadasCercanas)
//router.get('/ubicacion/:direccion', getUbicacion)
routerParadas.get('/ubicacion/', getUbicacion)


export default routerParadas