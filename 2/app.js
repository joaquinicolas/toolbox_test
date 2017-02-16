'use strict';

const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const mongo = require('mongojs');
const Stock = require('./lib/Stock');


/**
 * Build main application
 * @param {Object} config - The module config
 * @returns {Promise}
 *
 */
function app(config) {
    var self = this;


    self.main = {
        config:config,
        db: mongo(config.get('db.host'),config.get('db.collections')),
        collections:config.get('db.collections')
    };

    return new Promise((resolve,reject) => {
       self.getApp()
           .then(() => {return self.libs()})
           .then(() => {return self.controllers()})
           .then(() => {return self.routers()})
           .then(() => {
               resolve(self.main);
           })
           .catch((err) => {
               console.log("Error init: " + err);
           })
    });
}


app.prototype.getApp = function () {
    var self = this;

    return new Promise((resolve,reject) => {
        self.main.app = express();

        self.main.app.use(bodyParser.json());
        self.main.app.use(bodyParser.urlencoded({extended:true}));
        self.main.server = http.createServer(self.main.app);


        console.log("getApp finished");
        resolve({app:self.main.app, server: self.main.server});
    });
}

app.prototype.libs = function () {

    var self = this;
    return new Promise((resolve,reject) => {

        self.main.libs = {};
        self.main.libs.http = http;
        self.main.libs.Stock = new Stock(self.main);

        console.log("libs finished");
        resolve(self.main.libs);
    });
}

app.prototype.controllers = function () {

    var self = this;
    self.main.controllers = {};

    return new Promise((resolve,reject) => {
        self.main.controllers = require('./controllers')(self.main);
        console.log("controllers finished");
        resolve(self.main.controllers);
    });
}

app.prototype.routers = function () {

    var self = this;

    return new Promise((resolve,reject) => {

        var app = self.main.app;

        function initMiddleWare(callback) {
            app.use((req,res,next) => {

                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
                res.setHeader('Access-Control-Allow-Credentials', true);

                if (req.method === 'OPTIONS') return res.end();


                if (req.headers && req.headers['x-forwarded-for']) {
                    let parts = req.headers['x-forwarded-for'].split(",");
                    req.realip = parts[0];
                } else {
                    req.realip = req.ip;
                }

                next();

            });

            callback();
        }

        initMiddleWare(() => {
            resolve();
        })
        app.get('/stock',self.main.controllers['stock.list_get']);
        app.post('/stock',self.main.controllers['stock.create_post']);
        app.delete('/stock',self.main.controllers['stock.remove_delete'])

    })
}

module.exports = app;