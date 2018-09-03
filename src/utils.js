import * as _ from "lodash";

function createCell(x, y) {
  return {
    value: null,
    x,
    y,
    cord: [x, y]
  };
}
const createBoard = (cells, height) => {
  let matrix = [];
  for (let y = 1; y <= height; y++) {
    matrix.push(
      cells.filter(cell => {
        return cell.y === y;
      })
    );
  }
  return matrix;
};

const getPlayerCell = cells => {
  var playercell;
  _.flattenDeep(cells).forEach((cell, i) => {
    if (cell.value === "player") {
      playercell = cell;
    }
  });
  return playercell;
};

const getTotalFruitCell = cells => {
  const fruitCells = _.flattenDeep(cells).filter(
    cell => cell.value === "fruits"
  );
  return fruitCells;
};

const selectPlayerCell = (cells = [], width, height) => {
  let rowMedian = Math.ceil(width / 2);
  let colMedian = Math.ceil(height / 2);
  cells.forEach((val, i, cells) => {
    if (val.x === rowMedian && val.y === colMedian) {
      cells[i].value = "player";
    }
  });
  return cells;
};

const selectFruitCell = (cells, width, height) => {
  let totalFruits = Math.ceil((width * height) / width);
  let count = 0;
  while (count <= totalFruits) {
    console.log(count);
    let xRandom = parseInt(Math.random() * width);
    let yRandom = parseInt(Math.random() * height);
    cells.forEach((val, i, cells) => {
      if (val.x === xRandom && val.y === yRandom) {
        if (val.value !== "player") {
          cells[i].value = "fruits";
        }
      }
    });
    count = getTotalFruitCell(cells).length + 1;
  }
  return cells;
};
const createBoardCells = (width, height) => {
  let x;
  let y;
  let cells = [];
  for (x = 1; x <= width; x++) {
    for (y = 1; y <= height; y++) {
      cells.push(createCell(x, y));
    }
  }
  let readyCell = selectFruitCell(
    selectPlayerCell(cells, width, height),
    width,
    height
  );
  return createBoard(readyCell, height);
};

const getCellCoordinate = (cells, newCell) => {
  const cell = _.flattenDeep(cells).find(cell => {
    return cell.x === newCell.x && cell.y === newCell.y;
  });
  return cell;
};

const updatedCells = (cells, newCell) => {
  return cells.map((cell, i) => {
    return cell.map((cellObj, i) => {
      if (cellObj.x === newCell.x && cellObj.y === newCell.y) {
        cellObj = newCell;
      }
      return cellObj;
    });
  });
};

export {
  createBoardCells,
  getPlayerCell,
  getCellCoordinate,
  updatedCells,
  getTotalFruitCell
};
