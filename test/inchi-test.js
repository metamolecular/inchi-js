'use strict';

describe('InChI', function () {
  let inchi, molfiles;
  
  beforeEach(function () {
    inchi = require('../lib/inchi');
    molfiles = require('./molfiles');
  });
  
  describe('#molfileToInchi', function () {
    it('throws given invalid molfile', function () {
      expect(function () {
        inchi.molfileToInchi('invalid');
      }).to.throw('invalid molfile');
    });
    
    it('returns InChI for benzene', function () {
      expect(inchi.molfileToInchi(molfiles.benzene)).to.equal(
        'InChI=1S/C6H6/c1-2-4-6-5-3-1/h1-6H'
      );
    });
    
    it('returns InChI for Unicode-containing molfile', function () {
      expect(inchi.molfileToInchi(molfiles.unicode)).to.equal(
        'InChI=1S/C18H24N4O4/c1-4-5-6-26-17(23)11-8-14(24-2)13(15(9-11)25-3)7-12-10-21-18(20)22-16(12)19/h8-10H,4-7H2,1-3H3,(H4,19,20,21,22)'
      );
    });
  });
  
  describe('#inchiToKey', function () {
    it('throws given invalid inchi', function () {
      expect(function () {
        inchi.inchiToKey('foo');
      }).to.throw('invalid inchi: foo');
    });
    
    it('returns key given valid inchi', function () {
      expect(inchi.inchiToKey(
        'InChI=1S/C6H6/c1-2-4-6-5-3-1/h1-6H'
      )).to.equal('UHOVQNZJYSORNB-UHFFFAOYSA-N');
    });
  });
});