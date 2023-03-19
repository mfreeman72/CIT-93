Rules for using and not using arrow functions:

Use when:
1. You want to convert most functions that don't use "arguments" or "this"
2. You want to convert single-line return functions into shorthand syntax.

Do not use when:
1. Using the "arguments" binding
2. Do not use for most methods, because "this" binding cannot be used. Alternative: Use method definition syntax.

Video 89 notes:

Object Oriented Programming - programming centered around objects

Before:                                             | After:
                                                    | 
const person = {                                    | const person1 = new Person('Clancey', 'Turner', 54)
    firstName: 'Clancey',                           | const person1 = new Person('Alexis', 'Sanders', 49)
    lastName: 'Turner',                             | 
    age: 54,                                        | const bio1 = person1.getBio()
    getBio() {                                      | console.log(bio1)
        return `${this.firstName} is ${this.age}`   | 
    }                                               | const bio2 = person2.getBio()
}                                                   | console.log(bio2)
                                                    | 
const bio = person.getBio()                         | 
                                                    | 
console.log(bio)                                    | 


+-----------------------+           +-----------------------+
| Person1:              |           | Person2:              |
| First Name: Clancey   |           | First Name: Alexis    |
| Last Name: Turner     |           | Last Name: Sanders    |
| Age: 54               |           | Age: 49               |
+-----------------------+           +-----------------------+
                         \         /
                          \       /
                           \     /
                            \   /
                             \ /
                  +-----------------------+
                  | Person Prototype:     |
                  | Method: getBio        |
                  | Method: setName       |
                  +-----------------------+

For "person" above (after section), there will be prototype methods that all objects can share.


Video 92 notes:

In this video, "this." works in the forEach function (only when formatted as an arrow function), because the arrow function takes on the "this" connection from its parent function.


Video 93 notes:

                      Person Constructor
                              |
                    +---------------------+
                    | Prototype Property: |
                    | getBio              |
                    | setName             |
                    +---------------------+
                            ^
+---------------------+    /|\
| Person Instance:    |     |
| firstName: Clancey  |     |
| lastName: Turner    |     |
| age: 54             |     |
| [[Prototype]] ------+-----+
+---------------------+

Prototype property - isn't seen in the instance, but creates the relationship between the instance and the methods we're able to access

const me = new Person('Clancey', 'Turner', 54)
// me.[[prototype]] = Person.prototype

console.log(me.firstName)

const bio = me.getBio() --> Looks in instance for "getBio", and when not found, it ends up going up the prototype chain to find it
console.log(bio)

console.log(me.testing) --> doesn't find it in the prototype chain --> undefined

If a prototype (such as getBio) is redefined later in the program, any call after that uses the new definition --> This is different behavior that some other languages