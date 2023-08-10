
// ==========> requerimos los modulos para trabajar
const path = require("path");
const express = require("express");
const app = express();
const validarRegister = false;

// ==========> creamos la ruta a los archivos estaticos 
app.use(express.json());
app.use ('/', express.static(__dirname + '/public'))

app.get("/",(req,res)=>{
    res.sendFile(path.resolve(__dirname, "./views/home.html"))
})

// FORMULARIO LOGIN 

app.get("/login", (req,res) => {
    let htmlPath = path.resolve(__dirname, "./views/login.html");
    res.sendFile(htmlPath)
})

app.post("/login", (req, res) => {
    res.redirect("/");
})

// FORMULARIO REGISTER

app.get("/register", (req,res) => {
    let htmlPath = path.resolve(__dirname, "./views/register.html");
    res.sendFile(htmlPath)
})


app.post("/register", (req, res) => {
    res.redirect("/");
})



// ==========> creamos el servidor y le pasamos un mensaje para verificar su funcionalidad

const port = process.env.PORT || 3001;
app.listen(port,() => console.log("Servidor corriendo en el puerto 3001"));

