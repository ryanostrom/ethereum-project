import { Router } from 'express';
import BlockchainController from '@controllers/blockchain.controller';
import Route from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class BlockchainRoute implements Route {
  public path = '/blockchain/';
  public router = Router();
  public blockchainController = new BlockchainController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}block`, this.blockchainController.block);
  }
}

export default BlockchainRoute;
