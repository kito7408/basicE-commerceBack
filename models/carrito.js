var connection = require('../connection');

const Producto = connection.Producto;
const Carrito = connection.Carrito;

let carritoModel = {};

carritoModel.getAll = (callback) => {
    Carrito.findAll({
        include: [Producto]
    }).then(data => {
        callback(null, data);
    });
};


carritoModel.insert = (data, callback) => {
    Carrito.findOne({
        where: {
            userId: data.userId,
            productoId: data.productoId
        }
    }).then(obj => {
        if (obj) {
            obj.cantidad += data.cantidad;
            obj.precioTotal += data.precioTotal;
            obj.userId = data.userId;
            obj.productoId = data.productoId;
            obj.save().then(result => callback(null, result.get()));
        } else {
            Carrito.create({
                cantidad: data.cantidad,
                precioTotal: data.precioTotal,
                userId: data.userId,
                productoId: data.productoId
            }).then(result => {
                callback(null, result.get());
            });
        }
    });
};

carritoModel.update = (data, callback) => {
    Carrito.findOne({
        where: {
            id: data.id
        }
    }).then(obj => {
        obj.cantidad = data.cantidad;
        obj.precioTotal = data.precioTotal;
        obj.userId = data.userId;
        obj.productoId = data.productoId;
        obj.save().then(result => callback(null, result.get()));
    });
};

carritoModel.delete = (id, callback) => {
    Carrito.findOne({
        where: {
            id: id
        }
    }).then(obj => {
        obj.destroy().then(result => callback(null, result.get()));
    });
};

carritoModel.findById = (id, callback) => {
    Carrito.findOne({
        where: {
            id: data.id
        },
        include: [Producto]
    }).then(result => {
        callback(null, result);
    });
}

carritoModel.findByUser = (id, callback) => {
    Carrito.findAll({
        where: {
            userId: id
        },
        include: [Producto]
    }).then(result => {
        callback(null, result);
    });
}

module.exports = carritoModel;