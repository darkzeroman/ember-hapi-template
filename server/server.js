var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 3000 });

/* Meant for ember serving assets */
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

var dbOpts = {
    "url": "mongodb://localhost:27017/test",
    "settings": {
        "db": {
            "native_parser": false
        }
    }
};

server.register({
    register: require('hapi-mongodb'),
    options: dbOpts
}, function (err) {
    if (err) {
        console.error(err);
        throw err;
    }
});

server.route({
    method: 'GET',
    path: '/api/hello',
    handler: function (request, reply) {
        var db = request.server.plugins['hapi-mongodb'].db;

        db.collection('users').find({}).toArray(function(err, result) {
            reply(arguments);
        });
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});