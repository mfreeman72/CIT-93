The difference between a return value and a callback pattern is:

A return function simply returns whatever value a variable has at the time the function was called. This doesn't work when the function has to wait before returning data, such as waiting on a network response.

A callback pattern sets up a callback function that points to another function that passes data back to the initiating callback function when a response from the network is received.


Yes, this helped me understand that the difference between sync and async is that with sync, the code stops running until there is a complete response from the network call (or whatever the wait state is for), while with async, other code can run while waiting for the network call to complete.