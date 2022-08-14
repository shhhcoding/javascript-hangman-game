const ALPAHBET_ARRAY = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const WORDS_ARRAY = ["HELLO", "QUESTION", "HANGMAN", "JAVASCRIPT", "CODING"];
const MAX_ERROR_COUNT = 6;
const LETTER_SPACE_CONTAINER = document.querySelector(
  ".letter-space-container"
);
const LETTER_BUTTON_CONTAINER = document.querySelector(
  ".letter-button-container"
);
let randomWordCharArray = undefined;
let errorCounter = 1;

const WORD_CONTAINER = document.querySelector(".word-container");

const initGame = () => {
  setRandomWord();
  createWordSpaces();
  createAlphabetButtons();
};

const setRandomWord = () => {
  // Get word from WORDS_ARRAY randomly
  let randomWord = WORDS_ARRAY[Math.floor(Math.random() * WORDS_ARRAY.length)];
  randomWordCharArray = randomWord.toUpperCase().split("");
};

const createWordSpaces = () => {
  randomWordCharArray.forEach((e) => {
    let space = document.createElement("div");
    space.classList.add(`space-${e}`);
    space.innerHTML = "_";
    LETTER_SPACE_CONTAINER.append(space);
  });
};

const createAlphabetButtons = () => {
  ALPAHBET_ARRAY.forEach((e) => {
    let letterDiv = document.createElement("div");
    letterDiv.classList.add("letter-div");
    let letterBtn = document.createElement("button");
    letterBtn.classList.add("letter-button");
    letterBtn.id = e;
    letterBtn.innerText = e;
    letterBtn.addEventListener("click", onLetterSelect);
    letterDiv.append(letterBtn);
    LETTER_BUTTON_CONTAINER.append(letterDiv);
  });
};

const onLetterSelect = (e) => {
  let selectedLetter = e.target.innerText;
  if (randomWordCharArray.indexOf(selectedLetter) !== -1) {
    let letterElems = document.querySelectorAll(`.space-${selectedLetter}`);
    letterElems.forEach((el) => {
      el.innerText = selectedLetter;
    });
  } else {
    let hangmanBodyPart = document.querySelectorAll(
      `.hangman-body-part-${errorCounter}`
    );
    hangmanBodyPart[0].style.display = "block";
    if (errorCounter == MAX_ERROR_COUNT) {
      LETTER_SPACE_CONTAINER.innerHTML = "YOU LOST! REFRESH TO PLAY AGAIN!";
      document.querySelectorAll(".letter-button").forEach((button) => {
        button.disabled = true;
      });
    }
    errorCounter++;
  }
  document.querySelector(`#${selectedLetter}`).disabled = true;
};

initGame();
