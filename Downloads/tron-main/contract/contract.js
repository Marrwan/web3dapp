const Web3 = require('web3');
const web3 = new Web3('https://polygon-rpc.com');

const contractABI = require('./abi.json');
const contractAddress = process.env.WALLET;

const contract = new web3.eth.Contract(contractABI, contractAddress);

module.exports =  contract;