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


const InactivePoolDetail = ({pool}) => {
    const { active, account } = useWeb3React();
    const { login } = useAuth();
    const { width: windowWidth } = useWindowDimensions();    

    const [stakeAmt, setStakeAmt] = useState('');
    const [unstakeAmt, setUnstakeAmt] = useState('');
    const [userData, setUserData] = useState({});
    // const [approveLoading, setApproveLoading] = useState(false);
    const [stakeLoading, setStakenLoading] = useState(false);
    const [emmergencyUnstakeLoading, setEmmergencyUnstakenLoading] = useState(false);
    const [harvestLoading, setHarvestLoading] = useState(false);
    const [userdataLoading, setUserdataLoading] = useState(false);

    
    const { sousId, stakingToken, earningToken } = pool;

    // Approve
    // const stakingTokenContract = useERC20(stakingToken.address ? getAddress(stakingToken.address) : '');
    // const { handleApprove, requestedApproval } = useSousApprove(stakingTokenContract, sousId, earningToken.symbol);
    // const handleTokenApproval = async() => {
    //     try {
    //         setApproveLoading(true);
    //         await handleApprove();
    //         setApproveLoading(false);
    //     } catch (error) {
    //         setApproveLoading(false);
    //         (() => toast.error("Not approved"))();
    //     }
    // }
    
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
            setEmmergencyUnstakenLoading(true);
            await onUnstake(Number(Number(userData.stakedBalance)/(10**pool.stakingToken.decimals)).toFixed(), stakingToken.decimals)
            setEmmergencyUnstakenLoading(false);
            await loadUserData();
            (() => toast.success("Withdrawal successful"))();
        } catch (error) {
            console.log(error);
            setEmmergencyUnstakenLoading(false);
            (() => toast.error("Not withdrawn"))();
            
        }

    }

    // Emergency Unstake/withdraw
    const { onUnstake: onEmmergencyUnstake } = useSousUnstake(sousId, true);
    const handleEmmergencyUnstake = async() => {
        try {
            setEmmergencyUnstakenLoading(true);
            await onEmmergencyUnstake(Number(Number(userData.stakedBalance)/(10**pool.stakingToken.decimals)).toFixed(), stakingToken.decimals)
            setEmmergencyUnstakenLoading(false);
            await loadUserData();
            (() => toast.success("Withdrawal successful"))();
        } catch (error) {
            console.log(error);
            setEmmergencyUnstakenLoading(false);
            (() => toast.error("Not withdrawn"))();
            
        }

    }

    const handleStakeAmtInput = (e) => {
        if(!isNaN(e.target.value) || e.target.value === '.'){
            setStakeAmt(e.target.value);
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
                        
                        await loadUserData(account);
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

    

    const headerStyle = {
        marginTop: '10px'
    };
    return (
        <div className="pooldetail_container">
            {
                windowWidth < 1050 &&
                <Link className="go_back" to="/inactivepools">Goto Finished pools</Link>
            }
            <h4 style={headerStyle}>Finished Pool</h4>
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
                                    <p>Amount Staked: {userData.stakedBalance !== undefined ? Number(Number(userData.stakedBalance)/(10**pool.stakingToken.decimals)).toFixed(3) : 0} {pool.stakingToken.symbol}</p>
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
                                    Number(userData.stakedBalance) > 0
                                    &&
                                    <div className='withdraw_pad'>
                                        <button disabled={emmergencyUnstakeLoading} className='withdraw_btn' onClick={sousId === 3 ? handleUnstake : handleEmmergencyUnstake}>{emmergencyUnstakeLoading ? "Loading..." : "Withdraw"}</button>
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

export default InactivePoolDetail;