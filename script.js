let container = document.getElementById("container")
let snake = [1275]
const gridSize = 2500
let playing = false
let speed = 10
let playBtn = document.getElementById("play")
const directions = ["up", "down", "left", "right"]
let currentDirection = "right"

function initializeGrid() {
    if (playing) {
        playBtn.innerHTML = "STOP"
    } else {
        playBtn.innerHTML = "START"
    }

    for (let i = 0; i < gridSize; i++) {
        let box = document.createElement("div")

        box.id = i
        box.className = "box"
        box.style.border = "1px solid rgba(255, 255, 255, 0.30)"
        box.style.margin = "-1px"
        box.style.height = "15px"
        box.style.width = "15px"
        container.appendChild(box)

    }

}

initializeGrid()

function startGame() {
    if (playing) {
        setTimeout(() => {
            for (let i = 0; i < snake.length; i++) {

                if (currentDirection === directions[0]) {
                    // Movimiento vertical hacia abajo
                    snake[i] = snake[i] - 50

                    // Movimiento vertical circular hacia abajo
                    if (snake[i] <= -1) {
                        snake[i] = snake[i] + 2500
                    }
                } else if (currentDirection === directions[1]) {
                    // Movimiento vertical hacia arriba
                    snake[i] = snake[i] + 50

                    // Movimiento vertical circular hacia arriba
                    if (snake[i] >= 2500) {
                        snake[i] = snake[i] - 2500
                    }
                } else if(currentDirection === directions[2]) {
                    // Movimiento horizontal izquierda
                    snake[i] = --snake[i]
    
                    // Movimiento horizontal circular a izquierdas
                    if ((snake[i]+1) % 50 === 0) {
                        snake[i] = snake[i] + 50
                    }
                } else if(currentDirection === directions[3]) {
                    // Movimiento horizontal derecha
                    snake[i] = ++snake[i]
    
                    // Movimiento horizontal circular a derechas
                    if ((snake[i]) % 50 === 0) {
                        snake[i] = snake[i] - 50
                    }
                    
                }



            }

            paintSnake()
            startGame()
        }, speed);
    }
}


function paintSnake() {
    let grid = document.getElementsByClassName("box")
    for (let i = 0; i < grid.length; i++) {
        grid[i].style.background = "transparent"
    }
    for (let i = 0; i < snake.length; i++) {
        let piece = document.getElementsByClassName("box")[snake[i]]
        piece.style.background = "#68B1A2"
    }
}

paintSnake()

function stop() {
    playing = !playing
    if (playing) {
        playBtn.innerHTML = "STOP"
        startGame()
    } else {
        playBtn.innerHTML = "START"
    }

    console.log(playing)
}

function setSpeed() {
    speed = document.getElementById("speed").value
}

function changeDirection(event) {
    switch (event.code) {
        case "ArrowUp":
            currentDirection = directions[0]
            break;
        case "ArrowDown":
            currentDirection = directions[1]
            break;
        case "ArrowLeft":
            currentDirection = directions[2]
            break;
        case "ArrowRight":
            currentDirection = directions[3]
            break;
    }
    console.log(currentDirection)
}