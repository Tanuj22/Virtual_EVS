import web3 from './web3.js';
import Voting from './build/Voting.json';

const instance = new web3.eth.Contract(
    JSON.parse(Voting.interface),
    '0xb087B019BEA743f25f3d86a0ED1078c1478e9914'
);

export default instance;