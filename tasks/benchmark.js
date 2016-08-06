'use strict';

const InChI = require('../lib/inchi');
const molfiles = require('../test/molfiles');

let start = new Date();

for (let i = 0; i < 1000; i++) {
  InChI.molfileToInchi(molfiles.unicode)
}

console.log('time', (new Date() - start) / (1000));