const fs = require('fs');
const util = require('util');

class ProductManager {
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


    async addProduct(productoData) {
        const { nombre, descripcion, code, precio, stock, category, img} = productoData
        try {
            const productos = await this.readProducts();
            const producto_id = productos.length > 0 ? productos[productos.length - 1].pid : 0;
            const nuevoProducto_id = producto_id + 1;
            const producto = {
                pid: nuevoProducto_id,
                nombre,
                descripcion,
                code,
                precio,
                status: true,
                stock,
                category,
                img,
              
            };
            productos.push(producto);
            await this.writeProducts(productos);
            return nuevoProducto_id;
        } catch (error) {
            console.error("Error en addProduct:", error);
            throw new Error("addProduct - Error");
        }
    }
    
    async getById (producto_id){
        try{
        const productos = await this.readProducts();
        const producto_existe = productos.find(producto => producto.pid === producto_id);
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

    async updateProduct(producto_id, productoData) {
        try{
        const { nombre, descripcion, code, precio, stock, category, img} = productoData
        const productos = await this.readProducts();
        const producto_existe = productos.find(producto => producto.pid === producto_id);
        if(!producto_existe) {
            console.log ("updateProduct - Producto no existe");
            return;
        } else {
            producto_existe.nombre = nombre;
            producto_existe.descripcion = descripcion;
            producto_existe.code = code;
            producto_existe.precio = precio;
            producto_existe.stock = stock;
            producto_existe.category = category;

            producto_existe.img = img;
                        
            await this.writeProducts(productos)
        }
    }
    catch (error) {
        throw new Error ("updateProduct- Error");
    }
}
async deleteProductById(producto_id) {
    try{

        let productos = await this.readProducts();
        const dontDelete = parseInt(producto_id); 
        const productosFiltrados = productos.filter(producto => producto.pid !== dontDelete);
        await this.writeProducts(productosFiltrados);
        
        
    }
    catch (error) {
        throw new Error ("deleteProductById -Error");
    }    
}

async readProducts() {
    const filePath = 'productos.txt';

    try {
        if (!fs.existsSync(filePath)) {
            // El archivo no existe, lo creamos con un array vacío en formato JSON.
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
        await fs.promises.writeFile('productos.txt', jsonArray);
    } catch (error) {
        console.error("Error en writeProducts:", error);
        throw new Error("writeProducts - Error");
    }
}

}
module.exports = {
    ProductManager,
  };




