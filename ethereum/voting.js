import web3 from './web3.js';
import Voting from './build/Voting.json';

const instance = new web3.eth.Contract(
    JSON.parse(Voting.interface),
    '0xD91752bdbe5632198Ef9F7d1c3f9A1F983dc50A9'
);

export default instance;