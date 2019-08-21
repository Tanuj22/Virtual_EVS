import web3 from './web3.js';
import Voting from './build/Voting.json';

const instance = new web3.eth.Contract(
    JSON.parse(Voting.interface),
    '0xb3285F3AF989A35440b27740c62CDAa3Cf368fB7'
);

export default instance;