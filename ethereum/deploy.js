const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledVoting  = require('./build/Voting.json');
const provider = new HDWalletProvider(
    'gown phrase drill pull acoustic unhappy sting find hub anger they token',
    'https://raghavranjan.blockchain.azure.com:3200/JgxhTVXfJq9IGUNPNc94qrXT'
    //'https://rinkeby.infura.io/v3/a5c338385e544976ab30b55fe1377ee2',
    //'https://tanujagarwal.blockchain.azure.com:3200/kJ6kVRUTqAEs6eM7zWgLa53t'
    
);

const web3 = new Web3(provider);

const deploy = async()=>{
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from accounts' , accounts[0]);

    const result =  await new web3.eth.Contract(JSON.parse(compiledVoting.interface))
        .deploy({data : compiledVoting.bytecode })
        .send({ gas : '5000000', from : accounts[0]});

    console.log('Contract deployed to', result.options.address);
};
deploy();