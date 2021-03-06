const express = require('express');
const connection = require("../conexion");
const user = require('../model/user');
var router = express.Router();

const middleware = require('./middleware')

const { body, param, validationResult } = require('express-validator');

router.use(middleware.checkToken);

router.get('/mainUser', (req, res) => {
    let id = req.idUsuario;
    user.getId(connection, id, (data => {
        res.json(data);
    }))
});

//Routes
router.get('/users', [], (req, res) => {
    user.getAll(connection, (data => {
        res.json(data);
    }))
});

router.post('/user', (req, res) => {
    let body = req.body;
    user.create(connection, body, (data => {
        res.json(data);
    }));
});

router.get('/user/:id', [
    param('id').not().isEmpty().isNumeric(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let id = req.params.id;
    user.getId(connection, id, (data => {
        res.json(data);
    }))
});


router.get('/user/:email', [
    param('email').not().isEmpty().isString(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let email = req.params.email;
    user.getbyemail(connection, email, (data => {
        res.json(data);
    }))
});

router.delete('/user', [
    body('email').not().isEmpty().isString()
], (req, res) => {
    const errors = validationResult(req);
    let body = req.body;
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    user.delete(connection, body, (data => {
        res.json(data);
    }))
});

router.put('/user', [], (req, res) => {
    let body = req.body;
    user.update(connection, body, (data => {
        res.json(data);
    }))
});

router.get('/productos', [], (req, res) => {
    user.getAllProductos(connection, (data => {
        res.json(data);
    }))
});

router.get('/producto/:id', [
    param('id').not().isEmpty().isNumeric(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let id = req.params.id;
    user.getIdProducto(connection, id, (data => {
        res.json(data);
    }))
});

router.get('/elUsuario', [], (req, res) => {
    let id = req.idUsuario;
    user.getDatosUsuario(connection, id, (data => {
        res.json(data);
    }))
});

module.exports = router;