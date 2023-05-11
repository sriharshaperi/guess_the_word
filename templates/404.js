const pageNotFound = {
  displayPage: function () {
    return `
        <!doctype html>
        <html>
          <head>
            <title>Page Not Found</title>
            <link rel="stylesheet" href="game.css">
          </head>
          <body>
            <div id="page-not-found-info">
              <h1 class="page-not-found-title"><b>404</b></h1>
              <h4 class="pnf-content"> Page Not Found</h4>
              ${pageNotFound.displayMessage()}
            </div>
          </body>
        </html>
    `;
  },

  displayMessage: function () {
    return `
        <form action="/" method="GET"> 
          <button type="submit" class="go-home">Go Home</button>
        </form>
      `;
  },
};
module.exports = pageNotFound;
