const Sequelize = require('sequelize');

const connection = new Sequelize('bancoperguntas', 'root', 'root', {
    host: process.env.PORT || 3000,
    dialect: "mysql"
})

module.exports = connection;