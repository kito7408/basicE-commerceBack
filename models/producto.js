var connection = require('../connection');
var Sequelize = require('sequelize');
var Op = Sequelize.Op;

const Producto = connection.Producto;

let productoModel = {};

productoModel.getAll = (callback) => {
    Producto.findAll({
        attributes: ['id', 'nombre', 'descripcion', 'precio', 'imagen', ['categoriumId', 'categoriaId']]
    }).then(result => {
        callback(null, result);
    });
};


productoModel.insert = (data, callback) => {
    Producto.create({
        nombre: data.nombre,
        imagen: data.imagen,
        descripcion: data.descripcion,
        precio: data.precio,
        categoriumId: data.categoriumId
    }).then(result => {
        callback(null, result.get());
    });
};

productoModel.update = (data, callback) => {
    Producto.findById(data.id).then(obj => {
        obj.updateAttributes({
            nombre: data.nombre,
            imagen: data.imagen,
            descripcion: data.descripcion,
            precio: data.precio,
            categoriumId: data.categoriumId
        }).then(result => callback(null, result.get()));
    });
};

productoModel.delete = (id, callback) => {
    Producto.findById(id).then(obj => {
        obj.destroy().then(result => callback(null, result.get()));
    });
};

productoModel.findById = (id, callback) => {
    Producto.findOne({
        attributes: ['id', 'nombre', 'descripcion', 'precio', 'imagen', ['categoriumId', 'categoriaId']],
        where:{
            id: id
        }
    }).then(result => {
        callback(null, result);
    });
};

productoModel.findByCategoria = (id, callback) => {
    Producto.findAll({
        attributes: ['id', 'nombre', 'descripcion', 'precio', 'imagen', ['categoriumId', 'categoriaId']],
        where:{
            categoriumId: id
        }
    }).then(result => {
        callback(null, result);
    });
}

productoModel.findBySearch = (searchText, callback) => {
    console.log(searchText);
    Producto.findAll({
        attributes: ['id', 'nombre', 'descripcion', 'precio', 'imagen', ['categoriumId', 'categoriaId']],
        where:{
            nombre: {
                [Op.like]: '%' + searchText + '%'
            }
        }
    }).then(result => {
        callback(null, result);
    });
}

module.exports = productoModel;