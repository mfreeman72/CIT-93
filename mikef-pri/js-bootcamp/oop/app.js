// This is primitive value: string, number, boolean, null, and undefined
// null and undefined are true primitives, the rest may be wrapped in Object wrappers to access Object prototype functions

// Object: myObject --> Object.prototype --> null (chain ends)
// Array: myArray --> Array.prototype --> Object.prototype --> null (chain ends)
// Function: myFunc --> Function.ptorotype --> Object.prototype --> null (chain ends)
// String: myString --> String.prototype --> Object.prototype --> null (chain ends)
// Number: myNumber --> Number.prototype --> Object.prototype --> null (chain ends)
// Boolean: myBoolean --> Boolean.prototype --> Object.prototype --> null (chain ends)

const product = 'Computer'
console.log(product)

const otherProduct = new String('Phone')
console.log(otherProduct)
