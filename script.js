let container = document.getElementById("container")
let snake = []
const gridSize = 2500

function initializeGrid() {
    for (let i = 0; i < gridSize; i++) {
        let box = document.createElement("div")

        box.id = i
        box.className = "box"
        box.style.border = "1px solid white"
        box.style.margin = "-1px"
        box.style.height = "15px"
        box.style.width = "15px"

        container.appendChild(box)

    }

}

initializeGrid()

function initializeSnake() {
    const center = gridSize / 2;
    let head = document.getElementsByClassName("box")[1275]
    snake.push(1275)
    head.style.background = "red"
}

initializeSnake()

function startGame() {
    setTimeout(() => {
        let i = snake[0]
        let head = document.getElementsByClassName("box")[i]
        head.style.background = "transparent"
        head = document.getElementsByClassName("box")[++i]
        head.style.background = "red"
        snake.pop()
        snake.push(i)
        
        startGame()
    }, 10);
}

//startGame()
