var Sequelize = require('sequelize');

// var connection = new Sequelize('testSONR', 'root', 'root', {
// 	dialect: 'mysql',
// 	operatorsAliases: false,
// });

var connection = new Sequelize('heroku_d8acfddee765193', 'bc95bc2b44d16d', 'b19a7702', {
	host: 'us-cdbr-east-02.cleardb.com',
	dialect: 'mysql',
	operatorsAliases: false,
});

let models = {};

const User = connection.define('user', {
	nombre: {
		type: Sequelize.STRING,
		allowNull: false
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	},
});

const UserType = connection.define('userType', {
	nombre: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

const Categoria = connection.define('categoria', {
	nombre: {
		type: Sequelize.STRING,
		allowNull: false
	}
});


const Producto = connection.define('producto', {
	nombre: {
		type: Sequelize.STRING,
		allowNull: false
	},
	descripcion: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	precio: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	imagen: {
		type: Sequelize.TEXT,
		allowNull: false
	},
});

const Carrito = connection.define('carrito', {
	cantidad: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	precioTotal: {
		type: Sequelize.DOUBLE,
		allowNull: false
	}
});

User.belongsTo(UserType, {
	foreignKey: {
		allowNull: false
	}
});

Producto.belongsTo(Categoria, {
	foreignKey: {
		allowNull: false
	}
});

Carrito.belongsTo(User, {
	foreignKey: {
		allowNull: false
	}
});

Carrito.belongsTo(Producto, {
	foreignKey: {
		allowNull: false
	}
});

models.User = User;
models.UserType = UserType;
models.Categoria = Categoria;
models.Producto = Producto;
models.Carrito = Carrito;

connection.sync();

module.exports = models;