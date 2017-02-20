import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

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
    let router = express.Router();

    router.get('/', (req, res, next) => {
      res.json({
        message: 'Knock, knock...'
      });
    }).get('/whois', (req, res, next) => {
      res.json({
        message: 'The hidden-jokes-on-git-man!',
        note: 'Found this - send me a tweet and if you are the first you\'ll get a free book!'
      });
    });
    this.express.use('/', router);
  }

}