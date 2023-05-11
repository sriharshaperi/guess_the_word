const wordGameLogin = {
  loginPage: function () {
    return `
      <!doctype html>
      <html>
        <head>
          <title>Login Page</title>
          <link rel="stylesheet" href="game.css">
        </head>
        <body>
          <div id="login-app">
          <h1 class="game-title"><b>Word Game</b></h1>
            ${wordGameLogin.getOutgoing()}
          </div>
        </body>
      </html>
    `;
  },

  getOutgoing: function () {
    return `
      <form id="login-form" action="/login" method="POST">
        <input class="to-send" name="username" placeholder="Enter Username"/>
        <button type="submit" class="btn-login">Login</button>
      </form>
    `;
  },
};
module.exports = wordGameLogin;
