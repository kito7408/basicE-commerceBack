const Producto = require('../models/producto');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        const now = new Date().toISOString();
        const date = now.replace(/:/g, '-');
        cb(null, date + file.originalname);
    }
});

const upload = multer({storage: storage});

module.exports = function (app) {

    app.get('/productos', (req, res) => {
        Producto.getAll((err, data) => {
            res.json(data);
        });
    });

    app.get('/productos/categoria/:id', (req, res) => {
        Producto.findByCategoria(req.params.id, (err, data) => {
            res.json(data);
        });
    });

    app.get('/productos/search', (req, res) => {
        Producto.findBySearch(req.query.nombre, (err, data) => {
            res.json(data);
        });
    });

    app.get('/productos/:id', (req, res) => {
        Producto.findById(req.params.id, (err, data) => {
            res.json(data);
        })
    });

    app.post('/productos', upload.single('imagen'), (req, res) => {
        console.log(req.body);
        console.log(req.file);
        const productoData = {
            nombre: req.body.nombre,
            imagen: req.file.path,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            categoriumId: req.body.categoriaId
        };
        //console.log(productoData);
        Producto.insert(productoData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Producto Inserted',
                    data: data
                })
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'Error',
                    err: err
                })
            }
        })
    });

    app.put('/productos/:id', (req, res) => {

        const productoData = {
            nombre: req.body.nombre,
            imagen: req.body.imagen,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            categoriumId: req.body.categoriaId
        };

        Producto.update(productoData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Producto Updated',
                    data: data
                });
            } else {
                res.json({
                    success: false,
                    msg: 'error',
                    err: err
                })
            }
        })
    });

    app.delete('/productos/:id', (req, res) => {
        Producto.delete(req.params.id, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    dataDeleted: data
                })
            } else {
                res.json({
                    success: false,
                    msg: 'Error',
                    err: err
                })
            }
        })
    });
}