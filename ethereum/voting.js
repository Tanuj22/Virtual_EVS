import web3 from './web3.js';
import Voting from './build/Voting.json';

const instance = new web3.eth.Contract(
    JSON.parse(Voting.interface),
    '0xDbEA950e2C634bC775a1c43D325E17666c0d40e0'
);

export default instance;