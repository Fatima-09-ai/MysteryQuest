// ===============================
// SOUND EFFECTS
// ===============================

const clickSound = new Audio("assets/sounds/click.mp3");
const successSound = new Audio("assets/sounds/success.mp3");
const wrongSound = new Audio("assets/sounds/wrong.mp3");
const hintSound = new Audio("assets/sounds/hint.mp3");
const levelSound = new Audio("assets/sounds/levelup.mp3");
const loginSound = new Audio("assets/sounds/login.mp3");
const logoutSound = new Audio("assets/sounds/logout.mp3");
const achievementSound = new Audio("assets/sounds/achievement.mp3");

function playClick() {
    clickSound.currentTime = 0;
    clickSound.play();
}

function playSuccess() {
    successSound.currentTime = 0;
    successSound.play();
}

function playWrong() {
    wrongSound.currentTime = 0;
    wrongSound.play();
}

function playHint() {
    hintSound.currentTime = 0;
    hintSound.play();
}

function playLevel() {
    levelSound.currentTime = 0;
    levelSound.play();
}

function playLogin() {
    loginSound.currentTime = 0;
    loginSound.play();
}

function playLogout() {
    logoutSound.currentTime = 0;
    logoutSound.play();
}

function playAchievement() {
    achievementSound.currentTime = 0;
    achievementSound.play();
}

document.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
        playClick();
    }
});