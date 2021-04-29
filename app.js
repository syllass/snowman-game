const inputWord = document.querySelector('#word');
const playButton = document.querySelector('.play');
const newGameButton = document.querySelector('.new-game-button');
const guessButton = document.querySelector('.guess-letter');
const playArea = document.querySelector('.play-area');
const newGameSection = document.querySelector('.new-game');
const enterWordSection = document.querySelector('.enter-word');
const gameSection = document.querySelector('.game');
const wordError = document.querySelector('.word-error');
const letterListInput = document.querySelector('.letter-list-input');
const letterGuess = document.querySelector('.letter-guess-input');

newGameButton.addEventListener('click', (e) => {
	e.preventDefault();

	newGameSection.style.opacity = 0;
	newGameSection.style.pointerEvents = 'none';
	enterWordSection.style.opacity = 1;
	enterWordSection.style.pointerEvents = 'auto';
});

playButton.addEventListener('click', (e) => {
	e.preventDefault();

	const validLetters = /^[A-Za-z]+$/;
	if (!inputWord.value || !inputWord.value.match(validLetters)) {
		return (wordError.innerText = 'Please enter a valid word');
	}

	enterWordSection.style.opacity = 0;
	enterWordSection.style.pointerEvents = 'none';
	gameSection.style.opacity = 1;
	gameSection.style.pointerEvents = 'auto';

	letterListInput.value = '';

	const wordArray = inputWord.value.split('');
	wordArray.forEach((letter) => {
		const div = document.createElement('div');
		div.classList.add('letters');
		const p = document.createElement('p');
		p.classList.add('letter');
		p.innerText = letter;
		p.style.fontSize = '36px';
		p.style.opacity = '0';
		div.appendChild(p);
		playArea.appendChild(div);
	});
});

guessButton.addEventListener('click', (e) => {
	e.preventDefault();

	if (letterListInput.value.includes(letterGuess.value)) {
	}

	const letterElements = document.getElementsByClassName('letter');

	// Loop over each letter in the word and store in array
	const letters = [];
	for (let i = 0; i < letterElements.length; i++) {
		letters.push(letterElements[i].innerText);
	}

	if (letters.includes(letterGuess.value)) {
		for (let i = 0; i < letterElements.length; i++) {
			if (letterElements[i].innerText == letterGuess.value) {
				letterElements[i].style.opacity = 1;
			}
		}
	} else {
		letterListInput.value += letterGuess.value;
	}

	// Clear input
	letterGuess.value = '';
});
