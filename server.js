const express = require('express');

const {
    verificarPartida,
    verificarVezDeJogar,
    verificarGanhador,
    verificaJogada,
    verificaJogadaGanhadora,
    verificarUser
} = require('./rules');

const app = express();

let todasPartidas = [];
let verificadorSimples = {};
app.use(express.json());

app.get('/', function (req, res) {
    res.send({
        message: "Bem vindo ao jogo da velha!",
        next: "GET /partida/nova"
    })
})

app.post('/partida', function (req, res) {
    const novaPartida = todasPartidas.push({
        player1: [],
        player2: [],
        winner: 0,
        atual: 'player1'
    });

    res.send({
        message: "Foi criada uma nova partida",
        idPartida: novaPartida - 1
    })
});

app.get('/partida/:partida/status/:user', function (req, res) {
    const partida = verificarPartida(req, res, todasPartidas);
    const partidaAtual = todasPartidas[partida];
    const user = verificarUser(req, res);

    res.send({
        "partida": partidaAtual,
        user
    });
});

app.post('/partida/:partida/jogar/:user', function (req, res) {
    try{
        const partida = verificarPartida(req, res, todasPartidas);
        const partidaAtual = todasPartidas[partida];
        const user = verificarUser(req, res);

        verificarGanhador(partidaAtual, user, res);
        verificarVezDeJogar(partidaAtual, user, res);

        const jogada = verificaJogada(req, res, partidaAtual, user);
        partidaAtual[user].push(jogada);
        partidaAtual['atual'] = (partidaAtual['atual'] === 'player1') ? 'player2' : 'player1';

        verificaJogadaGanhadora(partidaAtual, user, res);

        res.send({
            "message": "Jogada realizada!",
            "next": "É a vez do outro player"
        });

        return false;
    } catch(e){
        res.send(e.obj || {
            "message": "Error"
        });

        return false;
    }
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server listening at localhost:3000")
});