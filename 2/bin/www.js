var app = require('../app');
var config = require('config');
var http = require('http');

new app(config)
.then((main) => {
    let server = main.server;
    var port = normalizePort(process.env.PORT || config.get('server.port'));

    /**
     * Normalize a port
     */

    function normalizePort(p) {
        var port = parseInt(p,10);

        if (isNaN(port)){
            return p;
        }

        if (port >= 0){
            return p;
        }

        return false;
    }

    /**
     * Event listener for HTTP server "error".
     *
     */

    function onError(error,port) {
        if (error.syscall !== 'listen'){
            throw error;
        }

        var bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

        //handle specific listen errors with friendly message
        switch (error.code){
            case 'EACCES':
                console.error(bind + ' required elevated privileges');
                process.exit(1);
                break;

            case 'EADDRINUSE':
                console.error(bind + ' is alredy in use.');
                process.exit(1);
                break;

            default:
                throw error;
        }
    }


    /**
     * Event listener for HTTP server "listenning"
     *
     *
     */

    function onListening(server) {
        var addr = server.address();
        var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;

    }

    /**
     * Gracefull terminate programs
     */

    var gracefulExit = function gracefulExit() {
        console.log('exiting');
        process.exit(0);
    }

    /**
     * Create HTTP server.
     */

    server.on('listening',() => {
        onListening(server);
    });

    server.on('error', function () {
        onError(port);
    });

    process.on('SIGINT',gracefulExit).on('SIGTERM',gracefulExit);
    process.on('uncaughtException',err => {
        console.error('Caught exception: ' + err);
    });

    console.log('listen on ' + port);
    server.listen(port);

}).catch(err => {
    throw err;
});