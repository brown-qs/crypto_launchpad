import BigNumber from 'bignumber.js';
import poolsConfig from '../../config/constants/pools';
import { getAddress } from '../../utils/addressHelpers';
import erc20ABI from '../../config/abi/erc20.json';
import sousChefABI from '../../config/abi/sousChef.json';
import multicall from '../../utils/multicall';


const nonBnbPools = poolsConfig.filter((p) => p.stakingToken.symbol !== 'BRISE')
const nonMasterPools = poolsConfig.filter((p) => p.sousId !== 0);

export const fetchPoolsAllowance = async (account) => {
    const calls = nonBnbPools.map((p) => ({
        address: getAddress(p.stakingToken.address),
        name: 'allowance',
        params: [account, getAddress(p.contractAddress)],
    }))

    const allowances = await multicall(erc20ABI, calls);
    return nonBnbPools.reduce(
        (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(allowances[index]).toJSON() }),
        {},
    )
}


export const fetchUserBalances = async (account) => {
    // Non BNB pools
    const calls = nonBnbPools.map((p) => ({
        address: getAddress(p.stakingToken.address),
        name: 'balanceOf',
        params: [account],
    }))
    const tokenBalancesRaw = await multicall(erc20ABI, calls)
    const tokenBalances = nonBnbPools.reduce(
        (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(tokenBalancesRaw[index]).toJSON() }),
        {},
    )

    // BNB pools
    // const bnbBalance = await web3.eth.getBalance(account)
    // const bnbBalances = bnbPools.reduce(
    //     (acc, pool) => ({ ...acc, [pool.sousId]: new BigNumber(bnbBalance).toJSON() }),
    //     {},
    // )

    // return { ...tokenBalances, ...bnbBalances }
    return { ...tokenBalances }
}


export const fetchUserStakeBalances = async (account) => {
    const calls = nonMasterPools.map((p) => ({
        address: getAddress(p.contractAddress),
        name: 'userInfo',
        params: [account],
    }))
    const userInfo = await multicall(sousChefABI, calls)
    const stakedBalances = nonMasterPools.reduce(
        (acc, pool, index) => ({
        ...acc,
        [pool.sousId]: new BigNumber(userInfo[index].amount._hex).toJSON(),
        }),
        {},
    )

    // BRIS / BRIS pool
    // const { amount: masterPoolAmount } = await masterChefContract.methods.userInfo('0', account).call()

    // return { ...stakedBalances, 0: new BigNumber(masterPoolAmount).toJSON() }
    return { ...stakedBalances };
}

export const fetchUserPendingRewards = async (account) => {
    const calls = nonMasterPools.map((p) => ({
        address: getAddress(p.contractAddress),
        name: 'pendingReward',
        params: [account],
    }))
    const res = await multicall(sousChefABI, calls)
    const pendingRewards = nonMasterPools.reduce(
        (acc, pool, index) => ({
        ...acc,
        [pool.sousId]: new BigNumber(res[index]).toJSON(),
        }),
        {},
    )

    // BRIS / BRIS pool
    // const pendingReward = await masterChefContract.methods.pendingBris('0', account).call()

    // return { ...pendingRewards, 0: new BigNumber(pendingReward).toJSON() }
    return { ...pendingRewards };
}