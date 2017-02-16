const FizzBuzz = require('./libs');

function getArray() {
    let array = [];
    for (var x = 0;  x < RandomInt(0,50); x++){
        array.push(RandomInt());
    }

    return array;
}
function RandomInt(min = 0, max = 100) {
    return Math.floor(Math.random() * (max - min + 1))  + min ;
}
console.log(FizzBuzz(getArray()));







