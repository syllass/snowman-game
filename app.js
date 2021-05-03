const inputWord = document.querySelector('#word');
const playButton = document.querySelector('.play');
const newGameButton1 = document.querySelector('.one');
const newGameButton2 = document.querySelector('.two');
const categories = document.querySelector('.categories');
const guessButton = document.querySelector('.guess-letter');
const playArea = document.querySelector('.play-area');
const newGameSection = document.querySelector('.new-game');
const enterWordSection = document.querySelector('.enter-word');
const gameSection = document.querySelector('.game');
const wordError = document.querySelector('.word-error');
const letterError = document.querySelector('.letter-error');
const letterListInput = document.querySelector('.letter-list-input');
const letterGuess = document.querySelector('.letter-guess-input');
const chancesLeft = document.querySelector('.chances');
const olaf = document.querySelector('#snowman');
const movieButton = document.querySelector('.movies');
let guessCounter;

newGameButton2.addEventListener('click', (e) => {
	e.preventDefault();

	newGameSection.style.display = 'none';
	newGameSection.style.pointerEvents = 'none';
	enterWordSection.style.display = 'block';
	enterWordSection.style.pointerEvents = 'auto';

	wordError.innerText = '';
	inputWord.focus();
});

newGameButton1.addEventListener('click', (e) => {
	e.preventDefault();

	newGameSection.style.display = 'none';
	newGameSection.style.pointerEvents = 'none';
	categories.style.display = 'block';
	categories.style.pointerEvents = 'auto';
});

playButton.addEventListener('click', (e) => {
	e.preventDefault();

	const validLetters = /^[A-Za-z]+$/;
	if (!inputWord.value || !inputWord.value.match(validLetters)) {
		return (wordError.innerText = 'Please enter a valid word');
	}

	enterWordSection.style.display = 'none';
	enterWordSection.style.pointerEvents = 'none';
	gameSection.style.display = 'flex';
	gameSection.style.pointerEvents = 'auto';

	snowman.src = './olaf_cropped.jpg';
	letterListInput.value = '';

	chancesLeft.innerText = 'Start guessing letters before I melt!';
	guessCounter = 5;
	while (playArea.firstChild) {
		playArea.removeChild(playArea.firstChild);
	}

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
	letterGuess.focus();
});

movieButton.addEventListener('click', (e) => {
	e.preventDefault();

	categories.style.display = 'none';
	categories.style.pointerEvents = 'none';
	gameSection.style.display = 'flex';
	gameSection.style.pointerEvents = 'auto';

	snowman.src = './olaf_cropped.jpg';
	letterListInput.value = '';

	chancesLeft.innerText = 'Start guessing letters before I melt!';
	guessCounter = 5;
	while (playArea.firstChild) {
		playArea.removeChild(playArea.firstChild);
	}

	let random19 = Math.floor(Math.random() * 19) + 1;
	let random49 = Math.floor(Math.random() * 49) + 1;

	fetch(
		`https://api.themoviedb.org/3/discover/movie?api_key=800822ae637e157f1e35a9afa1d01fb3&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${random49}&with_original_language=en&with_watch_monetization_types=flatrate`
	)
		.then((res) => res.json())
		.then((data) => {
			console.log(data.results[random19].title);
			const validLetters = /^[A-Za-z]+$/;
			const wordArray = data.results[random19].title.split('');
			wordArray.forEach((letter) => {
				const div = document.createElement('div');
				div.classList.add('letters');
				const p = document.createElement('p');
				p.classList.add('letter');
				p.innerText = letter;
				p.style.fontSize = '36px';
				if (!letter.match(validLetters)) {
					p.style.opacity = '1';
					div.id = 'not';
					div.appendChild(p);
				} else {
					p.style.opacity = '0';
					div.appendChild(p);
				}
				playArea.appendChild(div);
			});
		});

	letterGuess.focus();
});

guessButton.addEventListener('click', (e) => {
	e.preventDefault();

	if (letterError.innerText) {
		letterError.innerText = '';
	}

	// Error handling
	const validLetters = /^[A-Za-z]+$/;
	if (!letterGuess.value || !letterGuess.value.match(validLetters)) {
		letterGuess.value = '';
		letterGuess.focus();
		return (letterError.innerText = 'Please enter a valid letter');
	}

	const letterElements = document.getElementsByClassName('letter');

	// Loop over each letter in the word and store in array
	const letters = [];
	for (let i = 0; i < letterElements.length; i++) {
		letters.push(letterElements[i].innerText);
	}

	// If player guesses a correct letter
	if (
		letters.includes(letterGuess.value.toLowerCase()) ||
		letters.includes(letterGuess.value.toUpperCase())
	) {
		for (let i = 0; i < letterElements.length; i++) {
			if (
				letterElements[i].innerText.toLowerCase() ==
				letterGuess.value.toLowerCase()
			) {
				letterElements[i].style.opacity = 1;
			}
		}
		// Check if player won
		const checkWinArray = [];
		for (let i = 0; i < letterElements.length; i++) {
			checkWinArray.push(letterElements[i].style.opacity);
		}
		const checkWin = checkWinArray.every((value) => value == '1');

		// If player won
		if (checkWin) {
			chancesLeft.innerText = 'YOU SAVED ME FROM MELTING!!!';
			snowman.src = './olaf_flurry.gif';
			// Back to New Game page
			setTimeout(() => {
				gameSection.style.display = 'none';
				gameSection.style.pointerEvents = 'none';
				newGameSection.style.display = 'flex';
				newGameSection.style.pointerEvents = 'auto';
				inputWord.value = '';
			}, 5000);
		}
		// If player guesses an incorrect letter
	} else if (!letterListInput.value.includes(letterGuess.value)) {
		letterListInput.value += letterGuess.value;
		// Game over
		if (guessCounter == 0) {
			chancesLeft.innerText = 'Game Over';
			for (let i = 0; i < letterElements.length; i++) {
				letterElements[i].style.opacity = 1;
			}
			// Back to New Game page
			setTimeout(() => {
				gameSection.style.display = 'none';
				gameSection.style.pointerEvents = 'none';
				newGameSection.style.display = 'flex';
				newGameSection.style.pointerEvents = 'auto';
				inputWord.value = '';
			}, 5000);
		}

		if (guessCounter == 5) {
			chancesLeft.innerText = 'Oh no my feet have melted';
			snowman.src = './olaf_nofeet.png';
		} else if (guessCounter == 4) {
			chancesLeft.innerText = 'Uh oh there goes my body';
			snowman.src = './olaf_nobody.png';
		} else if (guessCounter == 3) {
			chancesLeft.innerText = "I didn't need both arms anyways";
			snowman.src = './olaf_leftarm.jpg';
		} else if (guessCounter == 2) {
			chancesLeft.innerText = 'Or any arms at all';
			snowman.src = './olaf_noarms.jpg';
		} else if (guessCounter == 1) {
			chancesLeft.innerText = "Last chance! Please don't let me melt!";
			snowman.src = './olaf_head.jpg';
		}
		guessCounter--;
		// If player guesses the same letter that they've already guessed
	} else {
		letterError.innerHTML =
			"You've already tried that letter. <br> Guess a different letter!";
	}

	// Clear input
	letterGuess.value = '';
	letterGuess.focus();
});
