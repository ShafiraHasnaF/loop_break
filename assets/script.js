document.addEventListener("DOMContentLoaded", () => {
    const nameElement = document.getElementById("random-name");
    nameElement.textContent = getRandomName();
    console.log('muncul nama rdm')
});
const randomNames = [
    "Hungry Mammoth", "Moldy Rice", "Rotten Egg", "Cute Duck",
    "Sleepy Sloth", "Crazy Cat", "Lazy Dog", "Spicy Chili",
    "Sour Candy", "Burnt Toast", "Calico Cat", "Expired Candy",
    "Stinky Cookie", "Crying Banana", "Rainbow Donught"
];
function getRandomName() {
    const randomIndex = Math.floor(Math.random() * randomNames.length);
    return randomNames[randomIndex];
}

const screen1 = document.querySelector(".main-card-1");
const screen2 = document.querySelector(".main-card-2");
const screen3 = document.querySelector(".main-card-3");

const btn5 = document.querySelector(".mins-5");
const btn10 = document.querySelector(".mins-10");
const btn15 = document.querySelector(".mins-15");
const btnCustom = document.querySelector(".btn-custom");

const inputJam = document.querySelector(".input-hour");
const inputMenit = document.querySelector(".input-minute");
const btnStartCustom = document.querySelector(".btn-start");

const angkaTimer = document.querySelector(".timer");
const btnRemind = document.querySelector(".btn-remind");
const btnStop = document.querySelector(".btn-stop");

let durasimenit = 0;
let sisaInDetik = 0;
let intervalBreak = null;
let screenAktif = screen1;

function screenAktifKe(screen) {
    screen1.classList.add("hidden");
    screen2.classList.add("hidden");
    screen3.classList.add("hidden");
    if (screen === 'screen1') {
        screen1.classList.remove("hidden");
        screenAktif = screen1;
    } else if (screen === 'screen2') {
        screen2.classList.remove("hidden");
        screenAktif = screen2;
    } else if (screen === 'screen3') {
        screen3.classList.remove("hidden");
        screenAktif = screen3;
    }
}
screenAktifKe('screen1');

function mulaiTimer(menit) {
    durasimenit = menit;
    sisaInDetik = durasimenit * 60;
    if (intervalBreak) {
        clearInterval(intervalBreak);
        intervalBreak = null;
    }
    updateTampilanTimer();
    intervalBreak = setInterval(() => {
        sisaInDetik--;
        if (sisaInDetik <= 0) {
            clearInterval(intervalBreak);
            intervalBreak = null;
            sisaInDetik = 0;
            updateTampilanTimer();
            alert("cek waktu habis");
            angkaTimer.textContent = "00:00:00";
        } else {
            updateTampilanTimer();
        }
    }, 1000);
    screenAktifKe('screen3');
}

function updateTampilanTimer() { 
    let displayJam = Math.floor(sisaInDetik / 3600);
    let displayMenit = Math.floor((sisaInDetik % 3600) / 60);
    let displayDetik = sisaInDetik % 60;

    let stringJam = displayJam.toString().padStart(2, '0');
    let stringMenit = displayMenit.toString().padStart(2, '0');
    let stringDetik = displayDetik.toString().padStart(2, '0');

    angkaTimer.textContent = stringJam + ":" + stringMenit + ":" + stringDetik;
}

btn5.addEventListener("click", () => { 
    let displayMenit = parseInt(btn5.textContent);
    mulaiTimer(displayMenit);
});

btn10.addEventListener("click", () => { 
    let displayMenit = parseInt(btn10.textContent);
    mulaiTimer(displayMenit);
});

btn15.addEventListener("click", () => { 
    let displayMenit = parseInt(btn15.textContent);
    mulaiTimer(displayMenit);
});

btnCustom.addEventListener("click", () => {
    screenAktifKe('screen2');
});

btnStartCustom.addEventListener("click", function() {
    let jam = parseInt(inputJam.value) || 0;
    let menit = parseInt(inputMenit.value) || 0;
    if (jam === 0 && menit === 0) {
        alert("waktu tidak valid");
        return;
    }
    let totalmenit = (jam * 60) + menit;
    mulaiTimer(totalmenit);
});

btnRemind.addEventListener("click", function () { 
    if (durasimenit === 0) {
        alert("pilih waktu");
        screenAktifKe('screen1');
        return;
    }
    if (intervalBreak) {
        clearInterval(intervalBreak);
        intervalBreak = null;
    }
    sisaInDetik = durasimenit * 60;
    updateTampilanTimer();
    intervalBreak = setInterval(function() {
        sisaInDetik--;
        if (sisaInDetik <= 0) {
            clearInterval(intervalBreak);
            intervalBreak = null;
            sisaInDetik = 0;
            updateTampilanTimer();
            alert('Time is up!');
        } else {
            updateTampilanTimer();
        }
    }, 1000);
});

btnStop.addEventListener("click", function () { 
    if (intervalBreak) { 
        clearInterval(intervalBreak);
        intervalBreak = null;
    }
    sisaInDetik = 0;
    durasimenit = 0;
    angkaTimer.textContent = "00:00:00";
    inputJam.value = "0";
    inputMenit.value = "0";
    screenAktifKe('screen1');
});

inputJam.addEventListener("keydown", function(e) {
    if (isNaN(e.key) && 
        e.key !== 'Backspace' && 
        e.key !== 'Delete' && 
        e.key !== 'ArrowLeft' && 
        e.key !== 'ArrowRight' &&
        e.key !== 'ArrowUp' &&
        e.key !== 'ArrowDown') {
        e.preventDefault();
    }
});
inputMenit.addEventListener("keydown", function(e) {
    if (isNaN(e.key) && 
        e.key !== 'Backspace' && 
        e.key !== 'Delete' && 
        e.key !== 'ArrowLeft' && 
        e.key !== 'ArrowRight' &&
        e.key !== 'ArrowUp' &&
        e.key !== 'ArrowDown') {
        e.preventDefault();
    }
});
inputJam.addEventListener('input', function() {
    let val = parseInt(this.value);
    if (val > 23) this.value = 23;
    if (val < 0) this.value = 0;
    if (this.value === '') this.value = 0;
});
inputMenit.addEventListener('input', function() {
    let val = parseInt(this.value);
    if (val > 59) this.value = 59;
    if (val < 0) this.value = 0;
    if (this.value === '') this.value = 0;
});