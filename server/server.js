var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: './dist/',
            listing: true
        }
    }
});

server.route({
    method: 'GET',
    path: '/api/hello',
    handler: function (request, reply) {

        console.log('something asked something');
        reply('Hello, world!');
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});