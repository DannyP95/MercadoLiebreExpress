// ==========> requerimos los modulos para trabajar
const path = require("path");
const express = require("express");
const app = express();
const validarRegister = false;

const homeRoute = require('./src/routes/home');


//EJS

app.set('view engine', 'ejs');

app.set('views', __dirname + './src/views');

//HOME

// app.get("/",(req,res)=>{
    //     res.render(path.resolve(__dirname, './src/views/home'))
// })

//JSON

app.use(express.json());

// ==========> creamos la ruta a los archivos estaticos 

app.use ('/', express.static(__dirname + '/public'))

app.use('/', homeRoute);





// FORMULARIO LOGIN 

app.get("/login", (req,res) => {
    res.render(path.resolve(__dirname, './src/views/login'));
})

app.post("/login", (req, res) => {
    res.redirect("/");
})

// FORMULARIO REGISTER

app.get("/register", (req,res) => {
    res.render(path.resolve(__dirname, './src/views/register'));
})


app.post("/register", (req, res) => {
    res.redirect("/");
})



// ==========> creamos el servidor y le pasamos un mensaje para verificar su funcionalidad

const port = process.env.PORT || 3001;
app.listen(port,() => console.log("Servidor corriendo en el puerto 3001"));

