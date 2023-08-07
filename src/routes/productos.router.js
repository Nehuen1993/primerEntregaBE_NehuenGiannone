const express = require("express")
const { ProductManager } = require("../funciones/productos.js");
const router = express.Router()


const arrayProductos = []

router.get('/api/productos', async (req, res) => {

    const limit = parseInt(req.query.limit)

    const mostrarProductos = async () => {
        const productos = new ProductManager("productos.txt")
        const listaProductos = await productos.getProducts()
        const cantidad = listaProductos.length;

        if (listaProductos.length === 0) {
            res.json (arrayProductos)
        }
        else if (isNaN(limit)) {
           
            res.json(listaProductos)   
        } 
        else if (( limit >0 && limit < cantidad)) {
            res.json(listaProductos.slice(0, limit))
        }
        else{
            res.send ("no hay esa cantidad de productos")
        }
       
    };

    mostrarProductos();
});

router.get ('/api/productos/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const producto = new ProductManager("productos.txt")
    const producto_existe = await producto.getById(id)

    if (!producto_existe) {
        res.status(404).json({ message: "Producto no encontrado" });
    } else {
        res.send(producto_existe);
    }
    
})
router.post('/api/productos', async (req, res) => {
    
    const producto = req.body
    const productoUpdate = new ProductManager("productos.txt")
    await productoUpdate.addProduct(producto) 

            res.json (producto)           
        })

router.put('/api/productos/:id', async (req, res) => {
            const id = parseInt(req.params.id)
            const producto = req.body
            const nuevoProducto = new ProductManager("productos.txt")
            await nuevoProducto.updateProduct(id, producto) 
        
                    res.json (producto)           
                })
        


router.delete ('/api/productos/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const producto = new ProductManager("productos.txt")
    await producto.deleteProductById(id) 
    res.send ("Se elimino el producto con el ID: " + id)
            
    })


module.exports =  router
  
