let myCards = []
let dealerCards = []
let mySum = 0
let dealerSum = 0
let hasBlackJack = false
let isAlive = true
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let newCardBtn = document.getElementById("new-card-btn")
let startBtn = document.getElementById("start-btn")
let cardElDealer = document.getElementById("cards-el-dealer")
let sumElDealer = document.getElementById("sum-el-dealer")


let player = {
    name: "Radek",
    chips: 145
}

let playerEl = document.getElementById("player-el")
playerEl.textContent = player.name + ": $" + player.chips

function startGame() {
    myCards = []
    mySum = 0
    dealerCards = []
    dealerSum = 0
    hasBlackJack = false
    isAlive = true
    message = ""
    newCardBtn.disabled = false
    startBtn.disabled = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    let firstDealerCard = getRandomCard()
    mySum = firstCard + secondCard
    myCards = [firstCard, secondCard]

    dealerSum = firstDealerCard
    dealerCards = [firstDealerCard]
    renderGame()
}

function renderGame() {
    cardsEl.textContent = ""
    for (i = 0; i < myCards.length; i++) {
        cardsEl.textContent += " " + myCards[i]
    }

    cardElDealer.textContent = ""
    for (i = 0; i < dealerCards.length; i++) {
        cardElDealer.textContent += " " + dealerCards[i]
    }

    sumEl.textContent = "Value: " + mySum
    sumElDealer.textContent = "Value: " + dealerSum


    if (mySum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (mySum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        startBtn.disabled = false
        newCardBtn.disabled = true
    } else {
        message = "You're out of the game!"
        isAlive = false
        newCardBtn.disabled = true
        startBtn.disabled = false

    }
    messageEl.textContent = message
}


function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}


function newCard() {
    let myNextCard = getRandomCard()
    let dealerNextCard = getRandomCard()
    myCards.push(myNextCard)
    mySum += myNextCard
    dealerCards.push(dealerNextCard)
    dealerSum += dealerNextCard
    renderGame()
}