import Web3 from 'web3';
import { ARCHIVED_NODE } from '../config/constants/endpoints';
import getRpcUrl from '../utils/getRpcUrl';

const RPC_URL = getRpcUrl()


const httpProvider = new Web3.providers.HttpProvider(RPC_URL, {
    headers:[
        {
            name: 'Access-Control-Allow-Origin',
            value: '*'
        }
    ],
    timeout: 10000 
});

const web3NoAccount = new Web3(httpProvider)

const getWeb3NoAccount = () => {
    return web3NoAccount
};

const getWeb3WithArchivedNodeProvider = () => {
    const archivedHttpProvider = new Web3.providers.HttpProvider(ARCHIVED_NODE, { timeout: 10000 })
    return new Web3(archivedHttpProvider)
}

export { getWeb3NoAccount, getWeb3WithArchivedNodeProvider }
export default web3NoAccount