const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// todo remove old code vv
const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/addUser') {
    const res = response;

    const body = [];

    request.on('error', (err) => {
      console.dir(err);
      res.statusCode = 400;
      res.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString(); // utf8 is default
      const bodyParams = query.parse(bodyString);

      jsonHandler.addUser(request, res, bodyParams);
    });
  } else if (parsedUrl.pathname === '/addTeam') {
    const res = response;

    const body = [];

    request.on('error', (err) => {
      console.dir(err);
      res.statusCode = 400;
      res.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString(); // utf8 is default
      const bodyParams = query.parse(bodyString);

      jsonHandler.addTeam(request, res, bodyParams);
    });
  }
};

const handleGet = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/') {
    htmlHandler.getIndex(request, response);
  } else if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getCSS(request, response);
  } else if (parsedUrl.pathname === '/bundle.js') {
    htmlHandler.getBundle(request, response);
  } else if (parsedUrl.pathname === '/getUsers') {
    jsonHandler.getUsers(request, response);
  } else if (parsedUrl.pathname === '/getTeams') {
    jsonHandler.getTeams(request, response);
  } else {
    jsonHandler.notFound(request, response);
  }
};

const handleHead = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/getUsers') {
    jsonHandler.getUsersMeta(request, response);
  } else {
    jsonHandler.notFoundMeta(request, response);
  }
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  if (request.method === 'HEAD') {
    handleHead(request, response, parsedUrl);
  } else if (request.method === 'GET') {
    handleGet(request, response, parsedUrl);
  } else if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } else {
    jsonHandler.notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
