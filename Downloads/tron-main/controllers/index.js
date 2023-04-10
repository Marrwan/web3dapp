// const contract = require('../contract/contract');

const Web3 = require('web3');
const rpcURL = 'https://polygon-rpc.com/';
const web3 = new Web3(rpcURL);

const Wallet = require('ethereumjs-wallet').default;

const contractABI = require('../contract/abi.json');
// const contractAddress = process.env.WALLET;

// console.log({contractAddress})


// generate a new private key
let address = Wallet.generate().getAddressString();
const contract = new web3.eth.Contract(contractABI, address);
const privateKeyBuffer = Wallet.generate().getPrivateKey();

// convert the private key to a string
const privateKey = privateKeyBuffer.toString('hex');


exports.get = (req,res) => {

    console.log("this is grap")
    let grap = {
        name: "Bobo",
        age : 31,
        isMarried : false
    }
    console.log({name: grap.name})
    res.json(grap);
}

exports.register = async(req,res) =>{
    try{
    const {walletAddress} = req.body; 
    // console.log({contract})
//     const accounts = await web3.eth.getAccounts();
//     console.log({accounts});
//     const userExists = await contract.methods.users(walletAddress).call();

//     console.log({userExists});
//     let result  = await contract.methods.register(walletAddress);
//     console.log({result})
//     // contract.withdrawBalance()
// // let r1 = contract.withdraw();
// // console.log({r1});
//     console.log({walletAddress});
    // const contract = new web3.eth.Contract(contractAbi, contractAddress);
    const gasPrice = await web3.eth.getGasPrice();
    const gasEstimate = await contract.methods.register(walletAddress).estimateGas();
    const data = await contract.methods.register(walletAddress).encodeABI();
    const nonce = await web3.eth.getTransactionCount(process.env.WALLET);

    console.log({gasPrice, gasEstimate, nonce, data, privateKey, Wallet, address});
    
    // let privateKey = await web3.eth.getPrivateKey(process.env.WALLET);
    const signedTx = await web3.eth.accounts.signTransaction({
        to: address || process.env.WALLET,
        from: walletAddress,
        data,
        nonce,
        gasPrice,
        gas: gasEstimate
    }, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log({signedTx, receipt});
    res.json({ status: 'success', message: receipt });
}catch(err){
    res.json({status: 'error', message: err.message});
}

}
