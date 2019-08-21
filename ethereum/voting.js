import web3 from './web3.js';
import Voting from './build/Voting.json';

const instance = new web3.eth.Contract(
    JSON.parse(Voting.interface),
    '0xee27B7682Bf26e20A50AE767E14366743AC826b1'
);

export default instance;