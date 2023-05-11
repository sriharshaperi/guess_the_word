const compare = require("./compare");

let gameData = {}; //object with username as keys and user game stats[] as correspoding value

let sessions = {}; //stores the username corresponding to the respective active session id of the user

let toggleWords = false; //flag for toggling display of the wordList
let toggleStats = false; //flag for toggling display of the game stats

/**
 *
 * Resets the user game data
 */
const resetData = (username) => {
  gameData[username] = [];
};

/**
 * Triggerred for every new guess request
 */
function newGuess(username, guessedWord, secretWord, words) {
  //setting the gamedata to default [] value
  if (!gameData[username]) {
    gameData[username] = [];
  }

  /**
   * Compares the guessed word and the secret word
   * and returns an object conatning stats for every guess request
   */
  const newRecord = compare(
    guessedWord.toLowerCase(),
    secretWord.toLowerCase(),
    gameData[username],
    words
  );
  console.log(newRecord);
  if (newRecord.guessType !== "") {
    /**
     * Only guessTypes with values "correct", "incorrect",
     * "valid" and "invalid" are added to the stats array
     */

    gameData[username].push(newRecord);
  }
}

const userData = {
  gameData,
  toggleWords,
  toggleStats,
  sessions,
  newGuess,
  resetData,
};

module.exports = userData;
