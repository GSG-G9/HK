const {
  handlePublicFiles,
  homeHandler,
  errorHandler,
  autocompleteHandler,
  notFoundHandler,
} = require('./handler/handler');

const router = (request, response) => {
  const endpoint = request.url;
  if (endpoint === '/') {
    homeHandler(request, response);
  } else if (endpoint === '/public/500.html') {
    errorHandler(request, response, endpoint);
  } else if (endpoint === '/public/404.html') {
    errorHandler(request, response, endpoint);
  } else if (endpoint.includes('/public')) {
    handlePublicFiles(request, response, endpoint, (error, res) => {
      res.writeHead(500);
      res.end();
    });
  } else if (endpoint === '/search') {
    autocompleteHandler(request, response);
  } else {
    notFoundHandler(request, response);
  }
};

module.exports = router;
