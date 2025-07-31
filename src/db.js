
// base de datos quemada

let db = [{usuario: "admin", correo: "sortiz0640@gmail.com", contrasena: "admin"}];

function agregar(data) {
    const usuarioExistente = db.find(usuario => usuario.usuario === data.usuario);

    if (usuarioExistente) {
        return false; 
    }

    db.push(data);
    return true; 
}



function buscar(usuario, contrasena) {
    const resultado = db.find(item =>
        item.usuario === usuario && item.contrasena === contrasena
    );

    return resultado;
}

module.exports = {agregar, buscar}