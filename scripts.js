let score = 0;

const player = document.getElementById("player");

const scoreElement = document.getElementById("score");

const cactus = document.getElementById("cactus");

const background = document.getElementById('background');

const buttonFlow = document.getElementById("button-flow")

const board = document.getElementById("board")

let gameLoop;

board.addEventListener("click", function () {
    player.classList.add("playerJump");
})

player.addEventListener('animationend', () => {
    player.classList.remove("playerJump");;
});

function checkCondition() {
    if (
        cactus.offsetLeft < (player.offsetLeft + 49)
        && cactus.offsetLeft > player.offsetLeft
        && (player.offsetTop >= (cactus.offsetTop - player.offsetHeight))
    ) {
        lostGame();
    }
    gameLoop = requestAnimationFrame(checkCondition)
}

let scoreInterval;

function lostGame() {
    cancelAnimationFrame(gameLoop)
    pauseGame();
    buttonFlow.classList.add("reset")
}

function pauseGame() {
    cactus.style.animationPlayState = 'paused';
    player.style.animationPlayState = 'paused';
    background.style.animationPlayState = 'paused';
    clearInterval(scoreInterval);
}

function resumeGame() {
    cactus.style.animationPlayState = 'running';
    player.style.animationPlayState = 'running';
    background.style.animationPlayState = 'running';
}

function resetScore() {
    score = 0;
    scoreElement.innerText = score;
    scoreInterval = setInterval(() => {
        score++;
        scoreElement.innerText = score;
    }, 1000)
}

function resetGame() {
    resetAnimation();
    resumeGame();
    resetScore();
    gameLoop = requestAnimationFrame(checkCondition);
}

buttonFlow.addEventListener('click', () => {
    if (buttonFlow.classList.contains('play')) {
        resumeGame();
        buttonFlow.classList.remove('play')
    }
    else if (buttonFlow.classList.contains('reset')) {
        resetGame();
        buttonFlow.classList.remove('reset')
    }
    else {
        pauseGame();
        buttonFlow.classList.add('play')
    }
})

function resetAnimation() {
    cactus.classList.remove("animatedCactus");
    player.classList.remove("playerJump");
    void cactus.offsetWidth;
    cactus.classList.add("animatedCactus");
}
window.addEventListener("load", () => {
    resetGame();
})