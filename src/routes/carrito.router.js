const express = require("express")
const { CarritoManager } = require("../funciones/carrito.js");
const router = express.Router()


const carrito = []

router.post('/api/carrito', async (req, res) => {
    
    const productoUpdate = new CarritoManager("carrito.txt")
   
    await productoUpdate.addProduct() 

            res.send ("producto agregado")        
        })

router.get ('/api/carrito/:cid', async (req, res) => {

    const id = parseInt(req.params.cid)
    const producto = new CarritoManager("carrito.txt")
    const producto_existe = await producto.getById(id)
        
            if (!producto_existe) {
                res.status(404).json({ message: "Producto no encontrado" });
            } else {
                res.json(producto_existe);
            }
            
        })
        router.post('/api/carrito/:cid/producto/:pid', async (req, res) => {
    
            const cid = parseInt(req.params.cid)
            const pid = parseInt(req.params.pid)
            const productoAgree = new CarritoManager("carrito.txt")
           
            await productoAgree.updateProduct(cid,pid) 
        
                    res.json (productoAgree)           
                })


module.exports =  router
