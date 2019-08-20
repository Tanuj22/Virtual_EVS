import web3 from './web3.js';
import Voting from './build/Voting.json';

const instance = new web3.eth.Contract(
    JSON.parse(Voting.interface),
    '0x9C824bAE1A26f31eC684401Bc0583B3312a34Edf'
);

export default instance;