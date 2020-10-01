let container = document.getElementById("container")
let snake = [{
    pos: 1275,
    dir: "right"
}]
const gridSize = 2500
let playing = false
let speed = 50
let playBtn = document.getElementById("play")
const directions = ["up", "down", "left", "right"]
let currentDirection = "right"
let grid = document.getElementsByClassName("box")
let applePos;

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
        box.id = i
        box.style.border = "1px solid rgba(255, 255, 255, 0.0)"
        box.style.borderRadius = "100px"
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
            snake[0].pos
            if (currentDirection === directions[0]) {
                // Movimiento vertical hacia abajo
                snake[0].pos = snake[0].pos - 50

                // Movimiento vertical circular hacia abajo
                if (snake[0].pos <= -1) {
                    snake[0].pos = snake[0].pos + 2500
                }
            } else if (currentDirection === directions[1]) {
                // Movimiento vertical hacia arriba
                snake[0].pos = snake[0].pos + 50

                // Movimiento vertical circular hacia arriba
                if (snake[0].pos >= 2500) {
                    snake[0].pos = snake[0].pos - 2500
                }
            } else if (currentDirection === directions[2]) {
                // Movimiento horizontal izquierda
                snake[0].pos = --snake[0].pos

                // Movimiento horizontal circular a izquierdas
                if ((snake[0].pos + 1) % 50 === 0) {
                    snake[0].pos = snake[0].pos + 50
                }
            } else if (currentDirection === directions[3]) {
                // Movimiento horizontal derecha
                snake[0].pos = ++snake[0].pos

                // Movimiento horizontal circular a derechas
                if ((snake[0].pos) % 50 === 0) {
                    snake[0].pos = snake[0].pos - 50
                }

            }
            isKill()
            let ant = snake[0].dir
            for (let i = 1; i < snake.length; i++) {

                let previous = snake[i - 1].dir
                let current = snake[i].dir

                if (current === directions[0]) {
                    // Movimiento vertical hacia arriba
                    snake[i].pos = snake[i].pos - 50

                    // Movimiento vertical circular hacia arriba
                    if (snake[i].pos <= -1) {
                        snake[i].pos = snake[i].pos + 2500
                    }
                } else if (current === directions[1]) {
                    // Movimiento vertical hacia abajo
                    snake[i].pos = snake[i].pos + 50

                    // Movimiento vertical circular hacia abajo
                    if (snake[i].pos >= 2500) {
                        snake[i].pos = snake[i].pos - 2500
                    }
                } else if (current === directions[2]) {
                    // Movimiento horizontal izquierda
                    snake[i].pos = --snake[i].pos

                    // Movimiento horizontal circular a izquierdas
                    if ((snake[i].pos + 1) % 50 === 0) {
                        snake[i].pos = snake[i].pos + 50
                    }
                } else if (current === directions[3]) {
                    // Movimiento horizontal derecha
                    snake[i].pos = ++snake[i].pos

                    // Movimiento horizontal circular a derechas
                    if ((snake[i].pos) % 50 === 0) {
                        snake[i].pos = snake[i].pos - 50
                    }
                }
                snake[i].dir = ant
                ant = current
            }
            console.log(snake)
            apple()
            checkApple()
            paintSnake()
            startGame()
        }, speed);
    }
}


function paintSnake() {
    for (let i = 0; i < grid.length; i++) {
        grid[i].style.background = ""
    }
    document.getElementsByClassName("box")[snake[0].pos].style.background = "#33db74"
    for (let i = 1; i < snake.length; i++) {
        let piece = document.getElementsByClassName("box")[snake[i].pos]
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
    snake[0].dir = currentDirection
}

function apple() {
    if (!applePos) {
        const rand = Math.floor(Math.random() * (gridSize - 1))
        let appleBox = document.getElementById(rand)
        appleBox.classList.toggle("apple")
        appleAvailable = true
        applePos = rand
    }
}

function checkApple() {

    if (snake[0].pos === applePos) {
        document.getElementById(applePos).classList.toggle("apple")
        applePos = ""

        let previous = snake[snake.length - 1].dir

        if (previous === directions[0]) {
            snake.push({
                pos: snake[snake.length - 1].pos + 50,
                dir: snake[snake.length - 1].dir
            })
            // Movimiento vertical circular hacia abajo
            if (snake[snake.length - 1].pos >= 2500) {
                snake[snake.length - 1].pos = snake[snake.length - 1].pos - 2500
            }
        } else if (previous === directions[1]) {
            snake.push({
                pos: snake[snake.length - 1].pos - 50,
                dir: snake[snake.length - 1].dir
            })
            // Movimiento vertical circular hacia arriba
            if (snake[snake.length - 1].pos <= -1) {
                snake[snake.length - 1].pos = snake[snake.length - 1].pos + 2500
            }
        } else if (previous === directions[2]) {
            snake.push({
                pos: snake[snake.length - 1].pos + 1,
                dir: snake[snake.length - 1].dir
            })
            // Movimiento horizontal circular a izquierdas
            if ((snake[snake.length - 1].pos + 1) % 50 === 0) {
                snake[snake.length - 1].pos = snake[snake.length - 1].pos + 50
            }
        } else if (previous === directions[3]) {
            snake.push({
                pos: snake[snake.length - 1].pos - 1,
                dir: snake[snake.length - 1].dir
            })
            // Movimiento horizontal circular a derechas
            if ((snake[snake.length - 1].pos) % 50 === 0) {
                snake[snake.length - 1].pos = snake[snake.length - 1].pos - 50
            }
        }

        console.log(snake)
    }
}

function isKill() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].pos === snake[i].pos) {
            playing = false
            alert("Snake has dead")
        }
    }
}