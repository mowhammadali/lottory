const userInput = document.querySelector(".user-input");
const userInputMessage = document.querySelector(".user-input-message");
const participantMessage = document.querySelector(".participant-message");
const checkStart = document.querySelector(".check-start");
const timerMessage = document.querySelector(".timer");
const addButton = document.querySelector(".add-btn");
const deleteButton = document.querySelector(".delete-btn");
const manualStartButton = document.querySelector(".manual-start-btn");
const autoStartButton = document.querySelector(".auto-start-btn");
const deleteAllbutton = document.querySelector(".delete-all-btn");
const deleteWinners = document.querySelector(".delete-winner");
const winner = document.querySelectorAll(".winner");
const winnerSection = document.querySelector(".winners-section");
const participansSelect = document.querySelector("#participants");


let example = [];


addButton.addEventListener("click", addParticipant);
document.addEventListener("keydown" , addParticipantByEnter);
deleteButton.addEventListener("click", deleteparticipant)
manualStartButton.addEventListener("click", startManualAuto);
autoStartButton.addEventListener("click", startManualAuto);
document.addEventListener("DOMContentLoaded", getParticipantData);
document.addEventListener("click", deleteWinner);
document.addEventListener("DOMContentLoaded", getWinnersData);


    // ******BUTTONS******


function addParticipant() {
    const newParticipant = userInput.value;

    if (newParticipant == "") {
        userInputMessage.innerText = "لطفا مقداری را وارد کنید :)";
    } else {
        saveToStorage(newParticipant);
        example = JSON.parse(localStorage.getItem("participants"));

        const participant = document.createElement("option");
        participant.classList.add("participant");
        participant.setAttribute("disabled", "true");
        participant.innerText = newParticipant;

        participansSelect.appendChild(participant);

        userInput.value = "";
        userInputMessage.innerText = "";

        showAddMessage(newParticipant);
    }

}




function addParticipantByEnter(button){
    if(button.keyCode == 13){
        addParticipant();
    }
}



function deleteparticipant() {

    if (participansSelect.childNodes.length > 1) {

        showDeleteMessage(participansSelect.lastElementChild.innerText);

        deleteToStorage(participansSelect.lastElementChild.innerText);

        participansSelect.lastElementChild.remove();
    } else {
        notFinding()
    }
}



function startManualAuto(event) {

    let buttonClassName = event.target.classList[0];
    if (example.length == 0) {
        showCheckStartMessage();
    }


    if (example.length > 0) {
        setTimeout(timer, 1000);
        let counter = 10;

        function timer() {
            counter--;

            if (counter > -1) {
                timerMessage.innerText = counter;
                setTimeout(timer, 1000)
            } else {
                clearTimeout(timer);
                timerMessage.innerText = "10";
            }

        }


        setTimeout(() => {
            const randomParticipant = example[Math.floor(Math.random() * example.length)];
            saveWinnersToStorage(randomParticipant);
            example.splice(example.indexOf(randomParticipant), 1);

            const deleteWinner = document.createElement("div");
            deleteWinner.classList.add("delete-winner");

            const trash = document.createElement("i");
            trash.classList.add("bi");
            trash.classList.add("bi-trash");
            deleteWinner.appendChild(trash);

            const winnerName = document.createElement("div");
            winnerName.classList.add("winner-name")
            winnerName.innerText = randomParticipant;

            const winner = document.createElement("div");
            winner.classList.add("winner");
            winner.appendChild(deleteWinner);
            winner.appendChild(winnerName);


            winnerSection.appendChild(winner);


            if (example.length > 0 && buttonClassName == "auto-start-btn") {
                startManualAuto(event);
            }

        }, 10000)


    }
}




function deleteWinner(event) {
    const parent = event.target.parentElement;

    if (parent.className == "winner") {
        deleteWinnersToStorage(parent.childNodes[1].innerText);
        example.push(parent.childNodes[1].innerText);
        parent.remove();
    }
}


    // ******MESSAGES******


function showAddMessage(participant) {
    participantMessage.style.color = "#1e974d";
    participantMessage.innerText = `${participant} به لیست اضافه شد`;

    setTimeout(function () {
        participantMessage.innerText = "";
    }, 3000);


}


function showDeleteMessage(participant) {
    participantMessage.style.color = "red";
    participantMessage.innerText = `${participant} از لیست حذف شد`;

    setTimeout(function () {
        participantMessage.innerText = "";
    }, 3000);
}


function showCheckStartMessage() {
    checkStart.innerText = "موردی برای قرعه کشی یافت نشد";

    setTimeout(() => {
        checkStart.innerText = "";
    }, 3000)
}


function notFinding() {
    participantMessage.style.color = "#ff8800";
    participantMessage.innerText = "موردی یافت نشد";

    setTimeout(() => {
        participantMessage.innerText = "";
    }, 4000);
}


    // ******LOCAL STORAGES******


function saveToStorage(participant) {
    let participants;

    if (localStorage.getItem("participants") == null) {
        participants = [];
    } else {
        participants = JSON.parse(localStorage.getItem("participants"));
    }

    participants.push(participant);

    localStorage.setItem("participants", JSON.stringify(participants));
}




function saveWinnersToStorage(winner) {
    let winners;

    if (localStorage.getItem("winners") == null) {
        winners = [];
    } else {
        winners = JSON.parse(localStorage.getItem("winners"));
    }

    winners.push(winner);

    localStorage.setItem("winners", JSON.stringify(winners));
}



function deleteToStorage(participant) {
    let participants;

    if (localStorage.getItem("participants") == null) {
        participants = [];
    } else {
        participants = JSON.parse(localStorage.getItem("participants"));
    }

    participants.splice(participants.indexOf(participant), 1);

    localStorage.setItem("participants", JSON.stringify(participants));
}



function deleteWinnersToStorage(winner) {
    let winners;

    if (localStorage.getItem("winners") == null) {
        winners = [];
    } else {
        winners = JSON.parse(localStorage.getItem("winners"));
    }

    winners.splice(winners.indexOf(winner), 1);

    localStorage.setItem("winners", JSON.stringify(winners));
}



    // ******RESTORE DATA******



function getParticipantData() {
    let participants;

    if (localStorage.getItem("participants") == null) {
        participants = [];
    } else {
        participants = JSON.parse(localStorage.getItem("participants"));
    }

    participants.forEach((item) => {

        const participant = document.createElement("option");
        participant.classList.add("participant");
        participant.setAttribute("disabled", "true");
        participant.innerText = item;

        participansSelect.appendChild(participant);

        userInput.value = "";
        userInputMessage.innerText = "";
    })
}



function getWinnersData() {
    let winners;

    if (localStorage.getItem("winners") == null) {
        winners = [];
    } else {
        winners = JSON.parse(localStorage.getItem("winners"));
    }


    winners.forEach(item => {
        const deleteWinner = document.createElement("div");
        deleteWinner.classList.add("delete-winner");

        const trash = document.createElement("i");
        trash.classList.add("bi");
        trash.classList.add("bi-trash");
        deleteWinner.appendChild(trash);

        const winnerName = document.createElement("div");
        winnerName.classList.add("winner-name")
        winnerName.innerText = item;

        const winner = document.createElement("div");
        winner.classList.add("winner");
        winner.appendChild(deleteWinner);
        winner.appendChild(winnerName);


        winnerSection.appendChild(winner);
    })
}