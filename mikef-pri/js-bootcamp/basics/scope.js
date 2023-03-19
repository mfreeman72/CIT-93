// Lexical Scope (Static Scope)
// Global Scope - Defined outside of all code blocks
// Local Scope - Defined inside a code block

// In a scope you can access variables defined in that scope or in any parent/ancestor scope

// Global Scope (varOne) - can only access varOne - Global scope is at root level and has no parent/ancestor
// Local Scope (varTwo) - can access both varOne and varTwo - Global is the parent/ancestor of any local scope
// Local Scope (varFour) - can access varOne, varTwo, and varFour
// Local Scope (varThree) - can access both varOne and varTwo - Local scope cannot access variables defined in another scope of the same level

let varOne = "varOne";

if (true) {
  console.log(varOne);
  let varTwo = "varTwo";
  console.log(varTwo);

  if (true) {
    let varFour = "varFour";
  }
}

if (true) {
  let varThree = "varThree";
}
console.log(varTwo);
