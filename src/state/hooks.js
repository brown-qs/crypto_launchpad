// import { useEffect, useMemo } from 'react';
// import BigNumber from 'bignumber.js';
// import { useWeb3React } from '@web3-react/core';


// export const useFetchPublicPoolsData = () => {
//     const dispatch = useAppDispatch()
//     const { slowRefresh } = useRefresh()
//     const web3 = getWeb3NoAccount()

//     useEffect(() => {
//         const fetchPoolsPublicData = async () => {
//         const blockNumber = await web3.eth.getBlockNumber()
//         dispatch(fetchPoolsPublicDataAsync(blockNumber))
//         }

//         fetchPoolsPublicData()
//         dispatch(fetchPoolsStakingLimitsAsync())
//     }, [dispatch, slowRefresh, web3])
// }
  
// export const usePools = (account) => {
//     const { fastRefresh } = useRefresh();
//     // const dispatch = useAppDispatch();
//     // useEffect(() => {
//     //     if (account) {
//     //     dispatch(fetchPoolsUserDataAsync(account))
//     //     }
//     // }, [account, dispatch, fastRefresh])

//     const { pools, userDataLoaded } = useSelector((state: State) => ({
//         pools: state.pools.data,
//         userDataLoaded: state.pools.userDataLoaded,
//     }))
//     return { pools: pools.map(transformPool), userDataLoaded }
// }

// export const usePoolFromPid = (sousId: number): Pool => {
//     const pool = useSelector((state: State) => state.pools.data.find((p) => p.sousId === sousId))
//     return transformPool(pool)
// }