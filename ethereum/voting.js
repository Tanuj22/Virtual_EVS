import web3 from './web3.js';
import Voting from './build/Voting.json';

const instance = new web3.eth.Contract(
    JSON.parse(Voting.interface),
    '0x53ba0442f8F6c2620e92D98166F61eb4EdD5034C'
);

export default instance;