import * as path from 'path';
import * as express from 'express';
import { Router, Request, Response, NextFunction, Application } from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as whoisParser from 'parse-whois';
import * as whois from 'whois';

export class WhoisService {

  constructor(
    public express: express.Application) {
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    const router = express.Router();

    router.get('/', (req, res, next) => {
      res.json({
        usage: '/whois/domain.ch'
      });
    })

    router.get('/whois/:domain', (req, res, next) => {
      this.whois(req, res, next);
    });

    this.express.use('/', router);
  }

  private whois(request: Request, response: Response, nextFunction: NextFunction) {
    const domain = request.params.domain;
    whois.lookup(domain, (error, whoisOutput) => {
      if(error) throw error;
      
      response.json(whoisParser.parseWhoIsData(whoisOutput));
    });
  }

}