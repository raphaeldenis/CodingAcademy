'use strict';

const Hapi = require('hapi');
const Hoek = require('hoek');
const Settings = require('./settings');

const server = new Hapi.Server({
    host: 'localhost',
    port: Settings.port
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        return('Hello, world!');
    }
});

server.start((err) => {
    Hoek.assert(!err, err);

    console.log(`Server running at: ${server.info.uri}`);
});