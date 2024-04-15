import { useCallback } from 'react';
import { useWeb3React } from "@web3-react/core";
import { useSousChef } from "./useContract";
import { sousStake, sousStakeBnb } from '../utils/callHelpers';

export const useSousStake = (sousId, isUsingBnb = false) => {
    // const dispatch = useAppDispatch();
    const { account } = useWeb3React();
    // const masterChefContract = useMasterchef();
    const sousChefContract = useSousChef(sousId);

    const handleStake = useCallback(
        async (amount, decimals) => {
        // if (sousId === 0) {
        //     await stake(masterChefContract, 0, amount, account)
        // } else 
        console.log(typeof amount)
        if (isUsingBnb) {
            await sousStakeBnb(sousChefContract, amount, account)
        } else {
            await sousStake(sousChefContract, amount, decimals, account)
        }
        // dispatch(updateUserStakedBalance(sousId, account));
        // dispatch(updateUserBalance(sousId, account));
        },
        [account, isUsingBnb, sousChefContract, sousId],
        // [account, dispatch, isUsingBnb, masterChefContract, sousChefContract, sousId],
    )

    return { onStake: handleStake }
}
  