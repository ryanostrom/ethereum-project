const Web3 = require('web3')

const app = () => {
  const web3 = new Web3(process.env.BLOCKCHAIN.url)

  const accounts = web3.eth.getAccounts()
  console.log('### accounts', accounts)

  return web3
}

export default app
