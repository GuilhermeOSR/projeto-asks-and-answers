const Sequelize = require("sequelize");
const connection = require("./database");

const Answer = connection.define('answer', {
    resposta: {
        type: Sequelize.TEXT,
        allowNull: false
    },

    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }   


})

Answer.sync({Force: false}).then(() => {
    console.log("Tabela de Resposta Criada");
})

module.exports = Answer;