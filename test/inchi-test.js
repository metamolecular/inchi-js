'use strict';

describe('InChI', function () {
  let inchi, molfiles;
  
  
  beforeEach(function () {
    inchi = require('../lib/inchi');
    molfiles = require('./molfiles');
  });
  
  describe('#molfileToInchi', function () {
    it('returns inchi given valid molfile', function () {
      expect(inchi.molfileToInchi(molfiles.benzene)).to.equal(
        'InChI=1S/C6H6/c1-2-4-6-5-3-1/h1-6H'
      );
    });
    
    it('returns inchi given valid molfile', function () {
      expect(inchi.molfileToInchi(molfiles.benzene)).to.equal(
        'InChI=1S/C6H6/c1-2-4-6-5-3-1/h1-6H'
      );
    });
  });
  
  describe('#inchiToKey', function () {
    it('...', function () {
      expect(inchi.inchiToKey(
        'InChI=1S/C6H6/c1-2-4-6-5-3-1/h1-6H'
      )).to.equal('UHOVQNZJYSORNB-UHFFFAOYSA-N');
    });
  });
});