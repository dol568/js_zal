import shuffle from "lodash.shuffle";

export class Player {
  constructor(id) {
    this.id = id;
    this.memory = [];
  }

  remember(index, element) {
    this.memory.push({ index, element });
  }

  makeMove(board) {
    const knownPairs = this.memory.filter((item, _, arr) =>
      arr.some(
        (other) =>
          other.element === item.element &&
          other.index !== item.index &&
          !board[item.index].matched &&
          !board[other.index].matched
      )
    );

    if (knownPairs.length > 0) {
      const pair = knownPairs[0];
      const first = pair.index;
      const second = this.memory.find((item) => item.element === pair.element && item.index !== first).index;
      return [first, second];
    } else {
      const unseenIndices = board
        .map((_, index) => index)
        .filter((index) => !board[index].revealed && !board[index].matched);
      return shuffle(unseenIndices).slice(0, 2);
    }
  }
}
