import { NextFunction, Request, Response } from 'express';
import BlockchainService from '@services/blockchain.service';

class BlockchainController {
  public blockchainService = new BlockchainService();

  public block = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const block = await this.blockchainService.block();
      res.status(200).json({ data: { block },  message: 'block success' });
    } catch (error) {
      next(error);
    }
  };
}

export default BlockchainController;
