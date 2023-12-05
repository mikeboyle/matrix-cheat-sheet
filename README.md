# Matrix cheat sheet

## What's in here
This document is a reference for solving matrix problems. If you practice these patterns and understand why they work, you can combine them to solve many matrix problems you'll see in interviews.

The `index.js` file contains the code shown here. I strongly recommend playing with the code, modifying it, breaking it, etc. until you understand it and can make it your own.

There are two sections in the doc:

1. Patterns for doing different things with matrices:
  - Find the number of rows / columns / elements
  - Iterate forwards / backwards / by column
  - Iterate main diagonal / off-diagonal
  - Iterate upper diagonal / upper triangle
  - Check if a row/col pair is inside the matrix
  - Find the ith element in a matrix
  - Create an empty matrix
  - Copy a matrix
  - Transpose a matrix
2. Matrix jargon / tips for understanding the prompt

## Common matrix tasks

### Find the number of rows and columns
Assuming this is a rectangular or square matrix, you can just do the code below. It's okay to hardcode the index `0` if the problem guarantees that all rows have the same number of columns.
```js
const matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
];
const numRows = matrix.length; // 3
const numCols = matrix[0].length; // 4
```
### Find the number of elements in a matrix
For a rectangular or square matrix, this is simply `numRows * numCols`. Notice that you can do this in **`O(1) time`** without any loops.

```js
const matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
];
const numRows = matrix.length; // 3
const numCols = matrix[0].length; // 4
console.log(numRows * numCols); // 12
```
Even if the matric is ragged (`ragged` = each row might have a different number of columns; see `Matrix jargon` for more), you can do this in `O(m) time` where `m` = the number of rows in the matrix.
```js
const matrix = [
  [1, 2, 3],
  [4, 5, 6, 7, 8],
  [9],
  [10, 11, 12]
];

let total = 0;

for (let row of matrix) {
  total += row.length;
}
console.log(total);
```

### Iterate through matrix (top left to lower right)
Again, this assumes the matrix is not ragged (`ragged` = each row might have a different number of columns; see `Matrix jargon` for more).
```js
const matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
];
const numRows = matrix.length; // 3
const numCols = matrix[0].length; // 4

for (let i = 0; i < numRows; i++) {
  for (let j = 0; j < numCols; j++) {
    const currentElement = matrix[i][j];
    // do something with the current element
    console.log(currentElement);
  }
}
// logs 1, 2, 3, 4, 5, 6, 7, 8, 9, ..., 12
```
### Iterate through ragged matrix (top left to lower right)
If the rows of the matrix might have different lengths, you need check against the length of the current row:
```js
const matrix = [
  [1, 2, 3],
  [4, 5, 6, 7, 8],
  [9],
  [10, 11, 12]
];
for (let i = 0; i < matrix.length; i++) {
  // IMPORTANT: use matrix[i].length
  for (let j = 0; j < matrix[i].length; j++) {
    const currentElement = matrix[i][j];
    // do something with the current element
    console.log(currentElement);
  }
}
```
### Iterate backwards through rectangular matrix (lower right to upper left)
Again, this assumes the matrix is not ragged. Pay special attention to:

- the starting points (`size - 1`, not `0`)
- comparision operators (`<` vs `>=`)
- the incrementer/decrementer (`i--` not `i++`).
```js
const matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
];
const numRows = matrix.length; // 3
const numCols = matrix[0].length; // 4

for (let i = numRows - 1; i >= 0; i--) {
  for (let j = numCols - 1; j >= 0; j--) {
    const currentElement = matrix[i][j];
    // do something with the current element
    console.log(currentElement);
  }
}
// logs 12, 11, 10, 9, 8, 4, ..., 1
```

### Iterate matrix by column
This is almost the same as normal iteration, but notice how the outer loop and inner loop are different.
```js
const matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
];
const numRows = matrix.length;
const numCols = matrix[0].length;

// NOTICE: Why does j come before i? What else is different?
for (let j = 0; j < numCols; j++) {
  for (let i = 0; i < numRows; i++) {
    // NOTICE: Why does j NOT come before i here?
    const currentElement = matrix[i][j];
    // do something with the current element
    console.log(currentElement);
  }
}
// logs 1, 5, 9, 2, 6, 10, 3, 7, 11, 4, 8, 12
```

### Iterate main diagonal
The main diagonal goes from upper left to lower right (see `Matrix jargon` for more):
```js
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const numRows = matrix.length;

for (let i = 0; i < numRows; i++) {
  // NOTICE: row index == column index
  // ALSO NOTICE: we don't need an inner loop
  const currentElement = matrix[i][i];
  // do something with the current element
  console.log(currentElement);
}
// logs 1, 5, 9
```

### Iterate off diagonal
The off diagonal is the other diagonal (see `Matrix jargon` for more). This assumes the matrix is `n x n` square (not rectangular or ragged).
Fun fact! For every entry on the off diagonal, `column index + row index = n - 1`

In the example 4 x 4 matrix:

- `n = 4`
- We start at row index `0`, col `3`. Notice: `row + col = 0 + 3 = 3` and `3 = n - 1`
- Next we do row index `1`, col `2`. Notice that the row and col indexes add up to `n - 1`
- Next: row 2, col 1
- row 3, col 0

```js
const matrix = [
  [1, 2,  3,  4],
  [5, 6,  7,  8],
  [9, 10, 11, 12],
  [13,14, 15, 16],
];
const n = matrix.length;

for (let row = 0; row < n; row++) {
  // row + col = n - 1
  // col = n - 1 - row (thanks, algebra!)
  const col = n - 1 - row
  const currentElement = matrix[row][col];
  // do something with the current element
  console.log(currentElement);
}
// logs 4, 7, 10, 13
```

### Iterate upper diagonal / upper triangle
`upper diagonal` or (`upper triangle`, `upper triangular`) means the main diagonal of a matrix and all of the cells "above" it. For example, in this matrix, everything in the upper diagonal has a value of `7`:
```js
[
  [7, 7, 7],
  [0, 7, 7],
  [0, 0, 7],
];
```
It may seem odd but some problems are more easily solved if you only touch the upper diagonal of the matrix. The pattern for doing this is:
```js
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const numRows = matrix.length;
const numCols = matrix[0].length;

for (let i = 0; i < numRows; i++) {
  // NOTICE: What do we initialize j to? Why?
  for (let j = i; j < numCols; j++) {
    const currentElement = matrix[i][j];
    // do something with the current element
    console.log(currentElement);
  }
}

// logs 1, 2, 3, 5, 6, 9
```

### Check if a row/column is in bounds (not off the grid)
This is an important step in harder problems where you need to navigate through a matrix or search up / down / left / right through a matrix. If you don't need to do something like that, normal iteration as shown above should be fine.
```js
const matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
];

// returns true if matrix[i][j] is a entry in the matrix; false if outside
const isInBounds = (row, col, matrix) => {
  const numRows = matrix.length; // 3
  const numCols = matrix[0].length; // 4

  return row >= 0 && row < numRows && col >= 0 && col < numCols;
};

// returns true if matrix[i][j] is NOT a entry inside the  matrix; false if it is
const isOutOfBounds = (row, col, matrix) => {
  const numRows = matrix.length; // 3
  const numCols = matrix[0].length; // 4

  if (row < 0 || row >= numRows || col < 0 || col >= numCols) {
    return true;
  }
  return false;
};

isInBounds(0, 0, matrix); // true
isOutOfBounds(0, 0, matrix); // false

isInBounds(2, 4, matrix); // false
isOutOfBounds(2, 4, matrix); // true
```
A fun thing to think about is: Why does `isInBounds` use an and condition (`&&`) but `isOutOfBounds` uses an or condition (`||`)? The two functions are checking for the opposite thing. [It's all based on something called DeMorgan's Law](https://brilliant.org/wiki/de-morgans-laws/#de-morgans-laws-for-logical-propositions)


### Find the ith element in a matrix
Example problem: [Codewars grid index](https://www.codewars.com/kata/grid-index)

You will find many problems like this on interview prep sites. Here's the basic idea. Let's say we have a matrix like this:
```js
[
  ['a', 'b', 'c', 'd'],
  ['e', 'f', 'g', 'h'],
  ['i', 'j', 'k', 'l'],
]
```
If we iterate through the matrix elements in the normal way (left-> right and up-> down), we touch the elements in this order:
```
 0    1    2    3    4    5    6    7    8    9    10   11
'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'
```
In this ordering, you could say that `a` is the `0`th element, `b` is the `1`st element, `c` is `2`, etc.

If we are given a matrix and an integer `i`, how do we find the ith element? There are a few approaches:
1. Use [Array.prototype.flat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) to convert the matrix to a 1D array, then return `1Darray[i]`.

   **Pros:**
   - easier to code

   **Cons**:
   - requires touching every element (`O(m * n)` runtime where `m` = num of rows and `n` = num of columns)
   - requires extra memory to store the flattened array (`O(m * n)` extra space)
   - interviewers will never let you do this.
2. Iterate through the matrix and increment a counter each time you touch an element; stop when `counter === i`.

   **Pros:**
   - uses your own code
   - requires touching only `i` elements, not `m*n` elements
   - does not use extra space
   
   **Cons:** as slow as using `flat()` in the worst case. This runtime would still be considered `O(m * n)`

In fact, you can do this conversion in `O(1)` time and space. Here's how:
```js
const matrix = [
  ['a', 'b', 'c', 'd'],
  ['e', 'f', 'g', 'h'],
  ['i', 'j', 'k', 'l'],
];

const findIthElement = (matrix, i) => {
  const numCols = matrix[0].length;

  const row = Math.floor(i / numCols); // why is this integer division?
  const col = i % numCols; // why is this modulo?

  return matrix[row][col];
};

```
Note that this assumes the matrix is not ragged. This is a solution that you should study until it makes sense to you and you can convince yourself (and a stranger who codes) that it works.

For the harder matrix problems, knowing how to do this is **life**. Study this, play with it, break it, and practice it until you have it down cold.

### Convert row and col to ith index
This is the opposite of the problem above. We want to take any row, col pair and determine its `ith` index:
```js
const matrix = [
  ['a', 'b', 'c', 'd'],
  ['e', 'f', 'g', 'h'],
  ['i', 'j', 'k', 'l'],
];

const ithIndex = (matrix, row, col) => {
  const numCols = matrix[0].length;

  return (row * numCols) + col;
};
```

### Create an empty matrix
Sometimes one step of a harder problem will be easier if you first create an empty matrix. For example, create a matrix with all zeroes, then copy another matrix into it.
```js
const zeroes = (numRows, numCols) => {
  const newMatrix = []
  for (let i = 0; i < numRows; i++) {
    // create a new row
    const row = [];

    // add zeroes to the row
    for (let j = 0; j < numCols; j++) {
      row.push(0);
    }

    // add the row to the matrix
    newMatrix.push(row);
  }

  return newMatrix;
}
const myMatrix = zeroes(3, 4);
/* result is
[
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
]
*/
```
**Warning:** You will see code on Stack Overflow that looks like the code below. **Do not use this code**:
```js
// Bad
const zeroes = (numRows, numCols) => {
  // create an array of empty rows -- this is BAD
  const newMatrix = new Array(numRows).fill([])
  for (let row of newMatrix) {
    row.push(0)
  }
  return newMatrix;
}

```
Let's say `numRows = 7`. When this code calls `fill([])`, you might think that it is creating 7 separate empty arrays as rows. It is **not**. It only creates one array, and adds a reference to the **same array** in every row. That means that `newMatrix[0]` is **the same row** as (for example) `newMatrix[3]`. If you change an element in any row, you will change it for every other row as well.

`Array.prototype.fill()` is **not** safe to use when you pass it arrays, objects, etc. It should be fine for other uses with numbers, booleans, strings, etc.
```js
new Array(n).fill([]) // Bad
new Array(n).fill({}) // Bad
new Array(n).fil(42) // OK
```

### Copy a matrix
You could copy a matrix by first creating a new empty matrix, then iterating through the matrix and copying each element. That's fine but there is a more efficient approach:
```js
const copyMatrix = (matrix) => {
  const numRows = matrix.length;
  const numCols = matrix[0].length;
  
  const copy = [];
  for (let i = 0; i < numRows; i++) {
    // initialize the new row
    const row = [];

    // copy row
    for (let j = 0; j < numCols; j++) {
      row.push(matrix[i][j]);
    }

    // add the row to the new matrix
    copy.push(row);
  }

  return copy;
}
```
Take some time to play with this one and understand the key steps to the solution:
1. Find numRows = `m` and numCols = `n`
2. Initialize `copy` = a new empty array
3. For `i` = `0` -> `m-1`:

   3a. Initialize row = a new empty array
   
   3b. For `j` = `0` -> `n-1` add `matrix[i][j]` to the row

   3c. Add (push) the row to `copy`

### Transpose a matrix
See the definition of `transpose` in `Matrix jargon` below.

You can do this in a couple of ways. Here's one approach. It can be done by combining a few of the patterns in this document:
1. Figure out the number of rows and cols of the tranposed matrix
2. Create a new empty matrix with those dimensions
3. Iterate through the original matrix and for each element, `transposed[j][i] = matrix[i][j]` ... basically copy the entry but reverse the row and column. 

```js
const transpose = (matrix) => {
  // dimensions of original matrix
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  // initialize new matrix - notice the rows/cols are reversed
  const transposed = zeroes(numCols, numRows);
  
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      transposed[j][i] = matrix[i][j];
    }
  }

  return transposed;
};
```

You might be asked to transpose the matrix `in place`, which means instead of creating a new matrix, you swap the elements at `matrix[i][j]` with `matrix[j][i]` in the original matrix.

The trick to this is knowing:
1. How to swap elements in an array in JavaScript using a `temp` variable
2. You only want to iterate over **half** of the matrix; otherwise everything you swapped when you did the first half will just be swapped back, and you'll end up with your original matrix.

Item `2` can be done using one of the patterns in this document. How would you do it? (The answer is in `index.js`.)

Bonus question: Not all matrices can be transposed in place. What kinds of matrices would this **not** work for? Why?

## Matrix jargon / understanding the prompt
Phrases and terms you'll see in question prompts a lot
1. `row` vs `column`: In a 2D array represented like below, the rows are the arrays going left to right (`[1,2,3,4]`, `[5,6,7,8]`, etc.). The columns go from top to bottom (ex: `1, 5, 9` or `2, 6, 10`)
```js
[
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
]
```
2. `matrices`: plural form of matrix
1. `entry`: a single cell/element in a matrix
1. `square matrix`: matrix with the same number of rows and columns. Square matrices have special mathematical properties and in harder questions this is a big hint.
1. `rectangular matrix`: matrix where every row has the same number of columns. A rectangular matrix **might** also be square, but might not. Confirm with the interviewer.
1. `main diagonal`: the diagonal going from upper left to lower right. In the main diagonal, the row index always equals the column index. A matrix does not need to be square to have a main diagonal. Ask the interviewer if you can assume the matrix is square. 
1. `off diagonal`: the other diagonal, going from upper right to lower left.
1. `m x n matrix`: `m` = number of rows; `n` = number of cols
1. `n x n matrix`: a **square** matrix with the same number of rows and columns (`n`)
1. `i` and `j` usually (but **not always**) mean the row (`i`) and column (`j`) of an entry. Always ask the interviewer to confirm what `i` and `j` mean. 
1. `ragged matrix` or `ragged array`: a matrix where each row might have a different number of columns. These matrices are not squares or rectangles and have to be iterated through more carefully. **Always ask the interviewer if the matrix could be ragged.**
1. `shape`: the number of rows and columns 
1. `transpose`: Transposing matrices is important in linear algebra, and linear algebra is a fundamental part of AI and machine learning, so you will sometimes see this. The transpose of a matrix is sort of like the matrix turned 90 degrees, but not quite. Let's see we have this matrix `A`:
```js
const A = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
]
```
This is the transpose, which we'll call `B`:
```js
const B = [
  [1, 5, 9],
  [2, 6, 10],
  [3, 7, 11],
  [4, 8, 12]
]
```
Notice that for every cell, `A[i][j] == B[j][i]`. `i` and `j` are reversed.

Also notice that unless your matrix is square, the transpose will have a different number of rows and columns.
