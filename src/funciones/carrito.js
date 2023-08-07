const fs = require('fs');
const util = require('util');

class CarritoManager {
    constructor(productos) {
        this.productos = productos;
    }

async getProducts() {
        try {
            const products = await this.readProducts();
            return products;
        }
        catch (error) {
            throw new error ("getProducts - Error");
        }
   }


    async addProduct(pid) {
        
        try {
            const productos = await this.readProducts();
            const producto_cid = productos.length > 0 ? productos[productos.length - 1].cid : 0;
            const nuevoProducto_cid = producto_cid + 1;
            const producto = {
                cid: nuevoProducto_cid,
                producto: {
                        pid:1,
                        cantidad:1,
                        status: true,
           },
              
            };
            productos.push(producto);
            await this.writeProducts(productos);
            return nuevoProducto_cid;
        } catch (error) {
            console.error("Error en addProduct:", error);
            throw new Error("addProduct - Error");
        }
    }


      

    
    async getById (producto_id){
        try{
        const productos = await this.readProducts();
        const producto_existe = productos.find(producto => producto.cid === producto_id);
        if(!producto_existe) {
            
            console.log ( "getByid - Producto no existe");
            return;
        } else {
            console.log ("getByid - Producto existente y es", producto_existe);
            return producto_existe; 
        }
    }
    catch (error) {
        throw new Error ("getById - Error");
    }
    }

    async updateProduct(cid, pid) {
        try {
            const productos = await this.readProducts();
            const producto_cid = productos.find(producto => producto.cid === cid);
            const producto_pid = productos.find(producto => producto.producto.pid === pid);
            console.log(producto_pid);


    
            if (!producto_cid) {
                console.log("updateProduct - Producto no existe");
    

            } else {

                if (producto_pid) {
                    await this.updateCantidad(cid, pid);
                    console.log ("voy a actualizar la cantdad")
                }else {
                    const newProduct = {
                    cid: cid,
                    producto: {
                        pid: pid,
                        cantidad: 1,
                        status: true
                    }
                };
                productos.push(newProduct);
                console.log("producto  agregado");
                }
    
                
            }
    
            await this.writeProducts(productos);
            return productos;
        } catch (error) {
            throw new Error("updateProduct - Error");
        }
    }
    
    async updateCantidad(cid, pid) {
        const productos = await this.readProducts();
        const producto_index = productos.findIndex(producto => producto.cid === cid && producto.producto.pid === pid)
        productos[producto_index].producto.cantidad ++
        const newCantidad = productos[producto_index].producto
        console.log("el producto con la nueva cantidad es", newCantidad)
        productos.push(newCantidad);
        await this.writeProducts(productos)
    
    }


async readProducts() {
    const filePath = 'carrito.txt';

    try {
        if (!fs.existsSync(filePath)) {
            const initialData = [];
            fs.writeFileSync(filePath, JSON.stringify(initialData), 'utf8');
        }

        const readFileAsync = util.promisify(fs.readFile);
        const productos = await readFileAsync(filePath, 'utf8');
        return productos ? JSON.parse(productos) : [];
    } catch (error) {
        console.error("Error en readProducts:", error);
        throw new Error("readProducts - Error");
    }
}

async writeProducts(productos) {
    try {
        const jsonArray = JSON.stringify(productos, null, 2);
        await fs.promises.writeFile('carrito.txt', jsonArray);
    } catch (error) {
        console.error("Error en writeProducts:", error);
        throw new Error("writeProducts - Error");
    }
}

}
module.exports = {
    CarritoManager,
  };




