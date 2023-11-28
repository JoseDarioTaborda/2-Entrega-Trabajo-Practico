import { Router } from "express";
import { readFile, writeFile  } from 'fs/promises' 

const router = Router()

/* RUTAS DE ITEMS */

const fileItems = await readFile('./JSON/productos.json', 'utf-8') 
const itemsData = JSON.parse(fileItems) 

router.get('/byId/:id', (req, res)=>{
    const id = parseInt(req.params.id)

    const result = itemsData.find(e => e.id === id)

    if(result){
        res.status(200).json(result)
    }else{
        res.status(400).json(`${id} no se encuentra`)
    }
})

router.get('/byName/:name', (req, res)=>{
    const nombre = req.params.nombre

    const result = itemsData.find(e => e.nombre === nombre)

    if(result){
        res.status(200).json(result)
    }else{
        res.status(400).json(`${nombre} no se encuentra, intente con su ID`)
    }
})

router.get('/byDescuento/:descuento', (req, res)=>{
    const descuento = req.params.desc

    const result = itemsData.filter(e => e.desc === descuento)

    if(result){
        res.status(200).json(result)
    }else{
        res.status(400).json(`${descuento} no se encuentra, intente con su ID`)
    }
})

router.put('/changePrice', (req, res)=>{

    const id = req.body.id
    const newPrice = req.body.new_price
    const priceType = req.body.type_price

    try{
        const index = itemsData.findIndex(e => e.id === id)

        if(priceType == 1){
            itemsData[index].purchase_price = newPrice
        }else{
            itemsData[index].selling_price = newPrice
        }

        writeFile('./JSON/productos.json', JSON.stringify(userData,null,2));
        res.status(200).json('Producto modificado')

    }catch(error){
        res.send(500).json('Error al actualizar el producto')
    }
})

export default router