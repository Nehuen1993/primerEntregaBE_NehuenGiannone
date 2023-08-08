const express = require("express")
const productosRouter = require("./src/routes/productos.router.js")
const carritoRouter = require("./src/routes/carrito.router.js")
const path = require('path')

const app = express()
const PORT = 8080

app.use((express.json()))
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', productosRouter)
app.use('/', carritoRouter)



app.listen (PORT, () => {
    console.log (`Servidor escuchando en el puerto ${PORT}`)
})
