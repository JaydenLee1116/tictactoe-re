'use strict';

const { body } = document;
const $table = document.createElement('table');
const $result = document.createElement('div');
const rows = [];

let turn = 'O';
const callback = (event) => {
  if (event.target.textContent) return;
  // event.target이 곧 $td를 의미한다. 가급적 event.target을 쓰는 게 좋다!
  // 정확히는 event.currentTarget을 해주는 게 더 정확한 표현!
  event.target.textContent = turn;
  turn = turn === 'O' ? 'X' : 'O';
};
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
$table.addEventListener('click', callback);
// 다시 체크하기(버블링 파트)
$table.addEventListener('click', (event) => {
  console.log(event.target);
  console.log(event.currentTarget);
});

body.append($table);
body.append($result);
