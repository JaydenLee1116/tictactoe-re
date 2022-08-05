'use strict';

const data = [];
for (let i = 0; i < 3; i++) {
  data.push([]);
}

let turn = 'O';
const $table = document.createElement('table');
for (let i = 0; i < 3; i++) {
  const $tr = document.createElement('tr');
  for (let i = 0; i < 3; i++) {
    const $td = document.createElement('td');
    $td.addEventListener('click', (event) => {
      console.log('clicked');
      if (event.target.textContent) return;
      // event.target이 곧 $td를 의미한다. 가급적 event.target을 쓰는 게 좋다!
      event.target.textContent = turn;
      turn = turn === 'O' ? 'X' : 'O';
    });
    $tr.append($td);
  }
  $table.append($tr);
}
document.body.append($table);
