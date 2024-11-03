const hit = document.getElementById("hit");
const time = document.getElementById("count");
const score = document.getElementById("score");

const target = document.getElementById("target");
const container = document.getElementById("container");

const button = document.createElement("button");
button.innerText = "START";
button.id = "myButton";
let count = 0;

// Create audio element for the pop sound
const popSound = new Audio('89526__cgeffex__blurp-bubble-pop1.mp3'); // Replace with the actual path to your pop sound file

button.addEventListener("click", () => {
    button.style.display = "none";
    start();
    score.textContent = 0;
});

window.addEventListener("load", () => {
    document.body.appendChild(button);
});

// Add styles for centering and button styling
const style = document.createElement("style");
style.innerHTML = `
    #myButton {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        background-color: #0ea5e9;
        color: white;
        width: 100px;
        height: 50px;
        border: none;
        border-radius: 15px;
    }
    #myButton:hover {
        width: 200px;
        height: 100px;
        font-size: 20px;
        background-color: green;
    }
    .bubble {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px green;
        border-style: dotted;
    }
    .bubble:hover {
        background-color: #047857;
        color: white;
        transition: 0.2s ease;
    }
`;
document.head.appendChild(style);

function start() {   
    let Target = Math.floor(Math.random() * 5 + 1);
    target.textContent = Target;
    let Time = 60;
    time.textContent = Time;

    const countdown = setInterval(() => {
        Time--;
        time.textContent = Time;

        if (Time == 0) {
            clearInterval(countdown); // Stop the countdown when it reaches 0
            time.textContent = "GAME OVER!"; // Optional message when time is up
            container.innerHTML = ''; // Clear bubbles when time is up
            button.textContent = "RETRY";
            button.style.display = 'block';
        }
    }, 1000);

    load();
}

function load() {
    container.innerHTML = ''; // Clear previous bubbles
    for (let i = 0; i < 100; i++) {
        let text = Math.floor(Math.random() * 5 + 1);
        const element = document.createElement("div");
        element.classList.add("bubble"); // Use a class for bubbles
        element.innerText = text;
        
        // Add event listener for each bubble
        element.addEventListener("click", () => {
            if (element.innerText === target.textContent) {
                count += 1;
                hit.textContent = count;
                score.textContent = 10 * count;
                
                // Play pop sound
                popSound.currentTime = 0; // Reset sound to the start
                popSound.play();

                let Target = Math.floor(Math.random() * 5 + 1);
                target.textContent = Target;
                load(); // Reload bubbles
            }
        });

        container.appendChild(element);
    }
}