'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/pictureTags', function() {

  it('should respond with a JSON array of tags', function(done) {
    request(app)
      .get('/api/tags')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.tags.should.be.instanceof(Array);
        done();
      });
  });
});
