'use strict';

const { body } = document;
const $table = document.createElement('table');
const $result = document.createElement('div');
const rows = [];

for (let i = 0; i < 3; i++) {
  const $tr = document.createElement('tr');
  const cells = [];
  for (let j = 0; j < 3; j++) {
    const $td = document.createElement('td');

    cells.push($td);
    $tr.append($td);
  }
  rows.push(cells);
  $table.append($tr);
}

let turn = 'O';

const checkWinnerAndDraw = (target) => {
  const hasWinner = checkWinner(target);

  if (hasWinner) {
    $result.textContent = `${turn} 승리!`;
    $table.removeEventListener('click', callback);
    return;
  }

  const isDraw = rows.flat().every((cell) => cell.textContent);
  if (isDraw) {
    $result.textContent = '무승부!';
  }
  turn = turn === 'O' ? 'X' : 'O';
};

let clickable = true;
const callback = (event) => {
  if (!clickable) return;
  if (event.target.textContent) return;
  // event.target이 곧 $td를 의미한다. 가급적 event.target을 쓰는 게 좋다!
  // 정확히는 event.currentTarget을 해주는 게 더 정확한 표현!
  event.target.textContent = turn;

  const hasWinner = checkWinner(event.target);

  checkWinnerAndDraw(event.target);

  if (turn === 'X') {
    const emptyCells = rows.flat().filter((value) => !value.textContent);
    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    clickable = false;
    setTimeout(() => {
      randomCell.textContent = 'X';
      checkWinnerAndDraw(randomCell);
      clickable = true;
    }, 1000);
  }
};

const checkWinner = (target) => {
  let rowIndex;
  let columnIndex;

  rows.forEach((row, ri) => {
    row.forEach((cell, ci) => {
      if (cell === target) {
        rowIndex = ri;
        columnIndex = ci;
      }
    });
  });

  let hasWinner = false;

  // 가로줄 체크
  if (
    rows[rowIndex][0].textContent === turn &&
    rows[rowIndex][1].textContent === turn &&
    rows[rowIndex][2].textContent === turn
  ) {
    hasWinner = true;
  }

  // 세로줄 체크
  if (
    rows[0][columnIndex].textContent === turn &&
    rows[1][columnIndex].textContent === turn &&
    rows[2][columnIndex].textContent === turn
  ) {
    hasWinner = true;
  }

  // 대각선 체크
  if (
    rows[0][0].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][2].textContent === turn
  ) {
    hasWinner = true;
  }
  if (
    rows[0][2].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][0].textContent === turn
  ) {
    hasWinner = true;
  }

  return hasWinner;
};

$table.addEventListener('click', callback); // 버블링

body.append($table);
body.append($result);
