let container = document.getElementById("container")
const sideSize = 25
const gridSize = sideSize * sideSize
let playing = false
let dead = false
let speed = 80
let playBtn = document.getElementById("play")
const directions = ["up", "down", "left", "right"]
let currentDirection = "right"
let grid = document.getElementsByClassName("box")
let applePos;

let snake = [{
    pos: Math.floor(Math.random()*gridSize) - 1,
    dir: "right"
}]

function initializeGrid() {
    let container = document.getElementById("container")
    let gridTemplateColumns = "repeat(" + sideSize + ", 15px)";
    container.style.gridTemplateColumns = gridTemplateColumns
    if (playing) {
        playBtn.innerHTML = "STOP"
    } else {
        playBtn.innerHTML = "START"
    }

    if(dead) {
        playBtn.innerHTML = "Restart Game"
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
    if (playing && !dead) {
        setTimeout(() => {
            snake[0].pos
            if (currentDirection === directions[0]) {
                // Movimiento vertical hacia abajo
                snake[0].pos = snake[0].pos - sideSize

                // Movimiento vertical circular hacia abajo
                if (snake[0].pos <= -1) {
                    snake[0].pos = snake[0].pos + gridSize
                }
            } else if (currentDirection === directions[1]) {
                // Movimiento vertical hacia arriba
                snake[0].pos = snake[0].pos + sideSize

                // Movimiento vertical circular hacia arriba
                if (snake[0].pos >= gridSize) {
                    snake[0].pos = snake[0].pos - gridSize
                }
            } else if (currentDirection === directions[2]) {
                // Movimiento horizontal izquierda
                snake[0].pos = --snake[0].pos

                // Movimiento horizontal circular a izquierdas
                if ((snake[0].pos + 1) % sideSize === 0) {
                    snake[0].pos = snake[0].pos + sideSize
                }
            } else if (currentDirection === directions[3]) {
                // Movimiento horizontal derecha
                snake[0].pos = ++snake[0].pos

                // Movimiento horizontal circular a derechas
                if ((snake[0].pos) % sideSize === 0) {
                    snake[0].pos = snake[0].pos - sideSize
                }

            }
            isKill()
            let ant = snake[0].dir
            for (let i = 1; i < snake.length; i++) {

                let previous = snake[i - 1].dir
                let current = snake[i].dir

                if (current === directions[0]) {
                    // Movimiento vertical hacia arriba
                    snake[i].pos = snake[i].pos - sideSize

                    // Movimiento vertical circular hacia arriba
                    if (snake[i].pos <= -1) {
                        snake[i].pos = snake[i].pos + gridSize
                    }
                } else if (current === directions[1]) {
                    // Movimiento vertical hacia abajo
                    snake[i].pos = snake[i].pos + sideSize

                    // Movimiento vertical circular hacia abajo
                    if (snake[i].pos >= gridSize) {
                        snake[i].pos = snake[i].pos - gridSize
                    }
                } else if (current === directions[2]) {
                    // Movimiento horizontal izquierda
                    snake[i].pos = --snake[i].pos

                    // Movimiento horizontal circular a izquierdas
                    if ((snake[i].pos + 1) % sideSize === 0) {
                        snake[i].pos = snake[i].pos + sideSize
                    }
                } else if (current === directions[3]) {
                    // Movimiento horizontal derecha
                    snake[i].pos = ++snake[i].pos

                    // Movimiento horizontal circular a derechas
                    if ((snake[i].pos) % sideSize === 0) {
                        snake[i].pos = snake[i].pos - sideSize
                    }
                }
                snake[i].dir = ant
                ant = current
            }
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

    if(dead) {
        snake = [{
            pos: Math.floor(Math.random()*gridSize) - 1,
            dir: "right"
        }]
        playing = true
        dead = false
        document.getElementById(applePos).classList.toggle("apple")
        applePos = ""
        startGame()
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
                pos: snake[snake.length - 1].pos + sideSize,
                dir: previous
            })
            // Movimiento vertical circular hacia abajo
            if (snake[snake.length - 1].pos >= gridSize) {
                snake[snake.length - 1].pos = snake[snake.length - 1].pos - gridSize
            }
        } else if (previous === directions[1]) {
            snake.push({
                pos: snake[snake.length - 1].pos - sideSize,
                dir: previous
            })
            // Movimiento vertical circular hacia arriba
            if (snake[snake.length - 1].pos < 0) {
                snake[snake.length - 1].pos = snake[snake.length - 1].pos + gridSize
            }
        } else if (previous === directions[2]) {
            snake.push({
                pos: snake[snake.length - 1].pos + 1,
                dir: previous
            })
            // Movimiento horizontal circular a izquierdas
            if ((snake[snake.length - 1].pos) % sideSize === 0) {
                snake[snake.length - 1].pos = snake[snake.length - 1].pos + sideSize
            }
        } else if (previous === directions[3]) {
            snake.push({
                pos: snake[snake.length - 1].pos - 1,
                dir: previous
            })
            // Movimiento horizontal circular a derechas
            if ((snake[snake.length - 1].pos) % sideSize === 0) {
                snake[snake.length - 1].pos = snake[snake.length - 1].pos - sideSize
            }
        }

    }
}

function isKill() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].pos === snake[i].pos) {
            playing = false
            alert("Snake has dead")
            dead = true
            playBtn.innerHTML = "Restart Game"
        }
    }
}