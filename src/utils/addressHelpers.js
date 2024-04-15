import { MAINNET_CHAIN_ID } from '../config';
import addresses from '../config/constants/contracts';

export const getAddress = (address) => {
    const chainId = process.env.REACT_APP_CHAIN_ID;
    return address[chainId] ? address[chainId] : address[MAINNET_CHAIN_ID];
}

export const getMulticallAddress = () => {
    return getAddress(addresses.multiCall)
}