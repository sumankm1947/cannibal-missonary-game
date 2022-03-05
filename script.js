// get elements
const person1 = document.getElementById("person-1")
const person2 = document.getElementById("person-2")
const cannibals = document.getElementsByClassName("cannibal")
const missonaries = document.getElementsByClassName("missonary")
const btn = document.querySelector(".btn");
const boat = document.querySelector(".boat");
const modal = document.querySelector(".modal")
const replay = document.querySelector(".replay")


// reset info
let personInBoat;
const cannibalPosition = [1, 1, 1, -1, -1, -1]; 
const missonaryPosition = [1, 1, 1, -1, -1, -1]; 
let boatPosition; // -1 => left bank; 1 => right bank
let bank = 'l';

const makeCanMissHide = () => {
    for(let i = 0; i < 6; i++) {
        if (cannibalPosition[i] == 1) {
            cannibals[i].classList.remove("hide")
        }
        else {
            cannibals[i].classList.add("hide")
        }
        if (missonaryPosition[i] == 1) {
            missonaries[i].classList.remove("hide")
        }
        else {
            missonaries[i].classList.add("hide")
        }
    }
}

const initialState = () => {
    console.log("STARTING");
    modal.classList.add("hide")
    personInBoat = 0;
    boatPosition = -1;
    bank = 'l';
    for (let i = 0; i < 3; i++) {
        cannibalPosition[i] = 1;
        missonaryPosition[i] = 1;
    }
    for (let i = 3; i < 6; i++) {
        cannibalPosition[i] = -1;
        missonaryPosition[i] = -1;
    }
    makeCanMissHide();
    boat.classList.add("left");
    boat.classList.remove("right")
}

initialState();

// check for win
const checkWin = () => {
    let canScore = 0, misScore = 0;
    for (let i = 0; i < 3; i++) {
        canScore += cannibalPosition[i];
        misScore += missonaryPosition[i];   
    }
    if (canScore > misScore && misScore !== -3) return -1;
    canScore = 0;
    misScore = 0;
    for (let i = 3; i < 6; i++) {
        canScore += cannibalPosition[i];
        misScore += missonaryPosition[i];   
    }
    if (canScore > misScore && misScore !== -3) return -1;
    if (canScore === 3 && misScore === 3) return 1;
    return 0;
}

// bank to boat
const bankToBoat = (e, i, str) => {
    if (personInBoat < 2) {
        (str === "cannibal") ? cannibalPosition[i] = -1 : missonaryPosition[i] = -1;

        if (personInBoat === 0)
            person1.classList.add(`${str}`)
        else {
            if (person1.classList.contains("cannibal") || person1.classList.contains("missonary"))
                person2.classList.add(`${str}`)
            else 
                person1.classList.add(`${str}`)
        }
        e.target.classList.add("hide")
        personInBoat += 1;
    }
    // console.log(cannibalPosition);
}

for(let i = 0; i < 6; i++) {
    cannibals[i].addEventListener("click", (e) => {
        bankToBoat(e, i, "cannibal");
    })
};

for(let i = 0; i < 6; i++) {
    missonaries[i].addEventListener("click", (e) => {
       bankToBoat(e, i, "missonary");
    })
};

// boat to bank
const boatToBank = (e) => {
    bank = (boatPosition === -1) ? 'l' : 'r';
    if (e.target.classList.contains("cannibal")) {
        if (boatPosition === -1) {
            for (let j = 0; j < 3; j++) {
                if (cannibalPosition[j] !== 1) {
                    document.querySelector(`.${bank}c-${j+1}`).classList.add("cannibal")
                    document.querySelector(`.${bank}c-${j+1}`).classList.remove("hide")
                    cannibalPosition[j] = 1;
                    break;
                }
            }
        }
        else {
            for (let j = 3; j < 6; j++) {
                if (cannibalPosition[j] !== 1) {
                    document.querySelector(`.${bank}c-${j-2}`).classList.add("cannibal")
                    document.querySelector(`.${bank}c-${j-2}`).classList.remove("hide")
                    cannibalPosition[j] = 1;
                    break;
                }
            }
        }
        e.target.classList.remove("cannibal")
    }
    else if (e.target.classList.contains("missonary")) {
        if (boatPosition === -1) {
            for (let j = 0; j < 3; j++) {
                if (missonaryPosition[j] !== 1) {
                    document.querySelector(`.${bank}m-${j+1}`).classList.add("missonary")
                    document.querySelector(`.${bank}m-${j+1}`).classList.remove("hide")
                    missonaryPosition[j] = 1;
                    break;
                }
            }
        }
        else {
            for (let j = 3; j < 6; j++) {
                if (missonaryPosition[j] !== 1) {
                    document.querySelector(`.${bank}m-${j-2}`).classList.add("missonary")
                    document.querySelector(`.${bank}m-${j-2}`).classList.remove("hide")
                    missonaryPosition[j] = 1;
                    break;
                }
            }
        }
        e.target.classList.remove("missonary")
    }
    personInBoat -= 1;
}

person1.addEventListener("click", (e) => {
    // console.log(missonaryPosition, cannibalPosition)
    boatToBank(e);
    // console.log(missonaryPosition, cannibalPosition)
})

person2.addEventListener("click", (e) => {
    // console.log(missonaryPosition, cannibalPosition)
    boatToBank(e);
    // console.log(missonaryPosition, cannibalPosition)
})

// Change the bank 
btn.addEventListener("click", (e) => {
    if (personInBoat > 0) {
        boat.classList.toggle("left");
        boat.classList.toggle("right")
        person1.classList.toggle("p-1-left")
        person1.classList.toggle("p-1-right")
        person2.classList.toggle("p-2-left")
        person2.classList.toggle("p-2-right")
        boatPosition = (boatPosition === 1) ? -1 : 1;
        // console.log(missonaryPosition, cannibalPosition);
    }
    const ans = checkWin();
    if (ans === -1) {
        modal.children[0].textContent = "YOU LOSE"
        modal.classList.remove("hide")
    } else if (ans === 1) {
        modal.children[0].textContent = "YOU WIN"
        modal.classList.remove("hide")
        // console.log("WIN");
    }
})


// Replay
replay.addEventListener("click", (e) => {
    person1.classList.remove("cannibal", "missonary", "p-1-right")
    person2.classList.remove("cannibal", "missonary", "p-2-right")
    person1.classList.add("p-1-left")
    person2.classList.add("p-2-left")
    initialState();
})