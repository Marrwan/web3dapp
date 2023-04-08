const contract = require('../contract/contract');

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
    const {walletAddress} = req.body; 
    console.log({contract})
    let result  = await contract.methods.NewRegistration(walletAddress)
    console.log({result})
    console.log({walletAddress});
}