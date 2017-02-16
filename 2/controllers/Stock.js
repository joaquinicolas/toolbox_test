function Stock(main) {

    return {
        'create':(req,res,next) => {
            let stock = req.body.stockToAdd;
            main.libs.Stock.create(stock)
                .then((data) => {
                    res.json(data);
                })
                .catch((err) => {
                    next(err);
                })

        },
        'list': (req,res,next) => {

            main.libs.Stock.search()
                .then((data) => {

                    let json = [];
                    for (var x = 0; x < data[0].stock; x++){
                        json.push({
                            name: 'Product X',
                            price:(Math.random() * 1000).toFixed(2)
                        })
                    }

                    res.json(json);
                })
                .catch((err) => {
                    next(err);
                })
        },

        'delete': (req,res,next) => {
            main.libs.Stock.delete()
                .then((deleted_rows) => {
                    res.json(deleted_rows);
                })
                .catch((err) => {
                    next(err);
                })
        }
    }
}


module.exports = Stock;
