const express = require("express");
const gameHandler = require("../handlers/game-handler");

const router = express.Router();

router.route("/").get(gameHandler.getHomeHandler);
router.route("/login").post(gameHandler.postLoginHandler);
router.route("/invalid-username").get(gameHandler.getInvalidUsernameHandler);
router.route("/guess").post(gameHandler.postGuessHandler);
router.route("/new-game").post(gameHandler.postNewGameHandler);
router.route("/toggle-words").post(gameHandler.postToggleWordHandler);
router.route("/toggle-stats").post(gameHandler.postToggleStatsHandler);
router.route("/logout").post(gameHandler.postLogoutHandler);

module.exports = router;
