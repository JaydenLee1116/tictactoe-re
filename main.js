'use strict';

const { body } = document;
const $table = document.createElement('table');
const $result = document.createElement('div');
const rows = [];

let turn = 'O';
for (let i = 0; i < 3; i++) {
  const $tr = document.createElement('tr');
  const cells = [];
  for (let j = 0; j < 3; j++) {
    const $td = document.createElement('td');

    $td.addEventListener('click', (event) => {
      console.log('clicked');
      if (event.target.textContent) return;
      // event.target이 곧 $td를 의미한다. 가급적 event.target을 쓰는 게 좋다!
      event.target.textContent = turn;
      turn = turn === 'O' ? 'X' : 'O';
    });

    cells.push($td);
    $tr.append($td);
  }
  rows.push(cells);
  $table.append($tr);
}
body.append($table);
