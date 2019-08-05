import web3 from './web3.js';
import Voting from './build/Voting.json';

const instance = new web3.eth.Contract(
    JSON.parse(Voting.interface),
    '0x6e64798Dc4fBD08f9A52A26D376eaA0Fe428f7ef'
);

export default instance;