import web3 from './web3.js';
import Voting from './build/Voting.json';

const instance = new web3.eth.Contract(
    JSON.parse(Voting.interface),
    '0x97F7151D1de196820BAa3Bcd0B5E145733a9f84c'
);

export default instance;