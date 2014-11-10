var hapi = require('hapi');
var path = require('path');

// Create a server with a host and port
var server = new hapi.Server('localhost', 8000);

var viewsPath = path.join(__dirname, 'templates');

// Add the view engine
server.views({
  engines: {
    int: {
      module: require('interpol-views'),
      compileOptions: {
        importPath: viewsPath
      }
    }
  },
  path: viewsPath
});

// Add the route
server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply.view('index', {
      "title": "Famous People",
      "people" : [
        { "name": "Larry", "brothers": ["Nobody"] },
        { "name": "Curly", "brothers": ["Moe", "Shemp"]},
        { "name": "Moe", "brothers": ["Curly", "Shemp"]}
      ]
    });
  }
});

// Start the server
server.start();
