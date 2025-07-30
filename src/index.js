//Utilizar express
const express = require('express');
const session = require('express-session')

const app = express();

const path = require('path');

app.set('views', path.join(__dirname,'views')); //Le decimos a express donde están nuestras vistas
app.engine('html', require('ejs').renderFile);//html usando ejs
app.set('view engine','ejs');//configurando ejs como el motor de plantillas predeterminado
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));


//Encender el servidor
app.listen(3000,()=>{
    console.log("Se conecto el puerto");
})

//Rutas
app.get('/',(req,res)=>{
    res.render("login");
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.get('/dashborad', (req, res) => {
    res.render('dashboard')
})