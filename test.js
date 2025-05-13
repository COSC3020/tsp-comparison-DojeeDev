const fs = require('fs');
const { performance } = require('perf_hooks');

eval(fs.readFileSync('hk.js')+'');
eval(fs.readFileSync('ls.js')+'');

const maxN = 20;

var data = 
  [["number of cities", "held karp time ms", "local search time ms", 
    "held karp path length", "local search path length"]];

for (var i = 1; i <= maxN; i++ ) {
  var dm = randDM(i);

  const st_hk = performance.now()
  var hk_path_len = tsp_hk(dm);
  const et_hk = performance.now();
  const hk_time = et_hk - st_hk;

  const st_ls = performance.now();
  var ls_path_len = tsp_ls(dm);
  const et_ls = performance.now();
  const ls_time = et_ls - st_ls;
  
  var row = [i, hk_time, ls_time, hk_path_len, ls_path_len];
  console.log(row);

  data.push(row);
}

const csvContent = data.map(row => row.join(',')).join('\n');
fs.writeFileSync('output.csv', csvContent);

function randDM(n, max = 50) {
  return Array.from({ length: n }, () =>
    Array.from({ length: n }, () =>
      Math.floor(Math.random() * max) + 1
    )
  );
}


