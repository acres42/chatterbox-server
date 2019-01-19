//NOTES from AC
//Need to get files stream
//Need to get file path
//
var url = require('url');
var fs = require('fs');

/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var requestHandler = function(request, response) {
/*
    if(request.url === '/classes/messages' && request.method === 'GET'){
    response.writeHead(statusCode, headers);
    response.end(index);
    //point to file it needs to access   --- OOPS! We don't return a file... we just return the list of messages that have been submitted via chat! MY BAD!
    // In the post handler, we update a data structure that contains messages with the post from the form in the chatterbox client!
    //ifFails
      //send response 404
    //
  }
*/

var statusCode = 404;

  if(request.url === '/classes/messages') {
    if (request.method === 'POST') {
      statusCode = 201;
      //headers['Content-Type'] = 'text/plain';
    }
    if (request.method === 'GET') {
      statusCode = 200;
      //headers['Content-Type'] = 'text/plain';
    }
  } else {
    statusCode = 404;
  }

  if(request.method === 'OPTIONS'){
    //send back
    statusCode = 200;
    // ...
    // Server: Apache/2.4.1 (Unix) OpenSSL/1.0.0g
    // Allow: GET,HEAD,POST,OPTIONS,TRACE
    // Content-Type: httpd/unix-directory
    // ...
  }

  //console.log(request.headers);
  // console.log(response);
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // The outgoing status.
  //var statusCode = 200;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;
  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  //headers['Content-Type'] = 'text/plain';

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  response.writeHead(statusCode, headers);

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  response.end('Hello, World!');
};


// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

module.exports.requestHandler = requestHandler;