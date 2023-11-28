import { Router } from "express"
import { readFile, writeFile  } from 'fs/promises' 
import { get_user_byId } from "../utils/user.js"
/* RUTAS DE USUARIOS */

const fileUsers = await readFile('./JSON/vendedores.json', 'utf-8') 
const userData = JSON.parse(fileUsers) 

const router = Router()

router.post('/login', (req, res)=>{
    const userName = req.body.username
    const pass = req.body.pass
  
    const result = userData.find(e => e.username === userName && e.pass === pass)
    if(result){
        res.status(200).json(`Bienvenido ${result.name}`)
    }else{
        res.status(400).json(`${userName} no se encuentra`)
    }
})

router.get('/byId/:id', (req, res)=>{
    const id = parseInt(req.params.id)
    const result = get_user_byId(id)

    if(result){
        res.status(200).json(result)
    }else{
        res.status(400).json(`${id} no se encuentra`)
    }
})

/* users/users/byId/:id */


export default router