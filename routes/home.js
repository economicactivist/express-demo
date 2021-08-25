const express = require('express');
const router = express.Router();
//const { createWebAPIRequest } = require("../util/util");

router.get('/', (req, res) => res.render('index', { title: 'My Express App', message: 'Hello from render' }))

module.exports = router;