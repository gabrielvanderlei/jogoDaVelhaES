# Jogo da Velha API

Mini-projeto desenvolvido para obtenção de nota na disciplina IF977 - Engenharia de Software, do curso de Sistemas de Informação, da Universidade Federal de Pernambuco.

## Qual o projeto da API? 

Jogo da Velha baseado em requisições. Onde cada jogada leva em conta as posições disponíveis como uma matriz 3x3. Por exemplo, um jogador ao definir os campos 11, 12 e 13 irá preencher toda a fileira superior 
das posições disponíveis, ganhando o jogo. Está disponível também um arquivo do Insomnia para facilitar a visualização e utilização do jogo. A API pode ser acessada on-line clicando [aqui](https://jogo-da-velha-es.herokuapp.com/). 

Está disponível no repositório também o arquivo "Insomnia Export File.json" que pode ser importado no Insomnia e contém as requisições que devem ser usadas para interagir com a API tanto localmente quanto com a que está disponível no Heroku.

## Quais as decisões foram tomadas pra ser assim?

Focamos na simplicidade do resultado final em conjunto com sua usabilidade e regras de negócio.

Visando o padrão RESTFull:
- É possível criar os elementos de partidas através de um POST para o recurso partida.
- A criação de novas jogadas ocorre através do o recurso jogar (dentro de uma partida específica e a jogada é criada com base em um player específico). 
- É possível obter o status de um player em uma partida através de uma requisição GET.

## Protocolo de uso

POST /partida
- Cria nova partida

POST /partida/:partida/jogar/:user BODY { "jogada": [11,12,13,21,22,23,31,32,33] }
- Exemplo: /partida/0/jogar/player1 BODY { "jogada": 11 }
- Executa uma jogada, e também controla caso alguém ganhe.

GET /partida/:partida/status/:user
- Exemplo: /partida/0/status/player1
- Verifica o status da partida.

### Funcionalidades
* Iniciar partidas
* Consultar estado das partidas
* Realizar jogadas 

## Autores
* Gabriel Vanderlei Oliveira
* Lucas Felix de Aguiar
* Samuel Ferreira de Farias Barbosa
* Sergio Victor
