var url = require('url');
var messages = {};
messages.results = [];

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

exports.requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  var messagesEndpoint = '/classes/messages';
  var statusCode = 200;
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = 'application/json';

  if (request.url.substring(0, 17) !== messagesEndpoint) {
    var statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end();
  }

  if (request.method === 'GET' || request.method === 'OPTIONS') {
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(messages));
  }

  if (request.method === 'POST') {
    let body = [];
    request.on('data', chunk => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      body = JSON.parse(body);
      if (messages.results.length) {
        body.objectId = messages.results[messages.results.length - 1]['objectId'] + 1;
      } else {
        if (!body.objectId) {
          body.objectId = 1;
        }
      }
      messages.results.push(body);
    });
    statusCode = 201;
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(messages));
  }

};
