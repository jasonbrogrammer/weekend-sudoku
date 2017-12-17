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
  for (const fn of [getRow, getCol]) {
    for(const x of fn(length, row, col)) {
      if (row !== x[0] || col !== x[1]) { result.push(x); }
    }
  }
  for(const x of getBox(length, row, col)) {
    if (row !== x[0] && col !== x[1]) { result.push(x); }
  }
  return result;
};

const validate = board => {
  const {length} = board;
  if (!dimensions.has(length)) {
    throw new Error(`Invalid dimensions ${length}x${length}`);
  }
  for(let i = 0; i < length ; i++) {
    for(let j = 0; j < length ; j++) {
      if (board[i][j] && getOtherPoints(length, i, j).some(([row, col]) => board[row][col] === board[i][j])) return false;
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
const solveHelper = (pos, values, board) => {
    const {length} = board;
    const row = ~~(pos / length);
    const col = pos % length;
    const recurse = () => solveHelper(pos + 1, values, board);

    if (pos === length*length) return true;
    if (board[row][col]) return recurse();

    for (const value of values) {
      if (getOtherPoints(length, row, col).some(([i, j]) => board[i][j] === value)) continue;
      board[row][col] = value;
      if (recurse()) return true;
      board[row][col] = 0;
    }
    return false;
};

const solve = (board, inc) => {
  if (!validate(board)) return false;
  const values = Array.from({length: board.length}).map((x, i) => i + 1);
  if (!inc) values.reverse();
  return solveHelper(0, values, board);
};

/**
 * [getSolution description]
 * @param  {Array.<Array.<number>>} board [description]
 * @return {Object}       [description]
 */
const getSolution = board => {
  const boardA = board.map(x => x.slice());
  const hasSolution = solve(boardA, true);
  return {
    board: boardA,
    hasSolution,
    isUnique: hasSolution && (() => {
      const boardB = board.map(x => x.slice());
      solve(boardB, false);
      return boardA.every(
        (row, index) => {
            const rowB = boardB[index];
            return row.every((x, i) => x === rowB[i]);
        }
      );
    })()
  };
};

module.exports = { getSolution, validSizes: [...dimensions.keys()] };
