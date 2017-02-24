'use strict';

const InChI = require('../lib/inchi');
const molfiles = require('../test/molfiles');

let start = new Date();
let iterations = 100000;

for (let i = 0; i < iterations; i++) {
  InChI.molfileToInchi(molfiles.unicode)
}

console.log('time', (new Date() - start) / (iterations));