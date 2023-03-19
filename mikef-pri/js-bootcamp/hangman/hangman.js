// 1. Convert "getStatusMessage" to a custom getter for "statusMessage"
// 2. Convert "getPuzzle" to a custom getter for "puzzle"
// 3. Change usage in app.js

class Hangman {
  constructor(word, remainingGuesses) {
    this.word = word.toLowerCase().split('');
    this.remainingGuesses = remainingGuesses;
    this.guessedLetters = [];
    this.status = 'playing';
  }
  calculateStatus() {
    const finished = this.word.every((letter) =>
      this.guessedLetters.includes(letter) || letter === ' '
    );

    if (this.remainingGuesses === 0) {
      this.status = 'failed';
    } else if (finished) {
      this.status = 'finished';
    } else {
      this.status = 'playing';
    }
  }
  get statusMessage() {
    if (this.status === 'playing') {
      return `Guesses left: ${this.remainingGuesses}`;
    } else if (this.status === 'failed') {
      return `Nice try! The word was "${this.word.join('')}".`;
    } else {
      return 'Great work! You guessed the word.';
    }
  }
  get puzzle() {
    let response = '';
    this.word.forEach((letter) => {
      if (this.guessedLetters.includes(letter) || letter === ' ') {
        response += letter;
      } else {
        response += '*';
      }
    });
    return response;
  }
  getGuess(guess) {
    guess = guess.toLowerCase();
    const isUnique = !this.guessedLetters.includes(guess);
    const isBadGuess = !this.word.includes(guess);
    if (this.status !== 'playing') {
      return;
    }
    if (isUnique) {
      this.guessedLetters.push(guess);
    }
    if (isUnique && isBadGuess) {
      this.remainingGuesses--;
    }
  
    this.calculateStatus();
  }
}
