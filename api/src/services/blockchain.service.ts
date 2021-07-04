import HttpException from '@exceptions/HttpException';
import Web3 from 'web3';
import net from 'net';

const promisify = (inner) =>
  new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) { reject(err) }

      resolve(res);
    })
  );

const proxiedWeb3Handler = {
  // override getter
  get: (target, name) => {
    const inner = target[name];
    if (inner instanceof Function) {
      // Return a function with the callback already set.
      return (...args) => promisify(cb => inner(...args, cb));
    } else if (typeof inner === 'object') {
      // wrap inner web3 stuff
      return new Proxy(inner, proxiedWeb3Handler);
    } else {
      return inner;
    }
  },
};

class BlockchainService {
  public web3 = new Proxy(
    new Web3(
      new Web3.providers.IpcProvider(
        '/app/blockchain/nodes/bootnode/geth.ipc',
        net,
      ),
    ),
    proxiedWeb3Handler,
  );

  public async block(): any {
    try {
      const block = await this.web3.eth.getBlock('latest');
      console.log('### block', block)
      return block
    } catch (err) {
      console.log('### web3::block error', err)
      return null;
    }
  }
}

export default BlockchainService;

