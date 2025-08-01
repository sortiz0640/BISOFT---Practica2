const express = require('express');
const session = require('express-session')
const app = express();
const path = require('path');
const db = require('./db');

app.set('views', path.join(__dirname,'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine','ejs');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

// express-session configuracion 
app.use(session( {
    secret: "epicmonekydriving$$$$12312311",
    resave: false,
    saveUninitialized: false
}));

app.listen(3000,()=>{
    console.log("Se conectó el puerto 3000");
    console.log("http://localhost:3000");
})

// middleware

const encriptarRuta = (req, res, next) => {
  if (req.session.usuario) {
    next();
  } else {
    res.render('login', { error: "Por favor, inicia sesión para continuar"});
  }
};


// Rutas
app.get('/', (req,res)=>{
    if (req.session.usuario) {
        res.render('dashboard', { usuario: req.session.usuario });
    } else {
        res.render("login", { error: null});
    }
});

app.get('/register', (req, res) => {
        if (req.session.usuario) {
        res.render('dashboard', { usuario: req.session.usuario });
    } else {
        res.render("register", { error: null});
    }
});

app.get('/dashboard', encriptarRuta, (req, res) => {
    res.render('dashboard', { usuario: req.session.usuario });
});

app.post('/usuario-nuevo', (req, res) => {

    const data = {
        usuario: req.body.usuario,
        correo: req.body.correo,
        contrasena: req.body.contrasena
    }

    const estado = db.agregar(data);
    if (estado) {
        res.render('login', { error: "Por favor, inicia sesión para continuar"});
    } else {
        res.render('register', { error: "El usuario ya se encuentra registrado"});
    }
});

app.post('/usuario-buscar', (req, res) => {
    
    const { usuario, contrasena} = req.body;
    const existeUsuario = db.buscar(usuario, contrasena);

    if (existeUsuario) {
        req.session.usuario = existeUsuario.usuario;
        res.render('dashboard', { usuario: existeUsuario.usuario }); 
        
    } else {
        res.render('login', { error: "Credenciales inválidas. Intente nuevamente." });
    }
}); 

app.post("/usuario-cerrar", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log("Error al cerrar sesión:", err);
        } else {
            res.render('login', { error: "Sesión cerrada. Ingresa tus credenciales para ingresar nuevamente." });
        }
    });
});