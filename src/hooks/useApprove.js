import { useWeb3React } from '@web3-react/core';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { approve } from '../utils/callHelpers';
import { useSousChef } from './useContract';

// Approve a Pool
// lpContract = staking token
export const useSousApprove = (lpContract, sousId, earningTokenSymbol) => {
    const [requestedApproval, setRequestedApproval] = useState(false)
    // const { toastSuccess, toastError } = useToast()
    // const { t } = useTranslation()
    // const dispatch = useAppDispatch()
    const { account } = useWeb3React()
    const sousChefContract = useSousChef(sousId)

    const handleApprove = useCallback(async () => {
        try {
        setRequestedApproval(true)
        const tx = await approve(lpContract, sousChefContract, account)
        // dispatch(updateUserAllowance(sousId, account))
        if (tx) {
            // toastSuccess(
            // t('Contract Enabled'),
            // t('You can now stake in the %symbol% pool!', { symbol: earningTokenSymbol }),
            // )
            (() => toast.success("Approval successful"))();

            setRequestedApproval(false);
        } else {
            // user rejected tx or didn't go thru
            // toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
            (() => toast.error("Please try again. Confirm the transaction and make sure you are paying enough gas!"))();
            
            setRequestedApproval(false);
        }
        } catch (e) {
        console.error(e)
        // toastError(t('Error'), e?.message)
        (() => toast.error(e.message))();
        
        }
    }, [account, lpContract, sousChefContract, sousId, earningTokenSymbol])
    // [account, dispatch, lpContract, sousChefContract, sousId, earningTokenSymbol, t, toastError, toastSuccess]

    return { handleApprove, requestedApproval }
}
  