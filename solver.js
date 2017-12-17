const dimensions = new Map();

{
  const blockSizes = [2,3,4]; // 4x4 9x9 16x16
  for(const size of blockSizes) {
    const length = size * size;
    dimensions.set(length, size);
  }
}

const getRow = (length, row, col) => Array.from({length}).map((x, i) => [row, i]);
const getCol = (length, row, col) => Array.from({length}).map((x, i) => [i, col]);
const getBox = (length, row, col) => {
    // get top left corner
    const sqrt = dimensions.get(length);
    const startRow = sqrt * Math.trunc(row / sqrt);
    const startCol = sqrt * Math.trunc(col / sqrt);
    const result = [];
    for(let i = 0; i < sqrt; i++) {
      for(let j = 0; j < sqrt; j++) {
        result.push([startRow + i, startCol + j]);
      }
    }
    return result;
};
const getOtherPoints = (length, row, col) => {
  const result = [];
  for (const fn of [getRow, getCol, getBox]) {
    for(const x of fn(length, row, col)) {
      if (row !== x[0] || col !== x[1]) {
        result.push(x);
      }
    }
  }
  return result;
};

const validate = board => {
  if (!dimensions.has(board.length)) {
    throw new Error(`Invalid dimensions ${length}x${length}`);
  }
  const {length} = board;
  const values = Array.from({length}).map((x, i) => i + 1);

  for(let i = 0; i < length ; i++) {
    for(let j = 0; j < length ; j++) {
      if (!board[i][j]) continue;
      if (getOtherPoints(length, i, j).some(([row, col]) => board[row][col] === board[i][j])) return false;
    }
  }
  return true;
};

/**
 * Assumptions length x length
 * board is not invalid to start
 * @param  {Array.<Array.<number>>} board [description]
 * @return {boolean}       [description]
 */
const solveHelper = (board, inc = true) => {
    const {length} = board;

    const values = Array.from({length}).map((x, i) => i + 1);
    if (!inc) values.reverse();

    for (let i =0 ; i < length*length; i++) {
      const row = Math.trunc(i / length);
      const col = i % length;
      if (board[row][col]) continue;
      for (const value of values) {
        if (getOtherPoints(length, row, col).some(([i, j]) => board[i][j] === value)) continue;
        board[row][col] = value;
        if (solveHelper(board, inc)) return true;
        board[row][col] = 0;
      }
      return false;
    }

    return true;
};

const solve = (board, ...args) => validate(board) && solveHelper(board, ...args);

/**
 * [getSolution description]
 * @param  {Array.<Array.<number>>} board [description]
 * @return {Object}       [description]
 */
const getSolution = board => {
  const boardA = board.map(x => x.slice());
  const boardB = board.map(x => x.slice());
  const hasSolution = solve(boardA, true);
  if (hasSolution) { solve(boardB, false); }
  const isUnique = hasSolution && boardA.every(
    (row, index) => {
        const rowB = boardB[index];
        return row.every((x, i) => x === rowB[i]);
    }
  );
  return { board: boardA, hasSolution, isUnique };
};

module.exports = { getSolution, validSizes: [...dimensions.keys()] };
