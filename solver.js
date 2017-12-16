/**
 * Assumptions 9x9
 * board is not invalid to start
 * @param  {Array.<Array.<number>>} board [description]
 * @return {boolean}       [description]
 */
const solveHelper = (board, inc = true) => {

    const values = Array.from({length: board.length}).map((x, i) => i + 1);
    if (!inc) values.reverse();

    /**
     * @returns {Array.<Array>} // Array of 'tuples'
     */
    const getRow = (row, col) => Array.from({length: 9}).map((x, i) => [row, i]);
    const getCol = (row, col) => Array.from({length: 9}).map((x, i) => [i, col]);
    const getBox = (row, col) => {
        // get top left corner
        const startRow = 3 * Math.trunc(row / 3);
        const startCol = 3 * Math.trunc(col / 3);
        const result = [];
        for(let i = 0; i < 3; i++) {
          for(let j = 0; j < 3; j++) {
            result.push([startRow + i, startCol + j]);
          }
        }
        return result;
    };

    const canPlace = (row, col, value) => [ getBox, getRow, getCol ]
        .map(fn => fn(row, col))
        .reduce((a, b) => a.concat(b))
        .every(([row, col]) => board[row][col] !== value);


    for (let i =0 ; i< 9*9; i++) {
      const row = Math.trunc(i / 9);
      const col = i % 9;
      if (board[row][col]) continue;
      for (const value of values) {
        if (!canPlace(row, col, value)) continue;
        board[row][col] = value;
        if (solveHelper(board, inc)) return true;
        board[row][col] = 0;
      }
      return false;
    }

    return true;
};

/**
 * [getSolution description]
 * @param  {Array.<Array.<number>>} board [description]
 * @return {Object}       [description]
 */
const getSolution = board => {
  const boardA = board.map(x => x.slice());
  const boardB = board.map(x => x.slice());
  const hasSolution = solveHelper(boardA, true);
  if (hasSolution) { solveHelper(boardB, false); }
  const isUnique = hasSolution && boardA.every(
    (row, index) => {
        const rowB = boardB[index];
        return row.every((x, i) => x === rowB[i]);
    }
  );
  return { board: boardA, hasSolution, isUnique };
};

module.exports = { solveHelper, getSolution };
