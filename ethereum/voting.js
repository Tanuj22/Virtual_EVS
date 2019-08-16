import web3 from './web3.js';
import Voting from './build/Voting.json';

const instance = new web3.eth.Contract(
    JSON.parse(Voting.interface),
    '0xBA1E6066be04046e32218b8d035093247dea2D0D'
);

export default instance;