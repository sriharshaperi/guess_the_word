const words = require("./words");

const randomWordIndex = Math.floor(Math.random() * words.length);
const secretWord = words[randomWordIndex];

module.exports = secretWord;
