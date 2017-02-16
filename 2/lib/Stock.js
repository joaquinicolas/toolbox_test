
class Stock{
    constructor(main){
        this.db = main.db;
        this.collections = main.collections;
    }

    _getCollection(){
        return this.collections[0];
    }
    delete(){
        let self = this;

        return new Promise((resolve,reject) => {
           self.db[self._getCollection()].drop((err,result) => {
              err ? reject(err) : resolve(result);
           });
        });
    }

    search(){
        let self = this;

        return new Promise((resolve,reject) =>{
            self.db[self._getCollection()].find((err, docs) => {
                err ? reject(err) : resolve(docs);
            });
        });
    }

    create(new_stock){
        let self = this;

        return new Promise((resolve,reject) => {
            self.db[self._getCollection()].update({_id:"123"},{stock: new_stock},{upsert: true},(err,result) => {
                err ? reject(err):resolve(result);
            });
        })
    }
}

module.exports = Stock;