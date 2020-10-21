# Jogo da Velha API

Mini-projeto desenvolvido para obtenção de nota na disciplina IF977 - Engenharia de Software, do curso de Sistemas de Informação, da Universidade Federal de Pernambuco.

## Descrição

Jogo da Velha baseado em requisições.

## Protocolo de uso

GET /partida/nova
Cria nova partida

POST /partida/:partida/jogar/:user BODY { "jogada": [11,12,13,21,22,23,31,32,33] }
Exemplo: /partida/0/jogar/player1 BODY { "jogada": 11 }
Executa uma jogada, e também controla caso alguém ganhe.

GET /partida/:partida/status/:user
Exemplo: /partida/0/status/player1
Verifica o status da partida.

### Funcionalidades
* Iniciar partidas
* Consultar estado das partidas
* Realizar jogadas

## Autores
* Gabriel Vanderlei Oliveira
* Lucas Felix de Aguiar
* Samuel Ferreira de Farias Barbosa
* Sergio Victor
