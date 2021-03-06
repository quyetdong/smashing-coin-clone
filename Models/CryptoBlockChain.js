// Packages
import date from 'date-and-time';

// Import CryptoBlock
import CryptoBlock from './CryptoBlock.js';

// Declarations
const now = new Date();

class CryptoBlockChain {
    constructor() {
        // array of blocks
        this.blockchain = [this.startGenesisBlock()];
        this.difficulty = 4;
    }
    startGenesisBlock() {
        return new CryptoBlock(0, date.format(now, 'YYYY/MM/DD HH:mm:ss'), "Starting Block", "0");
    }

    obtainLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }
    // Prooof of working mechanism
    addNewBlock(newBlock) {
        newBlock.precedingHash = this.obtainLatestBlock().hash;
        //newBlock.hash = newBlock.computeHash();
        newBlock.proofOfWork(this.difficulty);
        this.blockchain.push(newBlock);
    }
    // verify if the hash of every block had been tampered with
    checkChainValidity() {
        for (let i = 1; i < this.blockchain.length; i++) {
            const currentBlock = this.blockchain[i];
            const precedingBlock = this.blockchain[i - 1];

            if (currentBlock.hash !== currentBlock.computeHash()) {
                return false;
            }
            if (currentBlock.precedingHash !== precedingBlock.hash) return false;
        }
        return true;
    }
}
export default CryptoBlockChain;