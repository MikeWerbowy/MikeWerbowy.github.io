// JavaScript to toggle header visibility on scroll
const header = document.getElementById('main-header');
let isHeaderVisible = true;

window.addEventListener('scroll', function() {
    const scrollY = window.scrollY || window.pageYOffset;

    // Define the scroll position where you want to toggle the header
    const scrollThreshold = header.offsetHeight; // Header height

    if (scrollY > scrollThreshold && isHeaderVisible) {
        header.style.transform = 'translateY(-100%)'; // Hide the header
        isHeaderVisible = false;
    } else if (scrollY <= scrollThreshold && !isHeaderVisible) {
        header.style.transform = 'translateY(0)'; // Show the header
        isHeaderVisible = true;
    }
});

// Select the loading bar element
const progressBar = document.querySelector('.progress');

// Select all the li elements in the .box-area
const boxItems = document.querySelectorAll('.box-area li');

// Calculate the total width of the loading bar
const totalWidth = 100; // Set a fixed total width

// Initialize progress
let completedLines = 0;

// Create an array to track completed items in the order they finish
const completedItems = [];

// Loop through boxItems and update progress
boxItems.forEach((item, index) => {
    item.style.top = `${index * (100 / boxItems.length)}%`; // Calculate the top position based on the number of items

    // Generate a random animation delay between 0s and 5s
    const randomDelay = Math.random() * 5;
    item.style.animationDelay = `${randomDelay}s`;

    // Generate a random animation duration between 5s and 10s
    const randomDuration = 5 + Math.random() * 5;
    item.style.animationDuration = `${randomDuration}s`;

    // Create an interval to check the animation completion
    const interval = setInterval(() => {
        console.log("interval checked");
        const computedStyle = getComputedStyle(item);
        const leftValue = parseFloat(computedStyle.getPropertyValue('left'));

        // Check if the animation is completed based on the left position
        if (leftValue >= 600) {
            console.log("leftValue >= 600");
            clearInterval(interval); // Clear the interval

            // Check if all lines have passed the condition
            completedLines++;

            // Calculate the progress based on completedLines
            const progress = (completedLines / boxItems.length) * totalWidth;

            // Update the progress bar width with a CSS transition
            progressBar.style.width = `${progress}%`;

            // Push the completed item to the boxItems array
            completedItems.push(item.cloneNode(true));

            // Update the code box with the completed items
            const codeContent = document.querySelector('.code-content');
            codeContent.innerHTML = ''; // Clear the code content

            // Rearrange the code based on their order in the box-area
            completedItems.forEach((completedItem, index) => {
                const codeBlock = document.createElement('pre'); // Create a <pre> element
                const codeElement = document.createElement('code'); // Create a <code> element
                const codeText = completedItem.textContent.trim(); // Get the code text
                codeElement.textContent = codeText; // Set the code text
                codeBlock.appendChild(codeElement); // Append the <code> element to <pre>
                codeContent.appendChild(codeBlock); // Append the <pre> element to the code content

                // Add the language for syntax highlighting (e.g., javascript)
                codeElement.classList.add('language-javascript');
            });

            // Initialize Highlight.js on the code content
            hljs.highlightAll();

            if (completedLines === boxItems.length) {
                console.log("completedLines === boxItems.length");
                // When all lines are completed, update the progress bar to orange
                progressBar.style.backgroundColor = `#ff6600`;

                // Show the code box
                const codeBox = document.querySelector('.code-box');

                // Add the code-animation class to trigger the animation
                const codeContent = document.querySelector('.code-content');
                codeContent.classList.add('code-animation');

                // Clear the code content
                codeContent.innerHTML = '';

                // Rearrange the code based on their order in the box-area
                boxItems.forEach((boxItem, index) => {
                    const codeBlock = document.createElement('pre'); // Create a <pre> element
                    const codeElement = document.createElement('code'); // Create a <code> element
                    const codeText = boxItem.textContent.trim(); // Get the code text
                    codeElement.textContent = codeText; // Set the code text
                    codeBlock.appendChild(codeElement); // Append the <code> element to <pre>
                    codeContent.appendChild(codeBlock); // Append the <pre> element to the code content

                    // Add the language for syntax highlighting (e.g., javascript)
                    codeElement.classList.add('language-javascript');
                });

                // Initialize Highlight.js on the code content
                hljs.highlightAll();
            }
        }
    }, 100);
});


//snake game
const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;

// Getting high score from the local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const updateFoodPosition = () => {
    // Passing a random 1 - 30 value as food position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    // Clearing the timer and reloading the page on game over
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay...");
    location.reload();
}

const changeDirection = e => {
    // Changing velocity value based on key press
    if(e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

// Calling changeDirection on each key click and passing key dataset value as an object
controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));

const initGame = () => {
    if(gameOver) return handleGameOver();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    // Checking if the snake hit the food
    if(snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]); // Pushing food position to snake body array
        score++; // increment score by 1
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }
    // Updating the snake's head position based on the current velocity
    snakeX += velocityX;
    snakeY += velocityY;
    
    // Shifting forward the values of the elements in the snake body by one
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY]; // Setting first element of snake body to current snake position

    // Checking if the snake's head is out of wall, if so setting gameOver to true
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        // Adding a div for each part of the snake's body
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        // Checking if the snake head hit the body, if so set gameOver to true
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
    playBoard.innerHTML = html;
}

updateFoodPosition();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keyup", changeDirection);