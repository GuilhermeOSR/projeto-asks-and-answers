const Sequelize = require('sequelize');

const connection = new Sequelize('bancoperguntas', 'root', 'root', {
    host: "localhost",
    dialect: "mysql"
})

module.exports = connection;