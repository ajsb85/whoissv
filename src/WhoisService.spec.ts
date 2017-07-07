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

  it('should show usage', () => {
    return chai.request(WhoisExpress).get('/')
    .then(res => {
      expect(res.body.usage).to.contain('whois')
    });
  });

  it('should have github.com in it', () => {
    return chai.request(WhoisExpress).get('/whois/github.com')
    .then(res => {
      
      expect(res.body[0]['value']).to.contain('GITHUB.COM');
    });
  });

});