class CustomError{
    constructor(msgObj){
        let error = new Error();
        error.obj = msgObj;
        return error;
    }
}

function verificarPartida(req, res, todasPartidas) {
    const partida = req.params.partida;

    if (isNaN(partida) || (partida < 0) || !todasPartidas.length < partida) {
        throw new CustomError({
            "message": "Partida inválida",
        });
    }

    return partida;
}

function verificarUser(req, res) {
    const user = req.params.user;

    if (
        (user !== 'player1') &&
        (user !== 'player2')
    ) {
        throw new CustomError({
            "message": "Usuário inválido"
        });

        return false;
    }

    return user;
}

function verificarVezDeJogar(partidaAtual, user, res) {
    if (partidaAtual['atual'] !== user) {
        throw new CustomError({
            "message": "Não é a sua vez de jogar.",
            "vez": partidaAtual['atual']
        });

        return false;
    }
}

function verificarGanhador(partidaAtual, user, res) {
    if (partidaAtual['winner'] !== 0) {
        if (partidaAtual['winner'] === user) {
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
}

function verificaJogada(req, res, partidaAtual, user) {
    const partidaAtualDoUsuario = partidaAtual[user];
    const partidaAtualDoOutroUsuario = partidaAtual[(user === 'player1') ? 'player2' : 'player1'];
    const jogada = req.body.jogada;

    if (
        ((jogada !== 11) &&
            (jogada !== 12) &&
            (jogada !== 13) &&
            (jogada !== 21) &&
            (jogada !== 22) &&
            (jogada !== 23) &&
            (jogada !== 31) &&
            (jogada !== 32) &&
            (jogada !== 33)) ||
        (partidaAtualDoUsuario.includes(jogada)) ||
        (partidaAtualDoOutroUsuario.includes(jogada))
    ) {
        throw new CustomError({
            "message": "Jogada Inválida",
            "error": (partidaAtualDoUsuario.includes(jogada) || partidaAtualDoOutroUsuario.includes(jogada)) ? "Jogada indisponível" : "Jogada inexistente"
        });

        return false;
    }

    return jogada;
}

function verifyIncludes(arr, arrElements){
    let result = true;
    arrElements.map(function(element){
        if(!arr.includes(element)){
            result = false;
        }
    });

    return result;
}

function verificaJogadaGanhadora(partidaAtual, user, res) {
    const partidaAtualDoUsuario = partidaAtual[user];

    if (
        (verifyIncludes(partidaAtualDoUsuario, [11, 12, 13])) ||
        (verifyIncludes(partidaAtualDoUsuario, [11, 22, 33])) ||
        (verifyIncludes(partidaAtualDoUsuario, [11, 21, 31])) ||
        (verifyIncludes(partidaAtualDoUsuario, [13, 23, 33])) ||
        (verifyIncludes(partidaAtualDoUsuario, [31, 32, 33]))
    ) {
        partidaAtual['winner'] = user;

        res.send({
            "message": "Jogada Ganhadora!",
            "congratulations": "Parabéns, você ganhou."
        });

        return false;
    }
}

module.exports = {
    verificaJogadaGanhadora,
    verificaJogada,
    verificarGanhador,
    verificarVezDeJogar,
    verificarUser,
    verificarPartida
}