const { v4: uuidv4, validate } = require("uuid");

const userData = require("../utils/user-data"); // this file holds user data
const loginPage = require("../templates/login-page"); // login page template
const wordGuessesData = require("../templates/data-page"); // data page template
const invalidUser = require("../templates/unauthorized-page"); // Unauthorized page template
const words = require("../utils/words");
let secretWord = require("../utils/secret-word");

const getHomeHandler = (req, res) => {
  const sid = req.cookies.sid;
  const username = userData.sessions[sid];
  if (!sid || !validate(sid) || !username) {
    res.send(loginPage.loginPage(userData));
    return;
  }
  res.send(wordGuessesData.dataPage(userData, username, words, secretWord));
  return;
};

const postLoginHandler = (req, res) => {
  const username = req.body.username.trim();
  const userNameRegex = /^[a-zA-Z0-9]+$/;
  const userMatch = username.match(userNameRegex);

  if (username === "dog" || !username || !userMatch) {
    // Give better errors than this!
    res.status(401).send(invalidUser.displayPage()).end();
    return;
  }
  const sid = uuidv4();
  userData.sessions[sid] = username;
  userData.toggleWords = false;
  userData.toggleStats = false;
  if (!userData.gameData[username]) userData.gameData[username] = [];

  let options = {
    // maxAge: 1000 * 60 * 15, // would expire after 1 minute
    // httpOnly: true, // The cookie only accessible by the web server
    // signed: true // Indicates if the cookie should be signed
  };
  res.cookie("sid", sid, options);
  res.redirect("/#guess-input");
};

const getInvalidUsernameHandler = (req, res) => {
  res.redirect("/");
};

const postGuessHandler = (req, res) => {
  const sid = req.cookies.sid;
  const username = userData.sessions[sid];
  if (!sid || !validate(sid) || !username) {
    res.send(loginPage.loginPage(userData));
    return;
  }
  const guessedWord = req.body.word.trim();
  userData.newGuess(username, guessedWord, secretWord, words);
  res.redirect("/#guess-input");
};

const postLogoutHandler = (req, res) => {
  const sid = req.cookies.sid;
  if (sid && validate(sid)) {
    delete userData.sessions[sid];
  }
  res.clearCookie("sid");
  res.redirect("/#guess-input");
};

const postNewGameHandler = (req, res) => {
  const sid = req.cookies.sid;
  const username = userData.sessions[sid];
  if (!sid || !validate(sid) || !username) {
    res.send(loginPage.loginPage(userData));
    return;
  }
  userData.resetData(username);
  const randomWordIndex = Math.floor(Math.random() * words.length);
  secretWord = words[randomWordIndex];
  res.redirect("/#guess-input");
};

const postToggleWordHandler = (req, res) => {
  const sid = req.cookies.sid;
  const username = userData.sessions[sid];
  if (!sid || !validate(sid) || !username) {
    res.send(loginPage.loginPage(userData));
    return;
  }
  userData.toggleWords = !userData.toggleWords;
  res.redirect("/#wordlist");
};

const postToggleStatsHandler = (req, res) => {
  const sid = req.cookies.sid;
  const username = userData.sessions[sid];
  if (!sid || !validate(sid) || !username) {
    res.send(loginPage.loginPage(userData));
    return;
  }
  userData.toggleStats = !userData.toggleStats;
  res.redirect("/#stats");
};

module.exports = {
  getHomeHandler,
  getInvalidUsernameHandler,
  postGuessHandler,
  postLoginHandler,
  postLogoutHandler,
  postNewGameHandler,
  postToggleStatsHandler,
  postToggleWordHandler,
};
