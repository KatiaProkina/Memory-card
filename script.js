const cards = document.querySelectorAll(".memory-card");
const button = document.querySelector(".btn");
let hasFlippedCard = false;
let boardLocked = false;
let firstCard;
let secondCard;
const flipCard = (e) => {
  if (boardLocked) return;
  const target = e.target.parentElement;
  if (target === firstCard) return;
  target.classList.add("flip");

  console.log("framework", target.dataset.framework);
  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = target;
  } else {
    // second click
    hasFlippedCard = false;
    secondCard = target;

    // //check for match
    checkForMatch();
  }
};

const checkForMatch = () => {
  const isEqual = firstCard.dataset.framework === secondCard.dataset.framework;
  isEqual ? disabledCards() : unflipCards();
};
const disabledCards = () => {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
};

const unflipCards = () => {
  boardLocked = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
};

const resetBoard = () => {
  hasFlippedCard = boardLocked = false;
  firstCard = secondCard = null;
};
cards.forEach((card) => {
  //Add Event Listener to every card
  card.addEventListener("click", flipCard);

  const randomIndex = Math.floor(Math.random() * cards.length);
  card.style.order = randomIndex;
});

button.addEventListener("click", function () {
  firstCard.classList.remove("flip");
  secondCard.classList.remove("flip");
  resetBoard();
});
