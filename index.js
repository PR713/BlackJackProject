let myCards = []
let dealerCards = []
let mySum = 0
let dealerSum = 0
let hasBlackJack = false
let isAlive = true
let hasStand = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let newCardBtn = document.getElementById("new-card-btn")
let startBtn = document.getElementById("start-btn")
let standBtn = document.getElementById("stand-btn")
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
    hasStand = false
    message = ""
    newCardBtn.disabled = false
    startBtn.disabled = true
    standBtn.disabled = false
    playerEl.textContent = player.name + ": $" + player.chips
    //w react useState samo aktualizuje rerenderując komponent...
    // a tutaj musimy ręcznie zaktualizować widok...

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
    renderCardsAndValue()

    if (mySum > 21) {
        endGame("You lost!", -1)
    } else if (dealerSum > 21) {
        endGame("You won!", 2)
    } else if (hasStand) {
        if (dealerSum < 17) {
            newCard()
        } else {
            if (mySum > dealerSum) {
                if (myCards.length === 2 && mySum === 21) {
                    endGame("You won with BlackJack!", 2.5)
                } else {
                    endGame("You won!", 2)
                }
            } else if (mySum === dealerSum) {
                if (myCards.length === 2 && mySum === 21) {
                    if (dealerCards.length === 2 && dealerSum === 21) {
                        endGame("It's a draw with BlackJack!", 1)
                    } else {
                        endGame("You won with BlackJack!", 2.5)
                    }// dealer has 21 but not BlackJack
                } else if (dealerCards.length === 2 && dealerSum === 21) {
                    endGame("You lost!", -1)
                } else {
                    endGame("It's a draw!", 1)
                }
            } else { //mySum < dealerSum but dealerSum <= 21 so I lost
                endGame("You lost!", -1)
            }
        }
    } else {
        messageEl.textContent = "Do you want to draw a new card?"
    }
}


    function renderCardsAndValue() {
        cardsEl.textContent = ""
        for (let i = 0; i < myCards.length; i++) {
            cardsEl.textContent += " " + myCards[i]
        }

        cardElDealer.textContent = ""
        for (let i = 0; i < dealerCards.length; i++) {
            cardElDealer.textContent += " " + dealerCards[i]
        }

        sumEl.textContent = "Value: " + mySum
        sumElDealer.textContent = "Value: " + dealerSum
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
        if (!hasStand) {
            let myNextCard = getRandomCard()
            myCards.push(myNextCard)
            mySum += myNextCard
            renderGame()
        } else { //hasStand true
            while (dealerSum < 17) { //mySum <= 21
                let dealerNextCard = getRandomCard()
                dealerCards.push(dealerNextCard)
                dealerSum += dealerNextCard
            }
            renderGame()
        }
    }


    function stand() {
        hasStand = true
        renderGame()
    }


    function endGame(message, multiplier) {
        if (multiplier < 0) {
            player.chips = 0
        } else {
            player.chips *= multiplier
        }
        playerEl.textContent = player.name + ": $" + player.chips
        messageEl.textContent = message
        newCardBtn.disabled = true
        startBtn.disabled = false
        standBtn.disabled = true
    }