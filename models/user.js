var connection = require('../connection');

const User = connection.User;

let userModel = {};

userModel.getAll = (callback) => {
    User.findAll().then(users => {
        callback(null, users);
    });
};


userModel.insert = (data, callback) => {
    User.create({
        nombre: data.nombre,
        username: data.username,
        password: data.password,
        userTypeId: data.userTypeId
    }).then(result => {
        callback(null, result.get());
    });
};

userModel.update = (data, callback) => {
    User.findById(data.id).then(user => {
        user.updateAttributes({
            nombre: data.nombre,
            username: data.username,
            password: data.password,
            userTypeId: data.userTypeId
        }).then(result => callback(null, result.get()));
    });
};

userModel.delete = (id, callback) => {
    User.findById(id).then(user => {
        user.destroy().then(result => callback(null, result.get()));
    });
};

userModel.findById = (id, callback) => {
    User.findById(id).then(user => {
        callback(null, user);
    });
}

userModel.login = (userData, callback) => {
    User.findOne({
        where:{
            username: userData.username,
            password: userData.password
        }
    }).then(result => {
        callback(null, result);
    });
}

module.exports = userModel;