import { default as poolsConfig, PoolCategory } from "../config/constants/pools"

import sousChefBnb from "../config/abi/sousChefBnb.json";
import sousChef from "../config/abi/sousChef.json";
import bep20Abi from "../config/abi/erc20.json";
import sousChefV2 from "../config/abi/sousChefV2.json";
import { getAddress } from "./addressHelpers";
import web3NoAccount from "./web3";
import { DEFAULT_GAS_PRICE, TESTNET_CHAIN_ID } from "../config";
import { getGasPriceInWei, getSettings } from "./settings";


export const getDefaultGasPrice = () => {
    const chainId = process.env.REACT_APP_CHAIN_ID
    if (chainId === TESTNET_CHAIN_ID) {
        return 10
    }
    return DEFAULT_GAS_PRICE
};

const getContract = (abi, address, web3, account) => {
    const _web3 = web3 ?? web3NoAccount
    const gasPrice = account ? getSettings(account).gasPrice : getDefaultGasPrice()

    return new _web3.eth.Contract(abi, address, {
        gasPrice: getGasPriceInWei(gasPrice).toString(),
    })
}

export const getBep20Contract = (address, web3) => {
    return getContract(bep20Abi, address, web3);
}
  

export const getSouschefContract = (id, web3) => {
    const config = poolsConfig.find((pool) => pool.sousId === id)
    const abi = config.poolCategory === PoolCategory.BINANCE ? sousChefBnb : sousChef
    return getContract(abi, getAddress(config.contractAddress), web3)
}

export const getSouschefV2Contract = (id, web3) => {
    const config = poolsConfig.find((pool) => pool.sousId === id)
    return getContract(sousChefV2, getAddress(config.contractAddress), web3)
}