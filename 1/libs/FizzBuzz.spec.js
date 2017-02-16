var expect = require('chai').expect;
const FizzBuzz = require('./FizzBuzz');

describe('The FizzBuzz module',() => {
    it('return Fizz',() => {
        const result = FizzBuzz([9]);
        expect(result[0]).to.equal("Fizz");
    })

    it('return Buzz',() => {
        const result = FizzBuzz([25]);
        expect(result[0]).to.equal("Buzz")
    })

    it('return FizzBuzz',() => {
        const result = FizzBuzz([15]);
        expect(result[0]).to.equal("FizzBuzz");
    })
})

