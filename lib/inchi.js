let lib = require('../build/inchi-node');

const inchi = {
  molfileToInchi: lib.cwrap('get_inchi', 'string', [ 'string' ]),
  inchiToKey: lib.cwrap('inchi_to_key', 'string', [ 'string' ])
};

module.exports = inchi;