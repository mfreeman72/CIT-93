// Type coercion - Avoid: a string, a number; Ok: a boolean

const value = false + 12
const type = typeof value
console.log(type)
console.log(value)
