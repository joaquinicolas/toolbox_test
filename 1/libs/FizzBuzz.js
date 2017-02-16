function FizzBuzz(array) {
    return array.map((currentValue,index) => {
        if ((currentValue % 3 == 0) && (currentValue % 5 == 0)) return "FizzBuzz";
        else if (currentValue % 3 == 0) return "Fizz";
        else if (currentValue % 5 == 0) return "Buzz";
        return currentValue
    })
}

module.exports = FizzBuzz;