const { getSolution } = require('./solver');

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

describe('getSolution', () => {

  describe('invalid dimensions', () => {
    test('should throw', () => {
      expect(() => getSolution([])).toThrow();
    })
  });

  describe('unique solution', () => {
    test('should find a unique solution', () => {
      const {board, isUnique, hasSolution} = getSolution(getUnique());
      expect(hasSolution).toBe(true);
      expect(isUnique).toBe(true);
      expect(board).toEqual(getUniqueSolution());
    });
  });

  describe('multiple solutions', () => {
    test('should find multiple solutions', () => {
      const {board, isUnique, hasSolution} = getSolution(getEmptyBoard());
      expect(hasSolution).toBe(true);
      expect(isUnique).toBe(false);
    });
  });

});
