/* 1. 
       const [a, b] = fn(3)(4)[0];
       console.log(a + b()); // 4 + 6 = 10
*/ 

function fn(x) {
    return function(y) {
        return [
            [
                x,
                () => x+y
            ]
        ]
    }
}

const [a, b] = fn(3)(4)[0];
console.log(a + b());

/* 
    Write a function createMultiplier that takes a number x and returns a function. 
    The returned function should also take a number y and return a new function that takes a number z. 
    Finally, the deepest function should return x * y * z.

   2. const multiplier = createMultiplier(2)(3)(4); 
    console.log(multiplier()); // Output should be 24
*/

function createMultiplier(x) {
    return function(y) {
        return function(z) {
            return x * y * z;
        }
    }
}

const multiplier = createMultiplier(2)(3)(4)
console.log(multiplier)

/* 
3.  const counter = createCounter();
    counter.increment(); // Increments value by 1
    counter.increment();
    console.log(counter.getValue()); // Should print 2
*/

function createCounter() {
    return {
        value: 0,
        increment: function() {
            return this.value++;
        },
        getValue: function() {
            return this.value
        }
    }
}

const counter = createCounter()
counter.increment()
counter.increment()
// console.log(counter.getValue())


/* 
5. Write a memoize function that takes another function as input and optimizes it by caching its results.


*/

function memoize(fn) {
    const cache = {}

    return function(...args) {
        const key = JSON.stringify(args);
        if(key in cache) {
            console.log('Fetching from cache', key)
            return cache[key]
        } else {
            console.log('Fetching from original function', key)
            const dataFromOriginalFunction = fn(args);
            cache[key] = dataFromOriginalFunction
            return dataFromOriginalFunction
        }
    }
}




const slowFunction = (n) => {
    console.log("Running slowFunction...");
    return n * 2;
};

const memoizedFunction = memoize(slowFunction);

console.log(memoizedFunction(5)); // Output: Computing... 10
console.log(memoizedFunction(5)); // Output: 10 (without "Computing...")