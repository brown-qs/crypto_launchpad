import React, { useState, useEffect } from 'react';
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import isEmpty from 'lodash/isEmpty';
import { useSousApprove } from "../../hooks/useApprove";
import { useERC20 } from "../../hooks/useContract";
import { useSousHarvest } from "../../hooks/useHarvest";
import { useSousStake } from "../../hooks/useStake";
import { useSousUnstake } from "../../hooks/useUnstake";
import { getAddress } from "../../utils/addressHelpers";
import useAuth from '../../hooks/useAuth';
import { connectorLocalStorageKey } from '../wallet/config';
import { fetchPoolsAllowance, fetchUserBalances, fetchUserPendingRewards, fetchUserStakeBalances } from '../../state/pools/fetchPoolsUser';
import { Link } from 'react-router-dom';
import './styles/pooldetail.css';
import toast from 'react-hot-toast';
import useWindowDimensions from '../../hooks/useWindowDimensions';


const PoolDetail = ({pool}) => {
    const { active, account } = useWeb3React();
    const { login } = useAuth();
    const { width: windowWidth } = useWindowDimensions();    

    const [stakeAmt, setStakeAmt] = useState('');
    const [unstakeAmt, setUnstakeAmt] = useState('');
    const [userData, setUserData] = useState({});
    // const [openWalletModal, setOpenWalletModal] = useState(false);
    const [approveLoading, setApproveLoading] = useState(false);
    const [stakeLoading, setStakenLoading] = useState(false);
    const [unstakeLoading, setUnstakenLoading] = useState(false);
    const [harvestLoading, setHarvestLoading] = useState(false);
    const [userdataLoading, setUserdataLoading] = useState(false);

    
    // Approve
    const { sousId, stakingToken, earningToken } = pool;
    const stakingTokenContract = useERC20(stakingToken.address ? getAddress(stakingToken.address) : '');
    const { handleApprove, requestedApproval } = useSousApprove(stakingTokenContract, sousId, earningToken.symbol);
    const handleTokenApproval = async() => {
        try {
            setApproveLoading(true);
            await handleApprove();
            setApproveLoading(false);
        } catch (error) {
            setApproveLoading(false);
            (() => toast.error("Not approved"))();
        }
    }
    
    // Stake
    const { onStake } = useSousStake(sousId, false);
    const handleStake = async() => {
        try {
            
            if(Number(stakeAmt) === 0){
                return;
            }
            if(Number(stakeAmt) > Number(userData.stakingTokenBalance)){
                (() => toast.error("Insufficient balance"))();
                return;
            }
            setStakenLoading(true);
            await onStake(stakeAmt.toString(), stakingToken.decimals);
            setStakenLoading(false);
            await loadUserData();
            (() => toast.success("Stake successful"))();
            setStakeAmt('');
        } catch (error) {
            console.log('Stake error: ', error);
            setStakenLoading(false);
            (() => toast.error("Not staked"))();
        }
    }

    // Harvest
    const { onReward } = useSousHarvest(sousId, false);
    const handleHarvest = async() => {
        try {
            setHarvestLoading(true);
            await onReward();
            setHarvestLoading(false);
            await loadUserData();
            (() => toast.success("Harvest successful"))();
        } catch (error) {
            setHarvestLoading(false);
            (() => toast.error("Not harvested"))();
        }
    }

    // Unstake/withdraw
    const { onUnstake } = useSousUnstake(sousId);
    const handleUnstake = async() => {
        try {
            
            if(Number(unstakeAmt) === 0){
                return;
            }
            setUnstakenLoading(true);
            if(Number(unstakeAmt) > Number(userData.stakedBalance)){
                await onUnstake(userData.stakedBalance, stakingToken.decimals)
            }else{
                await onUnstake(unstakeAmt, stakingToken.decimals)
            }
            setUnstakenLoading(false);
            (() => toast.success("Withdrawal successful"))();
            setUnstakeAmt('');
            await loadUserData();
        } catch (error) {
            setUnstakenLoading(false);
            (() => toast.error("Not withdrawn"))();
            
        }

    }

    const handleStakeAmtInput = (e) => {
        if(!isNaN(e.target.value) || e.target.value === '.'){
            setStakeAmt(e.target.value);
        }
    }

    const handleUnstakeAmtInput = (e) => {
        if(!isNaN(e.target.value) || e.target.value === '.'){
            setUnstakeAmt(e.target.value);
        }
    }

    const loadUserData = async() => {
        const stakingTokenBalances = await fetchUserBalances(account);
        const allowances = await fetchPoolsAllowance(account);
        const stakedBalances = await fetchUserStakeBalances(account);
        const pendingRewards = await fetchUserPendingRewards(account);
        const userData = ({
            sousId: pool.sousId,
            allowance: allowances[pool.sousId],
            stakingTokenBalance: stakingTokenBalances[pool.sousId],
            stakedBalance: stakedBalances[pool.sousId],
            pendingReward: pendingRewards[pool.sousId],
        });
        setUserData(userData);
                
    }

    useEffect(() => {
        const connectWalletOnPageLoad = async () => {
            const connectorId = localStorage?.getItem(connectorLocalStorageKey);
            if (connectorId) {
                try {
                login(connectorId);
                // localStorage.setItem('isWalletConnected', true)
                } catch (ex) {
                console.log(ex)
                }
            }
        }
        connectWalletOnPageLoad();
        (
            async () => {
                if(account !== undefined){
                    try {
                        setUserdataLoading(true);
                        // const loadUserData = async() => {
                        //     const stakingTokenBalances = await fetchUserBalances(account);
                        //     const allowances = await fetchPoolsAllowance(account);
                        //     const stakedBalances = await fetchUserStakeBalances(account);
                        //     const pendingRewards = await fetchUserPendingRewards(account);
                        //     const userData = ({
                        //         sousId: pool.sousId,
                        //         allowance: allowances[pool.sousId],
                        //         stakingTokenBalance: stakingTokenBalances[pool.sousId],
                        //         stakedBalance: stakedBalances[pool.sousId],
                        //         pendingReward: pendingRewards[pool.sousId],
                        //     });
                        //     setUserData(userData);
                            
                        // }
                        await loadUserData();
                        setUserdataLoading(false);
                    } catch (error) {
                        console.log(error);
                        // console.log('userDetail userData: ', userData);

                        setUserdataLoading(false);
                    }
                }
                
            }
        )();
    }, [account]);

    useEffect(() => {
        const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
            (
                async () => {
                    if(account !== undefined){
                        try {
                            console.log('Rendered...');
                            await loadUserData();
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    
                }
            )();
        }, 15000)
        
        return () => clearInterval(intervalId); //This is important
    
    }, [])

    return (
        <div className="pooldetail_container">
            {
                windowWidth < 1050 &&
                <Link className="go_back" to="/activepools">Goto pools</Link>
            }
            <div className="pooldetail_content">
            </div>
            {
                (!active || isEmpty(userData))
                &&
                <>
                    <p>Stake {pool.stakingToken.symbol}</p>
                    <p>Earn {pool.earningToken.symbol}</p>
                </>

            }

            {
                active 
                ?
                (
                    <>
                    {
                        // isEmpty(userData)
                        userdataLoading
                        ?
                        // <p className='dataloading'>Loading data...</p>
                        <div className='wave-display'></div>

                        :
                        (
                            isEmpty(userData)
                            ?
                            <div className='wave-display'></div>
                            :
                            <>
                                <div className='userdata'>
                                    {/* <p className='amt_staked'>Amount Staked {`${userData.stakedBalance}`} {`${pool.stakingToken.symbol`} </p> */}
                                    <p>Amount Staked: {userData.stakedBalance !== undefined ? Number(Number(userData.stakedBalance)/(10**pool.stakingToken.decimals)).toFixed(3) : 0} {pool.stakingToken.symbol}</p>
                                    {/* <p className='amt_earned'>Earned {`${userData.pendingReward} ${pool.earningToken.symbol}`} </p> */}
                                    <p className='amt_earned'>Earned: {userData.pendingReward !== undefined ? Number(Number(userData.pendingReward)/(10**pool.earningToken.decimals)).toFixed(3) : 0} {pool.earningToken.symbol} </p>
                                </div>
                                {
                                    Number(userData.pendingReward) > 0 
                                    &&
                                    <div className="actioncard">
                                        <button disabled={harvestLoading} className='harvest_btn' onClick={handleHarvest}>{harvestLoading ? "Loading..." : "Harvest"}</button>
                                    </div>
                                }
                                {
                                    (
                                        Number(userData.allowance) > 0
                                        ?
                                        <div className='stake_pad'>
                                            <input value={stakeAmt} onChange={handleStakeAmtInput}/>
                                            <p>Balance: {Number(Number(userData.stakingTokenBalance)/(10**pool.stakingToken.decimals)).toFixed(3)} {pool.stakingToken.symbol} </p>
                                            <button disabled={stakeLoading} className='stake_btn' onClick={handleStake}>{stakeLoading ? "Loading..." : "Stake"}</button>
                                        </div>
                                        :
                                        <button disabled={requestedApproval} className='approve_btn' onClick={handleTokenApproval}>{approveLoading ? "Loading...": "Approve pool"}</button>
                                    )
                                }

                                {
                                    Number(userData.stakedBalance) > 0
                                    &&
                                    <div className='withdraw_pad'>
                                        <input value={unstakeAmt} onChange={handleUnstakeAmtInput}/>
                                        <button disabled={unstakeLoading} className='withdraw_btn' onClick={handleUnstake}>{unstakeLoading ? "Loading..." : "Withdraw"}</button>
                                    </div>

                                }
                            </>
                        )

                        
                    }
                    </>
                )
                :
                <p className='connect_text'>Connect your wallet</p>
            }
        </div>
    );
}

export default PoolDetail;