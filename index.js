// imports
const express = require('express');
const app = express();
//Responsável por traduzir os dados enviados pelo formulário em uma estrutura javascript que consigamos usar no back-end
const bodyParser = require('body-parser');
const connection = require('./database/database');
const AskModel = require('./database/Ask');
const AnswerModel = require('./database/Answer')


//MySQL Connect

connection.authenticate().then(() => {
    console.log("Conexão feita com o banco de dados");
}).catch((msgErro) => {
    console.log(msgErro);
})

//Express usar EJS como View Engine
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//body parser config para express
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rotas
app.get('/', (req, res) => {
    AskModel.findAll({ raw: true, order:[ ['id', 'DESC'] ]}).then(asks => {
        console.log(asks);
        res.render('index', {
            asks: asks
        });
    });
   
})

app.get('/ask', (req, res) => {
    res.render('./pages/ask.ejs');
    
});

app.get('/answer/:id', (req, res) => {
    const id = req.params.id;
    AskModel.findOne({
        where: {id: id}
    }).then(ask => {
        if(ask != undefined) { //Pergunta achada

            AnswerModel.findAll({
                where: {perguntaId: ask.id}, order:[['id', 'DESC']]
            }).then(answers => {
                res.render('./pages/answer.ejs', {
                    ask: ask,
                    answers: answers
                })
            })
        
        } else { //Não encontrada
            res.redirect('/')
        }
    });

})





app.post('/saveask', (req, res) => {
    const titulo = req.body.titulo;
    const descricao = req.body.descricao;

    if (!req.body.titulo || typeof req.body.descricao == undefined || req.body.titulo == null) {
        console.log("erro");
    } 
    if(req.body.titulo.length < 5 && req.body.descricao.length < 5 ) {
        console.log("muito pequeno")
    }
    if(req.body.titulo.length > 20) {
        console.log("muito grande seu texto")
    }
    else {
        AskModel.create({
            titulo: titulo,
            descricao: descricao
        }).then(() => {
            res.redirect("/")
        })
    }
    

});

app.post('/salvarResposta', (req, res) => {
    const resposta = req.body.resposta;
    const perguntaId = req.body.perguntaId;
    AnswerModel.create({
        resposta: resposta,
        perguntaId: perguntaId
    }).then(() => {

        res.redirect("./answer/" + perguntaId);
    })
  });






//Servidor
app.listen(process.env.PORT || 3000, function() {
    console.log("servidor rodando");
})

