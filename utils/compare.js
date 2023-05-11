const compare = (guessedWord, secretWord, gameData, words) => {
  /**
   * returns count of common
   * letters in two strings
   */
  const getCommonLetters = (guessedWord, secretWord) => {
    let count = 0;
    const charArray = guessedWord.split("");
    for (letter of secretWord) {
      let index = charArray.findIndex((char) => char === letter);
      if (index >= 0) {
        count++;
        charArray.splice(index, 1);
      }
    }
    return count;
  };

  const guessedWordRegex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; //pattern for special character check
  const containsSplChars = guessedWordRegex.test(guessedWord); // returns true if special character is present

  /**
   * everytime a new word is guessed. it is stored in the array to maintain stats.
   * This is to check if there is a guessed word already existing in the array to
   * prevent storing duplicate value
   */
  const guessObj = gameData.find((data) => data.guessedWord === guessedWord);

  let guessType = ""; //for maintaining game stats
  let guessDesc = ""; //for maintaining game stats

  let message = ""; //to display the message after successful guess

  if (guessedWord === secretWord) {
    /**
     * This is the case when guessed word and secret word are both equal.
     * This retuns correct guessType
     */

    guessType = "correct";
    guessDesc = "correct guess means a valid guess that IS the secret word";

    if (gameData.length === 0) {
      /**
       *  after processing every guess, the guess is added to the stats array.
       *  If the guess is correct and stats array is empty, then the correct guess has been made in the 1st attempt
       */
      message += `Well Done. You won the game in your first attempt!!!`;
    } else {
      /**
       * We reset the stats array after the correct guess has been made.
       * So count of records till the correct guess record gives the number of attempts
       */

      message += `You won the game after ${gameData.length} ${
        gameData.length === 1 ? "attempt" : "attempts"
      }!!!`;
    }
  } else if (containsSplChars || guessedWord.trim() === "") {
    /**
     * If there is a special character, then the guess is invalid
     * and the count keeps on incrementing even if the same character is given as input
     */

    guessType = "invalid";
    guessDesc =
      "invalid guess means a guess that is not one of remaining possible words";
  } else if (!words.includes(guessedWord)) {
    /**
     * If there is no special character and if the word doesn't exist in the wordlist,
     * then that's an incorrect guess. At this condition, there will be no possibility of having a special character
     */

    guessType = "incorrect";
    guessDesc =
      "incorrect guess means a valid guess that is not the secret word";
  } else if (words.includes(guessedWord) && !guessObj) {
    /**
     * If the guessed word exists in the wordlist, then it's a valid guess.
     * The valid count is not incremented for duplicate value of the guessed word
     */
    guessType = "valid";
    guessDesc =
      "valid guess means a guess that is one of the possible words that has not already been guessed this game";
  } else {
    /**
     * If none of the above condition satisfies,
     * there is no guessType for the record and this record is not captured in the stats
     */

    guessType = "";
    guessDesc = "";
  }

  return {
    guessedWord,
    secretWord,
    lettersMatched: getCommonLetters(guessedWord, secretWord),
    guessType,
    guessDesc,
    message,
  };
};

module.exports = compare;
