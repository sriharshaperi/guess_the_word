const invalidUsername = {
  displayPage: function () {
    return `
      <!doctype html>
      <html>
        <head>
          <title>Invalid Username</title>
          <link rel="stylesheet" href="game.css">
        </head>
        <body>
          <div id="error-info">
            <h1 class="error-title"><b>401</b></h1>
            <h4 class="content"> Invalid Username Entered</h4>
            ${invalidUsername.displayMessage()}
          </div>
        </body>
      </html>
  `;
  },

  displayMessage: function () {
    return `
      <form action="/invalid-username" method="GET"> 
        <button type="submit" class="btn-return">Go Back</button>
      </form>
    `;
  },
};
module.exports = invalidUsername;
