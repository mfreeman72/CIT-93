// Closures - Combination of function and the lexical scope within which they were defined

const createCounter = () => {
    let count = 0

    return {
        increment() {
            count++
        },
        decrement() {
            count--
        },
        get() {
            return count
        }
    }
}

const counter = createCounter()
counter.increment()
counter.decrement()
counter.decrement()
console.log(counter.get())

// Adder
const createAdder = (a) => {
    return (b) => {
        return a + b
    }
}
const add10 = createAdder(10)
console.log(add10(-2))
console.log(add10(20))

const add100 = createAdder(100)
console.log(add100(-90))

// Variables are only modifiable through the interfaces defined
// Can be used to create subsets of functions to create other functions

// Tipper
const createTipper = (tip) => {
    return (bill) => {
        return bill * tip
    }
}

const tip15 = createTipper(.15)
const tip20 = createTipper(.2)
const tip25 = createTipper(.25)

console.log(tip15(50))
console.log(tip20(50))
console.log(tip25(50))
