const {Router} = require('express');
const {Login} = require("../Model/authService")

const rota = Router()

rota.get("/", Login);
rota.post('/login', Login)


module.exports = rota;