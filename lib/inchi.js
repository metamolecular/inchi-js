'use strict';

let lib = require('../build/inchi-node');

const molfile_to_inchi = lib.cwrap('molfile_to_inchi', 'number', ['number', 'number']);
const inchi_to_key = lib.cwrap('inchi_to_key', 'number', ['number', 'number']);

const inchi = {
  molfileToInchi: function (molfile) {
    var input = lib._malloc(molfile.length + 1);
    // TODO: catch if inchi length exceeds buffer length
    var output = lib._malloc(1024);
    
    lib.writeStringToMemory(molfile.replace(/[^\x00-\x7F]/g, ''), input);
    
    let status = molfile_to_inchi(input, output);
    let result = lib.Pointer_stringify(output);
    
    lib._free(input);
    lib._free(output);
    
    if (status < 0) {
      throw new Error(result);
    }
    
    return result;
  },
  inchiToKey: function (inchi) {
    var input = lib._malloc(inchi.length + 1);
    var output = lib._malloc(28);
    
    lib.writeStringToMemory(inchi, input);
    
    let status = inchi_to_key(input, output);
    let result = lib.Pointer_stringify(output);
    
    lib._free(input);
    lib._free(output);
    
    if (status !== 0) {
      throw new Error('invalid inchi: ' + inchi);
    }
    
    return result;
  }
};

module.exports = inchi;