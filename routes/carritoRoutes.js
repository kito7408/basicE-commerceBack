const Carrito = require('../models/carrito');

module.exports = function (app) {

    app.get('/carrito', (req, res) => {
        Carrito.getAll((err, data) => {
            res.json(data);
        });
    });

    app.get('/carrito/:id', (req, res) => {
        Carrito.findById(req.params.id, (err, data) => {
            res.json(data);
        })
    });

    app.get('/carrito/user/:id', (req, res) => {
        Carrito.findByUser(req.params.id, (err, data) => {
            res.json(data);
        });
    });

    app.post('/carrito', (req, res) => {
        console.log(req.body)
        const carritoData = {
            cantidad: req.body.cantidad,
            precioTotal: req.body.precioTotal,
            userId: req.body.userId,
            productoId: req.body.productoId
        };

        Carrito.insert(carritoData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Carrito Inserted',
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

    app.put('/carrito/:id', (req, res) => {
        console.log(req.body)
        const carritoData = {
            id: req.body.id,
            cantidad: req.body.cantidad,
            precioTotal: req.body.precioTotal,
            userId: req.body.userId,
            productoId: req.body.productoId
        };

        Carrito.update(carritoData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Carrito Updated',
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

    app.delete('/carrito/:id', (req, res) => {
        Carrito.delete(req.params.id, (err, data) => {
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