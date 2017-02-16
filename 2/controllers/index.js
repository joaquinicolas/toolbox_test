
function wrapHandler(handler) {
    return (req, res, next) => {
        try {
            handler(req,res, (err) => {
               if (err){

                   res.status(503).json({
                       code: 'controller_error',
                       message: err.message
                   }).end();
               }
               else {
                   next();
               }
            });
        }catch (e){

            res.status(503).json({
                code:'controller_error',
                message:typeof(e) === 'string' ? e : e.message
            }).end();
        }
    };
}


function wrapControllers(controllers) {
    for (var k in controllers){
        controllers[k] = wrapHandler(controllers[k]);
    }

    return controllers;
}

function createControllers(main) {

    let controllers = {
        'Stock':require('./Stock')(main)
    };

    return wrapControllers({
        'stock.create_post': controllers.Stock.create,
        'stock.remove_delete': controllers.Stock.delete,
        'stock.list_get': controllers.Stock.list
    });
}

module.exports = createControllers;