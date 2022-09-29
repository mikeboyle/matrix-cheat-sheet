// Some matrices
const rectangularMatrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
];

const squareMatrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const raggedMatrix = [
  [1, 2, 3],
  [4, 5, 6, 7, 8],
  [9],
  [10, 11, 12]
];

const charMatrix = [
  ['a', 'b', 'c', 'd'],
  ['e', 'f', 'g', 'h'],
  ['i', 'j', 'k', 'l'],
];

// Find number of rows / cols, non ragged matrix
const printNumRowsCols = (matrix) => {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  console.log({ numRows, numCols });
};
printNumRowsCols(rectangularMatrix); // 3, 4

// Total number of elements in square/rectangular matrix
const numElements = (matrix) => {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  return numRows * numCols;
};
console.log(numElements(rectangularMatrix)); // 12

// Total number of elements in ragged matrix
const numElementsRagged = (matrix) => {
  let total = 0;

  for (let row of matrix) {
    total += row.length;
  }
  return total;
}
console.log(numElementsRagged(raggedMatrix)); // 12

// Iterate upper left => lower right
const printMatrix = (matrix) => {
  const numRows = matrix.length; // 3
  const numCols = matrix[0].length; // 4

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const currentElement = matrix[i][j];
      // do something with the current element
      console.log(currentElement);
    }
  }
};
printMatrix(rectangularMatrix);

// Iterate ragged matrix
const printRaggedMatrix = (matrix) => {
  for (let i = 0; i < matrix.length; i++) {
    // IMPORTANT: use matrix[i].length
    for (let j = 0; j < matrix[i].length; j++) {
      const currentElement = matrix[i][j];
      // do something with the current element
      console.log(currentElement);
    }
  }
}
printRaggedMatrix(raggedMatrix);

const printMatrixReverse = (matrix) => {
  const numRows = matrix.length; // 3
  const numCols = matrix[0].length; // 4

  for (let i = numRows - 1; i >= 0; i--) {
    for (let j = numCols - 1; j >= 0; j--) {
      const currentElement = matrix[i][j];
      // do something with the current element
      console.log(currentElement);
    }
  }
};
printMatrixReverse(rectangularMatrix);

const printMatrixByColumn = (matrix) => {
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
};
printMatrixByColumn(rectangularMatrix);

const printMainDiagonal = (matrix) => {
  const numRows = matrix.length;

  for (let i = 0; i < numRows; i++) {
    // NOTICE: row index == column index
    // ALSO NOTICE: we don't need an inner loop
    const currentElement = matrix[i][i];
    // do something with the current element
    console.log(currentElement);
  }
}
printMainDiagonal(squareMatrix);

const printOffDiagonal = (matrix) => {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  for (let i = 0; i < numRows; i++) {
    // NOTICE: convince yourself why matrix[i][numCols - 1 - i] works.
    // Why isn't it matrix[i][numCols - i]? Why do we subtract the 1?
    // Why do we need to know numCols to do the off diagonal, but not the main diagonal?
    // ALSO NOTICE: we don't need an inner loop
    const currentElement = matrix[i][numCols - 1 - i];
    // do something with the current element
    console.log(currentElement);
  }
}
printOffDiagonal(squareMatrix);

const printUpperDiagonal = (matrix) => {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  for (let i = 0; i < numRows; i++) {
    for (let j = i; j < numCols; j++) {
      const currentElement = matrix[i][j];
      // do something with the current element
      console.log(currentElement);
    }
  }
};

console.log(printUpperDiagonal(squareMatrix));

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

console.log(isInBounds(0, 0, rectangularMatrix)); // true
console.log(isOutOfBounds(0, 0, rectangularMatrix)); // false

console.log(isInBounds(2, 4, rectangularMatrix)); // false
console.log(isOutOfBounds(2, 4, rectangularMatrix)); // true

// Find the ith element in a matrix (counted normally from left->right, up->down)
const findIthElement = (matrix, i) => {
  const numCols = matrix[0].length;

  const row = Math.floor(i / numCols);
  const col = i % numCols;

  return matrix[row][col];
};

for (let i = 0; i < (charMatrix.length * charMatrix[0].length); i++) {
  console.log(`the ${i}th element is ${findIthElement(charMatrix, i)}`);
}

// Convert a row and column to the ith index (index in a flattened matrix)
const ithIndex = (matrix, row, col) => {
  const numCols = matrix[0].length;

  return (row * numCols) + col;
};

for (let row = 0; row < charMatrix.length; row++) {
  for (let col = 0; col < charMatrix[0].length; col++) {
    console.log(`${charMatrix[row][col]} is the ${ithIndex(charMatrix, row, col)}th element`);
  }
}

// Create a new matrix with all zeroes
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
for (let row of myMatrix) {
  console.log(row);
}

// Copy a matrix
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
const myCopy = copyMatrix(rectangularMatrix);
for (let row of myCopy) {
  console.log(row);
}

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
let t = transpose(rectangularMatrix);
for (let row of t) {
  console.log(row);
}

const inplaceTranspose = (matrix) => {
  if (matrix.length !== matrix[0].length) {
    // in place transpose requires a square matrix
    // return original matrix or throw error, etc.
    console.log("Error! Matrix must be square");
    return matrix
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = i; j < matrix.length; j++) {
      let temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }
}

const mat = [
  [100, 200, 300],
  [400, 500, 600],
  [700, 800, 900]
];
inplaceTranspose(mat);
for (let row of mat) {
  console.log(row);
}