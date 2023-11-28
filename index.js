import express from 'express'
import { readFile, writeFile  } from 'fs/promises' 


import productosRouter from './routes/productos.routes.js'
import vendedoresRouter from './routes/vendedores.routes.js'
import ventasRouter from './routes/ventas.routes.js'
const app = express()

const port = 3001

app.use(express.json());

app.listen(port, () =>{
    console.log(`Servidor levantado en puerto ${port}`)
})


app.use('/vendedores', vendedoresRouter)
app.use('/productos', productosRouter)
app.use('/ventas', ventasRouter)
