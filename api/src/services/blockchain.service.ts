import Web3 from 'web3';

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

const wsOptions = {
  timeout: 30000,
  keepalive: true,
  keepaliveInterval: 60000,
  reconnect: {
    auto: true,
    delay: 100,
    maxAttempts: 3,
    onTimeout: false,
  }
}

class BlockchainService {
  constructor() {
    const wsProvider = new Web3.providers.WebsocketProvider('ws://localhost:8546', wsOptions)
    const web3 = new Web3(wsProvider);
    const proxy = new Proxy(web3, proxiedWeb3Handler);
    this.web3 = proxy;
}

  public async block(): any {
    try {
      const block = await this.web3.eth.getBlock('latest');
      return block
    } catch (err) {
      return null;
    }
  }
}

export default BlockchainService;

