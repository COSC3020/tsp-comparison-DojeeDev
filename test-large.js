const readline = require('node:readline');
const fs = require('fs');
const { performance } = require('perf_hooks');

eval(fs.readFileSync('hk.js')+'');
eval(fs.readFileSync('ls.js')+'');

const N = 1024;


var DM = randDM(N);

function testhk(dm) {
  const s = performance.now()
  var pl = tsp_hk(dm);
  const e = performance.now();
  const t = e - s;

  return [t, pl];
}

function testls(dm) {
  const s = performance.now();
  var pl = tsp_ls(dm);
  const e = performance.now();
  const t = e - s;

  return [t, pl];
}

function randDM(n, max = 50) {
  return Array.from({ length: n }, () =>
    Array.from({ length: n }, () =>
      Math.floor(Math.random() * max) + 1
    )
  );
}

var data = testhk(DM);

console.log("Cities:");
console.log(N);

console.log("time in ms:");
console.log(data[0]);

console.log("path len:");
console.log(data[1]);




