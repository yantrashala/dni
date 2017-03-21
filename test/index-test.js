var chai = require('chai')
  , expect = chai.expect
  , should = chai.should();

var dni = require('../index');

/* Describing the test case of the index.js */
describe('index.js', function () {

  describe('deployAndInstall', function () {
    var input = 'lodash';
    it('should execute deployAndInstall', function (done) {
      dni.deployAndInstall(input, function (err, data) {
        console.log(data);
        expect(data).to.equal('DONE');
        done();
      });
    });

    it('should execute deployAndInstall', function (done) {
      input = 'lodashaha';
      dni.deployAndInstall(input, function (err, data) {
        console.log(data);
        expect(data).to.equal(undefined);
        done();
      });
    });
  });
});
