import { useMemo } from 'react';
import { getBep20Contract, getSouschefContract } from '../utils/contractHelpers';
import useWeb3 from "./useWeb3"

export const useSousChef = (id) => {
    const web3 = useWeb3()
    return useMemo(() => getSouschefContract(id, web3), [id, web3])
}

export const useERC20 = (address) => {
    const web3 = useWeb3()
    return useMemo(() => getBep20Contract(address, web3), [address, web3])
}