import Web3 from '../../../../web3';

const blockchain = () => {
  // TODO: build out blockchain interactions and import as a proper module
  const web3 = Web3(APP_CONFIG.blockchain.url);
  return web3;
};
