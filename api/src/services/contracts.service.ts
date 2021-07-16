import path from 'path';
import fs from 'fs';
import solc from 'solc';
import BlockchainService from '@services/blockchain.service';

interface Evm {
  bytecode: any;
}

interface Contract {
  abi: any;
  evm: Evm;
};

interface DeployOpts {
  contract: Contract;
  from: string;
  gas: number;
  args: any | null;
};

class Contracts extends BlockchainService {

  public compile(contract: string): Contract {
    const cPath = path.resolve(__dirname, '../contracts', `${contract}.sol`);
    const input = {
      language: 'Solidity',
      sources: {
        [`${contract}`]: {
          content: fs.readFileSync(cPath, 'utf8'),
        }
      },
      settings: {
        outputSelection: {
          '*': {
            '*': ['abi', 'evm.bytecode']
          }
        }
      }
    };
    const output = JSON.parse(
      solc.compile(JSON.stringify(input))
    );

    return output.contracts[contract][contract];
  }

  public async deploy({ contract, from, gas, args }: DeployOpts): null {
    const contractInstance = new this._web3.eth.Contract(contract.abi, from);

    try {
      const transaction = await contractInstance
        .deploy({ data: contract.evm.bytecode.object, arguments: args })
        .send({ gas, from })
    } catch (error) {
      // console.error(`Problem deploying contract`, error);
    }
  }

};

export default Contracts
