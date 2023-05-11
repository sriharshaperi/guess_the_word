const getWordListStyles = (data) => {
  const display = data.toggleWords ? "block" : "none";
  return `display:${display};`;
};

const getStatsStyles = (data) => {
  const display = data.toggleStats ? "block" : "none";
  return `display:${display};`;
};

const guessesCountBoxStyles = (data, username) => {
  const display = data.gameData[username].length > 0 ? "block" : "none";
  return `display:${display};`;
};

const validGuessesCountStyles = (validGuessesCount) => {
  const display = validGuessesCount > 0 ? "block" : "none";
  return `display:${display};`;
};

const invalidGuessesCountStyles = (invalidGuessesCount) => {
  const display = invalidGuessesCount > 0 ? "block" : "none";
  return `display:${display};`;
};

const incorrectGuessesCountStyles = (incorrectGuessesCount) => {
  const display = incorrectGuessesCount > 0 ? "block" : "none";
  return `display:${display};`;
};

const getSubmitBtnStyles = (message) => {
  const display = !message ? "block" : "none";
  return `display:${display};`;
};

const getNewGameBtnStyles = (message) => {
  const display = message ? "block" : "none";
  return `display:${display};`;
};

const inlineStyles = {
  getWordListStyles,
  getStatsStyles,
  guessesCountBoxStyles,
  validGuessesCountStyles,
  invalidGuessesCountStyles,
  incorrectGuessesCountStyles,
  getSubmitBtnStyles,
  getNewGameBtnStyles,
};

module.exports = inlineStyles;
