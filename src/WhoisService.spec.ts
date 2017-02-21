import * as mocha from 'mocha';
import * as chai from 'chai';
import * as express from 'express';
import chaiHttp = require('chai-http');

import { WhoisService } from './WhoisService';

chai.use(chaiHttp);
const expect = chai.expect;

describe('baseRoute', () => {
  const WhoisExpress = new WhoisService(express()).express;

  it('should be json', () => {
    return chai.request(WhoisExpress).get('/')
    .then(res => {
      expect(res.type).to.eql('application/json');
    });
  });

  it('should knock knock', () => {
    return chai.request(WhoisExpress).get('/')
    .then(res => {
      expect(res.body.message).to.contain('Knock')
    });
  });

  it('should make joke', () => {
    return chai.request(WhoisExpress).get('/whois')
    .then(res => {
      expect(res.body.message).to.contain('joke')
    });
  });

});