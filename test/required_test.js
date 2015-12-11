var should = require('should');
var path = require('path');
var exec = require('child_process').exec;
var required = path.normalize(__dirname + '/../bin/required');

describe('node-required', function() {

  it('ignores block comments', function(done) {
    /*

       require('nonexistant');

     */

     /* require('nonexistant') */

     /***
      *
      * require('nonexistant')
      *
      ***/

    // test with **this** file as target,
    // does not fail on nonexistant

    exec('node ' + required + ' ' + __filename, function(e, stdout) {
      if (e) return done(e);
      done();
    });
  });

  it('ignores line comments', function(done) {

    // require('nonexistant');

    exec('node ' + required + ' ' + __filename, function(e, stdout) {
      if (e) return done(e);
      done();
    });
  });

  it('lists required files as flat list', function(done) {
    exec('node ' + required + ' ' + __filename, function(e, stdout) {
      if (e) return done(e);
      stdout.should.match(/should\/index.js/);
      done();
    });
  });

  it('lists required files as json', function(done) {
    exec('node ' + required + ' -j ' + __filename, function(e, stdout) {
      if (e) return done(e);
      var parsed = JSON.parse(stdout);
      console.log(parsed);
      parsed.files[0].should.match(/should\/index.js/)
      done();
    });
  });

  it('handles relative paths', function() {

    var relative = require('./relative');

    exec('node ' + required + ' ' + __filename, function(e, stdout) {
      if (e) return done(e);
      done();
    });

  });

});
