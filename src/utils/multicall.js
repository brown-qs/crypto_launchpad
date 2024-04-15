
import { getWeb3NoAccount } from './web3';
import { Interface } from '@ethersproject/abi';
import MultiCallAbi from '../config/abi/Multicall.json';
import { getMulticallAddress } from './addressHelpers';


const multicall = async (abi, calls, options = {}) => {
    try {
        // const web3 = options.web3 || getWeb3NoAccount();
        
        const web3 = options.web3 || window.initWeb3;
        if(web3 === undefined){
            return;
        }
        const multi = new web3.eth.Contract(MultiCallAbi, getMulticallAddress())
        const itf = new Interface(abi)

        const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
        // console.log('multi address: ', getMulticallAddress())
        // console.log('calldata: ', calldata)
        const { returnData } = await multi.methods.aggregate(calldata).call(undefined, options.blockNumber)
        const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call))
        return res
    } catch (error) {
        console.error(error);
        throw new Error(error);
        // throw new Error("Error");
        
    }
}

export default multicall;