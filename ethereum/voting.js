import web3 from './web3.js';
import Voting from './build/Voting.json';

const instance = new web3.eth.Contract(
    JSON.parse(Voting.interface),
    '0x4cF97ae8833F9371886C001848dFa0b40C0e3efe'
);

export default instance;