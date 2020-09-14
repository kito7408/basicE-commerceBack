var connection = require('../connection');

const UserType = connection.UserType;

let typeModel = {};

typeModel.getAll = (callback) => {
    UserType.findAll().then(result => {
        callback(null, result);
    });
};


typeModel.insert = (data, callback) => {
    UserType.create({
        nombre: data.nombre
    }).then(result => {
        callback(null, result.get());
    });
};

typeModel.update = (data, callback) => {
    UserType.findById(data.id).then(obj => {
        obj.updateAttributes({
            nombre: data.nombre
        }).then(result => callback(null, result.get()));
    });
};

typeModel.delete = (id, callback) => {
    UserType.findById(id).then(obj => {
        obj.destroy().then(result => callback(null, result.get()));
    });
};

typeModel.findById = (id, callback) => {
    UserType.findById(id).then(result => {
        callback(null, result);
    });
}

module.exports = typeModel;