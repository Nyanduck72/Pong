// Board
// declaración de variables para el canvas
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

// Jugadores
let playerHeight = 50;
let playerWidth = 10;
let playerVelY = 0;

let player1 = {
    x: 10,
    y: boardHeight/2,
    width: playerWidth,
    height: playerHeight,
    velocity: 0
}

let player2 = {
    x: boardWidth - playerWidth - 10,
    y: boardHeight/2,
    width: playerWidth,
    height: playerHeight,
    velocity: 0
}

// Bola
let ballHeight = 10;
let ballWidth = 10;

let ball = {
    x: boardWidth/2,
    y: boardHeight/2,
    width: ballWidth,
    height: ballHeight,
    velocityX: 1,
    velocityY: 2 
}

// Marcador y puntajes
let player1Score = 0;
let player2Score = 0;


// Carga de página y estructura del canvas
window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); // usado para dibujar en el canvas

    //Creación inicial de jugadores
    context.fillStyle = "white";
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    requestAnimationFrame(update); // Funcion que se actualiza cada cuadro
    document.addEventListener("keydown", movePlayer) // La página detecta cuando se presionan las teclas de movimiento
}

function update() { // Funcion recursiva para actualizar cada cuadro

    // Jugador 1
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    context.fillStyle = "blue";
    let nextPlayer1Y = player1.y + player1.velocity;
    if (!outOfBounds(nextPlayer1Y)) {
        player1.y = nextPlayer1Y;
    }
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    // Jugador 2
    context.fillStyle = "red";
    let nextPlayer2Y = player2.y + player2.velocity;
    if (!outOfBounds(nextPlayer2Y))  {
        player2.y = nextPlayer2Y;
    }
    context.fillRect(player2.x, player2.y, player2.width, player2.height);

    // Pelota
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    // Se detecta si la bola tocó los bordes superiores
    if (ball.y <= 0 || (ball.y + ball.height) >= boardHeight) {
        ball.velocityY *= -1; // Se invierte la velocidad en Y de la bola
    }

    // Se regresa la pelota

    // Colisiones con jugador 1 (izquierda)
    if (collisionCheck(ball, player1)) {
        if (ball.x <= player1.x + player1.width) {
            ball.velocityX *= -1;
        }
    }
    // Colisiones con jugador 2 (derecha)
    else if (collisionCheck(ball, player2)) {
        if (ball.x + ball.width >= player2.x) {
            ball.velocityX *= -1;
        }
    }

    // Se verifica si la pelota pasó y se añade el punto al jugador correspondiente
    if (ball.x < 0) {
        player2Score++;
        resetGame(1);
    }
    else if ((ball.x + ball.width) > board.width) {
        player1Score++;
        resetGame(-1);
    }

    // Mostrar el puntaje
    context.font = "45px monospace";
    context.fillText(player1Score, boardWidth/5, 45);
    context.fillText(player2Score, boardWidth*4/5 -45, 45);
}

function movePlayer(e){
    // Movimiento del jugador de la izquierda
    if (e.code == "KeyW") {
        player1.velocity = -5;
    }
    else if (e.code == "KeyS") {
        player1.velocity = 5;
    }

    // Movimiento del jugador de la derecha
    if (e.code == "ArrowUp") {
        player2.velocity = -5;
    }
    else if (e.code == "ArrowDown") {
        player2.velocity = 5;
    }
}

function outOfBounds(yPos){ // Chequeo de altura del jugador
    return (yPos < 0 || (yPos + playerHeight) > boardHeight);
}

// Check de colisiones
function collisionCheck(a, b){
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

function resetGame(direction) {
    ball = {
        x: boardWidth/2,
        y: boardHeight/2,
        width: ballWidth,
        height: ballHeight,
        velocityX: direction,
        velocityY: 2
    }
}