import { useCallback } from 'react';
import { useWeb3React } from "@web3-react/core";
import { useSousChef } from "./useContract";
import { sousEmergencyUnstake, sousUnstake } from '../utils/callHelpers';

export const useSousUnstake = (sousId, enableEmergencyWithdraw = false) => {
    // const dispatch = useAppDispatch();
    const { account } = useWeb3React();
    // const masterChefContract = useMasterchef();
    const sousChefContract = useSousChef(sousId)

    const handleUnstake = useCallback(
        async (amount, decimals) => {
        // if (sousId === 0) {
        //     const txHash = await unstake(masterChefContract, 0, amount, account)
        //     console.info(txHash)
        // } else
        if (enableEmergencyWithdraw) {
            const txHash = await sousEmergencyUnstake(sousChefContract, account)
            console.info(txHash)
        } else {
            const txHash = await sousUnstake(sousChefContract, amount, decimals, account)
            console.info(txHash)
        }
        // dispatch(updateUserStakedBalance(sousId, account));
        // dispatch(updateUserBalance(sousId, account));
        // dispatch(updateUserPendingReward(sousId, account));
        },
        [account, enableEmergencyWithdraw, sousChefContract, sousId],
        // [account, dispatch, enableEmergencyWithdraw, masterChefContract, sousChefContract, sousId],
    )

    return { onUnstake: handleUnstake }
}