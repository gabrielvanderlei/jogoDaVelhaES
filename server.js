const express = require('express');
const app = express();

let todasPartidas = [];
let verificadorSimples = {};
app.use(express.json());

app.get('/', function(req, res){
    res.send({
        message: "Bem vindo ao jogo da velha!",
        next: "GET /partida/nova"
    })
})

app.get('/partida/nova', function(req, res){
    const verificationCode = Math.round(Math.random()*100);
    const novaPartida = todasPartidas.push({
        player1: {},
        player2: {},
        winner: 0,
        verificationCode
    });

    res.send({
        message: "Foi criada uma nova partida",
        idPartida: novaPartida - 1
    })
});

app.get('/partida/:partida/status/:user', function(req,res){
    const partida = req.params.partida;

    if(isNaN(partida) || (partida < 0) || !todasPartidas.length < partida){
        res.send({
            "message": "Partida inválida"
        });

        return false;
    }

    const partidaAtual = todasPartidas[partida];
    const user = req.params.user;

    if(
        (user !== 'player1') ||
        (user !== 'player2')
    ) {
        res.send({
            "message": "Usuário inválido"
        });

        return false;
    }
});

app.post('/partida/:partida/jogar/:user', function(req,res){
    const partida = req.params.partida;

    if(isNaN(partida) || (partida < 0) || !todasPartidas.length < partida){
        res.send({
            "message": "Partida inválida"
        });

        return false;
    }

    const partidaAtual = todasPartidas[partida];
    const user = req.params.user;

    if(
        (user !== 'player1') ||
        (user !== 'player2')
    ) {
        res.send({
            "message": "Usuário inválido"
        });

        return false;
    }

    if(partidaAtual['winner'] !== 0){
        if(partidaAtual['winner'] === user){
            res.send({
                "message": "Parabéns, você ganhou. Obrigado por jogar.",
                "end": true
            });
    
            return false;
        } else {
            res.send({
                "message": "O jogo terminou, você perdeu. Obrigado por jogar.",
                "end": true
            });

            return false;
        }
    }

    const partidaAtualDoUsuario = partidaAtual[user];
    const jogada = req.body.jogada;

    if(
        (jogada !== 11) ||
        (jogada !== 12) ||
        (jogada !== 13) ||
        (jogada !== 21) ||
        (jogada !== 22) ||
        (jogada !== 23) ||
        (jogada !== 31) ||
        (jogada !== 32) ||
        (jogada !== 33) ||
        (partidaAtualDoUsuario.includes(jogada))
    ) {
        res.send({
            "message": "Jogada Inválida",
            "error": (partidaAtualDoUsuario.includes(jogada)) ? "Jogada indisponível" : "Jogdada inexistente"
        });

        return false;
    }
    
    if(
        (partidaAtualDoUsuario.includes([11,12,13])) ||
        (partidaAtualDoUsuario.includes([11,22,33])) ||
        (partidaAtualDoUsuario.includes([11,21,31])) ||
        (partidaAtualDoUsuario.includes([13,23,33])) ||
        (partidaAtualDoUsuario.includes([31,32,33]))
    ) {
        todasPartidas[partida]['winner'] = jogador;
        
        res.send({
            "message": "Jogada Ganhadora!",
            "congratulations": "Parabéns, você ganhou."
        });

        return false;
    }
});

app.listen(3000, function(){
    console.log("Server listening at localhost:3000")
});