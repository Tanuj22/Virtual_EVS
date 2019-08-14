import web3 from './web3.js';
import Voting from './build/Voting.json';

const instance = new web3.eth.Contract(
    JSON.parse(Voting.interface),
    '0x1Eb1Ca9802ef232e80026D27AB9e4D9B991cc69D'
);

export default instance;