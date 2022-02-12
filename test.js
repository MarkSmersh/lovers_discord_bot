const numbers = [...Array(36).keys()]
numbers.shift()
numbers.push(36)

function getArr (numbers) {
    console.log(numbers)
    result = []
    for (let i = 0; i < numbers.length; i++) {
        if (36 % numbers[i] == 0) result.push(numbers[i])
    }
    console.log(result)
    return `${result.length}/${numbers.length}`
}

console.log(getArr(numbers))