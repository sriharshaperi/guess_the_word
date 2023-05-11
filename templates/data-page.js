const inlineStyles = require("./inline-styles");
const {
  getWordListStyles,
  getStatsStyles,
  guessesCountBoxStyles,
  validGuessesCountStyles,
  invalidGuessesCountStyles,
  incorrectGuessesCountStyles,
  getSubmitBtnStyles,
  getNewGameBtnStyles,
} = inlineStyles;

const wordGuessesData = {
  dataPage: function (data, username, words, secretWord) {
    return (
      `
      <!doctype html>
      <html>
        <head>
          <title>Secret Word</title>
          <link rel="stylesheet" href="game.css">
        </head>
        <body>` +
      //Header section displays the username
      `${wordGuessesData.displayHeader(username)}

          <div id="word-guess-game">` +
      //this part contanis game title and toggle buttons section to toggle available words and game stats
      `<h1 class="game-title"><b>Guess the Secret Word</b></h1>
            <div class="toggle-buttons">` +
      //button to toggle all words
      `${wordGuessesData.toggleWords(data)}` +
      //button to toggle game stats
      `${wordGuessesData.toggleStats(data)}
            </div>` +
      //displaying all words
      `<div class="word-list" style=${getWordListStyles(data)}>
                ${wordGuessesData.getAllWords(words)}
            </div>` +
      //displaying game stats
      `<div class="game-stats" style=${getStatsStyles(data)}>
        ${wordGuessesData.getGameStats(data, username, secretWord)}
      </div>` +
      //displaying guesses results
      `${wordGuessesData.getResults(data, username)}
          </div>
        </body>
      </html>
  `
    );
  },
  getResults: function (data, username) {
    //filtering all the valid guesses
    const validGuessesCount = data.gameData[username].filter(
      (guesses) => guesses.guessType === "valid"
    ).length;

    //filtering all the invalid guesses
    const invalidGuessesCount = data.gameData[username].filter(
      (guesses) => guesses.guessType === "invalid"
    ).length;

    //filtering all the incorrect guesses
    const incorrectGuessesCount = data.gameData[username].filter(
      (guesses) => guesses.guessType === "incorrect"
    ).length;

    //filtering all the correct guesses
    const correctGuess = data.gameData[username].find(
      (guesses) => guesses.guessType === "correct"
    );

    //setting display message after correct guess
    const message = correctGuess ? correctGuess.message : "";

    return (
      `
    <div class="guesses-count-box" style=${guessesCountBoxStyles(
      data,
      username
    )}>` +
      //displaying valid guess count
      `<p class=valid-guesses-count style=${validGuessesCountStyles(
        validGuessesCount
      )}> Valid Guesses : ${validGuessesCount}</p>` +
      //displaying invalid guess count
      `<p class=invalid-guesses-count style=${invalidGuessesCountStyles(
        invalidGuessesCount
      )}> Invalid Guesses : ${invalidGuessesCount}</p>` +
      //displaying incorrect guess count
      `<p class=incorrect-guesses-count style=${incorrectGuessesCountStyles(
        incorrectGuessesCount
      )}> Incorrect Guesses : ${incorrectGuessesCount}</p>
    </div>` +
      //displaying message after correct guess
      `<h4 class=message-box>${message}</h4>` +
      //POST request form to process a guess
      `<form class="form-box" action="/guess" method="POST">
        <input id="guess-input" class="to-send" name="word" placeholder="Guess the word and enter here"/>  
        <button type="submit" class="btn-submit" style=${getSubmitBtnStyles(
          message
        )}>Check Word</button>
      </form>` +
      //POST request form to start a new game
      `<form action="/new-game" method="POST">
      <button class="new-game-button" style=${getNewGameBtnStyles(
        message
      )}>Start New Game</button>
      </form>` +
      //logout form
      `<form class="logout-form" action="/logout" method="POST">
        <button type="submit" class="btn-logout">Logout</button>
      </form>
    `
    );
  },

  getAllWords: function (words) {
    return `
    <ul id="wordlist" class="words">
    ${words.map(
      (word) => `
    <li class="word" style="display:inline-block;">
    ${word}
    </li>
    `
    )}
    </ul>
    `;
  },

  getGameStats: function (data, username, secretWord) {
    let gameStats = [...data.gameData[username]];

    if (gameStats.length === 0) {
      return "No game stats to show. Play a game now.";
    }
    return `
    <table id="stats" class="game-stats-table">
    <caption>Secret Word : ${secretWord}</caption>
      <tr>
        <th>S.No.</th>
        <th>GuessedWord</th>
        <th>LettersMatched</th>
        <th>GuessType</th>
        <th>Description</th>
      </tr>
      
        ${gameStats.map((record, index) => {
          return `
          <tr>
          <th>${index + 1}</th>
          <th>${record.guessedWord}</th>
          <th>${record.lettersMatched}</th>
          <th>${record.guessType}</th>
          <th>${record.guessDesc}</th>
          </tr>
          `;
        })}
    </table>
    `;
  },
  displayHeader: function (username) {
    return `
    <header>
        <h5 style="text-align:center;">
        Welcome ${username}, Let's play this game. You guess a word and I will show your stats
        </h5>
        </header>
    `;
  },

  toggleWords: function (data) {
    return `
    <form action="/toggle-words" method="POST">
            <button class="words-button">${
              data.toggleWords ? "Hide" : "Show"
            } Words</button>
            </form>
    `;
  },
  toggleStats: function (data) {
    return `
    <form action="/toggle-stats" method="POST">
            <button class="stats-button">${
              data.toggleStats ? "Hide" : "Show"
            } Game Stats</button>
            </form>`;
  },
};
module.exports = wordGuessesData;
