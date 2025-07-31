
// base de datos quemada

let db = [];

function agregar(data) {
    db.push(data);
    console.log("usuario agregado: ", data.nombre)
}

function buscar(usuario, nombreUsuario) {
    const resultado = db.find(item => item[usuario] === nombreUsuario)

    
    console.log("resultado: ", resultado);
    return resultado; 
}

module.exports = db;