import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && window.web3 !== 'undefined'){
    //We are in the browser and metamask is running.
    web3 = new Web3(window.web3.currentProvider);
} else {
    // We are on the server or the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/a5c338385e544976ab30b55fe1377ee2'
    );
    web3 = new Web3(provider);
}

export default web3;