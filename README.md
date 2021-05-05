Player 1 enters a word. That word is then indicated by empty spaces totaling the number of letters in the given word. Player 2 must guess letters. If the letter guessed is in the word, then the empty space becomes that letter. If the letter guessed is not in the word, then a new part of the snowman in the UI gets added. Once Player 2 guesses incorrectly 5 times, the snowman is complete and Player 1 wins. If Player 2 guesses all of the letters in the word, Player 2 wins.

Wire Frames
Screen Shot 2021-04-29 at 9 32 27 AM
Screen Shot 2021-04-29 at 9 40 09 AM

User Stories
As a player, I want to know which letters I have already guessed so I don't try to guess the same letter.
As a player, I want to know how many guesses I have left until I lose the game.
As a player, I want to be able to play the game without entering a word, so that I can play by myself.
As a player, I want to visualize which letters I have tried and which ones I can still try.

MVP Goals
Player can enter a word. The number of letters in the given word are indicated by spaces (underscores, lines, etc). Another player can guess letters by pressing a letter on the keyboard. If the letter pressed is found in the word, the empty space is filled by that letter. If the letter pressed is not found in the word, that letter gets added to a list displayed on the UI and a new part of the snowman gets built/is displayed/etc.

Error handling - if the player tries to enter a letter already guessed, display a message, etc

Stretch Goals
Generate a random word so that one player can play the game. (add phrases)
Multiple words or sentences.
Create a keyboard on the GUI to display which letters have been tried. Also allows users to click the letters as buttons rather than entering a letter in an input text box.
