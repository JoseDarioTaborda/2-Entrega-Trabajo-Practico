import express from 'express'
import { readFile, writeFile  } from 'fs/promises' /*Codigo nuevo */
import dotenv from 'dotenv'

const app = express()

const port = 3005

app.use(express.json());

app.listen(port, () =>{
    console.log(`Servidor levantado en puerto ${port}`)
})


const file = await readFile('./JSON/vendedores.json', 'utf-8') /*Codigo nuevo */
const userData = JSON.parse(file) /*Codigo nuevo */

const objetos = [
    {name: 'Auto', color: 'Rojo'},
    {name:'Arbol', color:'Verde'},
    {name: 'Rio', color:'Azul'},
    {name: 'Casa', color: 'Amarillo'}
]

app.get('/', (req, res) => {
    res.send('Hola mundo!')
})

app.get('/colorDe/:objeto',(req,res)=>{
    const obj = req.params.objeto
    const result = objetos.find(e => e.name === obj)

    if(result){
        res.status(200).json(result)
    }else{
        res.status(400).json(`${obj} no se encuentra`)
    }
    
})

app.post('/ColorDePost', (req,res)=>{
    const obj = req.body.objeto
    const result = objetos.find(e => e.name === obj)

    if(result){
        res.status(200).json(result)
    }else{
        res.status(404).json(`${obj} no se encuentra`)
    }
})

app.get('/users/all', (req,res)=>{
    res.status(200).json(userData)
}) /*Codigo nuevo */