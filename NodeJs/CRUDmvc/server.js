'use strict';

// Import the index.js file inside the models directory
const Models = require('./lib/models/');

const Hapi = require('hapi');
const Hoek = require('hoek');
const Settings = require('./settings');
const Routes = require('./lib/routes');

const server = new Hapi.Server({
    host: 'localhost',
    port: Settings.port
});

server.route(Routes);

// Sync first the models to DB THEN start server once done
Models.sequelize.sync().then(() => {
    server.start((err) => {
        Hoek.assert(!err, err);

        console.log(`Server running at: ${server.info.uri}`);
    });
});