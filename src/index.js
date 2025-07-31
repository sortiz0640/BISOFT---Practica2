const express = require('express');
const session = require('express-session')
const app = express();
const path = require('path');
const db = require('../src/db');

app.set('views', path.join(__dirname,'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine','ejs');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.listen(3000,()=>{
    console.log("Se conecto el puerto");
})

// Rutas
app.get('/',(req,res)=>{
    res.render("login");
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

app.get('/usuario-nuevo', (req, res) => {

    const data = {
        usuario: req.body.usuario,
        correo: req.body.correo,
        contrasena: req.body.contrasena
    }

    db.agregar(data);
    res.render('dashboard');
});

app.get('/usuario-buscar', (req, res) => {

    const data = {
        usuario: req.body.usuario,
        contrasena: req.body.contrasena
    }

    db.agregar(data);
    res.render('dashboard');
});