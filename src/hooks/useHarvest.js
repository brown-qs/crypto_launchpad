import { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useSousChef } from './useContract';
import { soushHarvest, soushHarvestBnb } from '../utils/callHelpers';


export const useSousHarvest = (sousId, isUsingBnb = false) => {
    // const dispatch = useAppDispatch();
    const { account } = useWeb3React();
    const sousChefContract = useSousChef(sousId);
    // const masterChefContract = useMasterchef();

    const handleHarvest = useCallback(async () => {
        // if (sousId === 0) {
        // await harvest(masterChefContract, 0, account)
        // } else 
        if (isUsingBnb) {
        await soushHarvestBnb(sousChefContract, account);
        } else {
        await soushHarvest(sousChefContract, account);
        }
        // dispatch(updateUserPendingReward(sousId, account));
        // dispatch(updateUserBalance(sousId, account));
    }, [account, isUsingBnb, sousChefContract, sousId])
    // [account, dispatch, isUsingBnb, masterChefContract, sousChefContract, sousId]

    return { onReward: handleHarvest }
}
  