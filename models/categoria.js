var connection = require('../connection');

const Categoria = connection.Categoria;

let categoriaModel = {};

categoriaModel.getAll = (callback) => {
    Categoria.findAll().then(result => {
        callback(null, result);
    });
};


categoriaModel.insert = (data, callback) => {
    Categoria.create({
        nombre: data.nombre
    }).then(result => {
        callback(null, result.get());
    });
};

categoriaModel.update = (data, callback) => {
    Categoria.findById(data.id).then(obj => {
        obj.updateAttributes({
            nombre: data.nombre
        }).then(result => callback(null, result.get()));
    });
};

categoriaModel.delete = (id, callback) => {
    Categoria.findById(id).then(obj => {
        obj.destroy().then(result => callback(null, result.get()));
    });
};

categoriaModel.findById = (id, callback) => {
    Categoria.findById(id).then(result => {
        callback(null, result);
    });
}

module.exports = categoriaModel;