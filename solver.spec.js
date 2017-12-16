const { solveHelper } = require('./solver');

const getEmptyBoard = () => Array.from({length: 9})
  .map(() => Array.from({length: 9}).fill(0));

const getUnique = () => [
  [ 6, 0, 0, 5, 7, 0, 0, 0, 2 ],
  [ 9, 0, 0, 0, 8, 0, 0, 0, 0 ],
  [ 0, 7, 1, 2, 6, 3, 0, 0, 0 ],
  [ 5, 2, 7, 0, 0, 0, 0, 4, 0 ],
  [ 0, 0, 8, 3, 4, 5, 7, 0, 0 ],
  [ 0, 3, 0, 0, 0, 0, 1, 8, 5 ],
  [ 0, 0, 0, 1, 9, 2, 4, 6, 0 ],
  [ 0, 0, 0, 0, 3, 0, 0, 0, 8 ],
  [ 3, 0, 0, 0, 5, 8, 0, 0, 1 ] ];

const getUniqueSolution = () => [
  [ 6, 4, 3, 5, 7, 9, 8, 1, 2 ],
  [ 9, 5, 2, 4, 8, 1, 6, 3, 7 ],
  [ 8, 7, 1, 2, 6, 3, 9, 5, 4 ],
  [ 5, 2, 7, 8, 1, 6, 3, 4, 9 ],
  [ 1, 9, 8, 3, 4, 5, 7, 2, 6 ],
  [ 4, 3, 6, 9, 2, 7, 1, 8, 5 ],
  [ 7, 8, 5, 1, 9, 2, 4, 6, 3 ],
  [ 2, 1, 9, 6, 3, 4, 5, 7, 8 ],
  [ 3, 6, 4, 7, 5, 8, 2, 9, 1 ] ];

describe('solveHelper', () => {

  describe('unique solution', () => {

    test('should find a unique solution', () => {
      const boardA = getUnique();
      const boardB = getUnique();
      solveHelper(boardA, true);
      solveHelper(boardB, false);
      expect(boardA).toEqual(boardB);
      expect(boardA).toEqual(getUniqueSolution());
    });

  });

  describe('multiple solutions', () => {

    test('should find multiple solutions', () => {
      const boardA = getEmptyBoard();
      const boardB = getEmptyBoard();
      solveHelper(boardA, true);
      solveHelper(boardB, false);
      expect(boardA).not.toEqual(boardB);
    });

  });





});
