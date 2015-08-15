'use strict';

var should = require('should');
var app = require('../../../app');
var request = require('supertest');

describe('GET /api/v1/pictures', function() {

  it('should respond with a JSON object', function(done) {
    request(app)
      .get('/api/v1/pictures')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });

  it('should accept an offset parameter', function(done) {
    request(app)
      .get('/api/v1/pictures')
      .query({ offset: 100})
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        should.not.exist(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });

  it('should accept a limit parameter', function(done) {
    request(app)
      .get('/api/v1/pictures')
      .query({ limit: 100})
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        should.not.exist(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });

  it('should accept a tags parameter', function(done) {
    request(app)
      .get('/api/v1/pictures')
      .query({ tags: 'aston+martin'})
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        should.not.exist(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });

});
