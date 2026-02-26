document.addEventListener("DOMContentLoaded", () => {
    const localstorage = muatLocalStorage();
    const nameElement = document.getElementById("random-name");
    // nameElement.textContent = getRandomName();
    let savedName = localStorage.getItem('nama');
    if (savedName) {
        nameElement.textContent = savedName;
        namaSekarang = savedName;
    } else {
        const namaBaru = getRandomName();
        nameElement.textContent = namaBaru;
        namaSekarang = namaBaru;
        localStorage.setItem('nama', namaBaru);
    }
    if (!localstorage) {
        screenAktifKe('screen1');
    }
});
let namaSekarang = ""; 
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
const btnPause = document.querySelector(".btn-pause");
const btnRemind = document.querySelector(".btn-remind");
const btnStop = document.querySelector(".btn-stop");

const timeup_alert = document.querySelector(".alert");

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
timeup_alert.classList.add("hidden");

function mulaiTimer(menit) {
    durasimenit = menit;
    sisaInDetik = durasimenit * 60;
    timerPause = false
    if (btnPause) btnPause.textContent = "PAUSE"
    if (intervalBreak) {
        clearInterval(intervalBreak);
        intervalBreak = null;
    }
    updateTampilanTimer();
    resetTimer();
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

let timerPause = false
let sisaSaatPause = 0
const alarm = new Audio('./assets/mp3/alarm.mp3')
function playAlarm() {
    alarm.play();
    alarm.loop = true
    alarm.volume = 1;
} 
function stopAlarm() {
    alarm.pause();
}
function pauseTimer() {
    if (intervalBreak) { 
        clearInterval(intervalBreak);
        intervalBreak = null;
        timerPause = true;
        sisaSaatPause = sisaInDetik;
        document.querySelector(".btn-pause").textContent = "RESUME"
        console.log('paus')
        console.log(sisaSaatPause)
    }
}
function resumeTimer() {
    if (timerPause) {
        resetTimer();
    }
}
function resetTimer() {
    timerPause = false;
    if (btnPause) btnPause.textContent = 'PAUSE';
    intervalBreak = setInterval(() => {
        sisaInDetik--;
        if (sisaInDetik <= 0) {
            clearInterval(intervalBreak);
            intervalBreak = null;
            sisaInDetik = 0;
            updateTampilanTimer();
            timeup_alert.classList.remove("hidden");
            // alert("cek waktu habis");
            playAlarm();
            angkaTimer.textContent = "00:00:00";
            localStorage.removeItem('timerData');
            localStorage.removeItem('nama');
        } else {
            updateTampilanTimer();
            simpanLocalStorage();
        }
    }, 1000);
}
btnPause.addEventListener("click", function () {
    if (!timerPause) {
        pauseTimer();
    } else {
        resumeTimer();
    }
})

btn5.addEventListener("click", () => { 
    let displayMenit = parseInt(btn5.textContent);
    mulaiTimer(displayMenit);
    simpanLocalStorage();
});

btn10.addEventListener("click", () => { 
    let displayMenit = parseInt(btn10.textContent);
    mulaiTimer(displayMenit);
    simpanLocalStorage();
});

btn15.addEventListener("click", () => { 
    let displayMenit = parseInt(btn15.textContent);
    mulaiTimer(displayMenit);
    simpanLocalStorage();
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
    simpanLocalStorage();
});

btnRemind.addEventListener("click", function () { 
    stopAlarm();
    timeup_alert.classList.add("hidden");
    if (durasimenit === 0) {
        alert("pilih waktu");
        screenAktifKe('screen1');
        return;
    }
    if (intervalBreak) {
        clearInterval(intervalBreak);
        intervalBreak = null;
    }
    timerPause = false;
    if (btnPause) btnPause.textContent = 'PAUSE';
    sisaInDetik = durasimenit * 60;
    updateTampilanTimer();
    resetTimer();
    simpanLocalStorage();
});

btnStop.addEventListener("click", function () { 
    stopAlarm();
    timeup_alert.classList.add("hidden");
    if (intervalBreak) { 
        clearInterval(intervalBreak);
        intervalBreak = null;
    }
    timerPause = false;
    if (btnPause) btnPause.textContent = 'PAUSE';
    localStorage.removeItem('timerData');
    localStorage.removeItem('nama');
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

function simpanLocalStorage() {
    const data = {
        durasi: durasimenit,
        sisa: sisaInDetik,
        screen: screenAktif === screen1 ? 'screen1' :
            screenAktif === screen2 ? 'screen2' : 'screen3',
        waktuSimpan: Date.now(),
        totalAwal: durasimenit * 60,
        nama: namaSekarang,
        isPaused: timerPause,
        sisaWaktuPause: sisaSaatPause
    };
    const dataString = JSON.stringify(data);
    localStorage.setItem('timerData', dataString);

    console.log('simpan yes')
    console.log(data)
}

function muatLocalStorage() {
    const dataString = localStorage.getItem('timerData');
    if (!dataString) {
        console.log('ls kosong')
        return
    }
    const data = JSON.parse(dataString);
    console.log('mau muat')
    console.log(data)

    const waktuSekarang = Date.now();
    const waktuTimerJalan = (waktuSekarang - data.waktuSimpan) / (1000 * 60 * 60)
    if (waktuTimerJalan >24) {
        localStorage.removeItem('timerData');
        localStorage.removeItem('nama');
        return false;
    }
    if (data.isPaused) { 
        timerPause = true;
        if (btnPause) btnPause.textContent = 'RESUME';
    } else {
        timerPause = false;
        if (btnPause) btnPause.textContent = 'PAUSE';
    }

    const selisihDetik = Math.floor((waktuSekarang - data.waktuSimpan) / 1000);
    let sisaWaktuBaru = data.sisa - selisihDetik;
    if (sisaWaktuBaru <=0) {
        console.log('wktu habis')
        durasimenit = data.durasi
        sisaInDetik = 0;
        updateTampilanTimer();
        playAlarm();
        timeup_alert.classList.remove("hidden");
        return true
    }

    durasimenit = data.durasi;
    sisaInDetik = sisaWaktuBaru;
    updateTampilanTimer();
    screenAktifKe(data.screen)
    if (intervalBreak) {
        clearInterval(intervalBreak);
        intervalBreak = null;
    }
    resetTimer()
    return true

}