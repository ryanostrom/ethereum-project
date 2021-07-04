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

class BlockchainService {

  constructor() {
    try {
      const wsProvider = new Web3.providers.WebsocketProvider('http://localhost/ws', {
        timeout: 30000,
        keepalive: true,
        keepaliveInterval: 60000,
        reconnect: {
          auto: true,
          delay: 100,
          maxAttempts: 3,
          onTimeout: false,
        }
      })

      const web3 = new Web3(wsProvider);
      const proxy = new Proxy(web3, proxiedWeb3Handler);
      this.web3 = proxy;

      this.debug();
    } catch (error) {
      console.log('### web3 init error', error)
    }
  }

  public async debug = () => {
    try {
      const interval = setInterval(() => {
        const provider = this.web3.currentProvider
        console.log('### connected', provider.connected)
      }, 1000)
    } catch (err) {
      console.log('### web3 debug error', error)
    }
  }

  public async block(): any {
    try {
      const block = await this.web3.eth.getBlock('latest');
      console.log('### block', block)
      return block
    } catch (err) {
      console.log('### web3 block error', err)
      return null;
    }
  }
}

export default BlockchainService;

