const Categoria = require('../models/categoria');

module.exports = function (app) {

    app.get('/categorias', (req, res) => {
        Categoria.getAll((err, data) => {
            res.json(data);
        });
    });

    app.get('/categorias/:id', (req, res) => {
        Categoria.findById(req.params.id, (err, data) => {
            res.json(data);
        })
    });

    app.post('/categorias', (req, res) => {
        const categoriaData = {
            nombre: req.body.nombre
        };

        Categoria.insert(categoriaData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Categoria Inserted',
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

    app.put('/categorias/:id', (req, res) => {

        const categoriaData = {
            nombre: req.body.nombre
        };

        Categoria.update(categoriaData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Categoria Updated',
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

    app.delete('/categorias/:id', (req, res) => {
        Categoria.delete(req.params.id, (err, data) => {
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