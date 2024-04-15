import React, { useRef } from 'react';
import connectors from './config';
import WalletCard from './WalletCard';
import './styles/walletmodal.css';
import useOutsideDetector from '../../hooks/useOutsideDetector';


const WalletModal = ({ login, onDismiss = () => null, logout }) => {

    // useOutsideDetector
    const wrapperRef = useRef(null);
    useOutsideDetector(wrapperRef, onDismiss);
    return(
        <div className='wallet_modal_container'>
            {/* <button className='modal_closebtn' onClick={onDismiss}>X</button> */}
            <div ref={wrapperRef} className='wallet_modal_wallets'>
                {
                    connectors.map((entry, index) => (
                        <WalletCard
                            key={entry.title}
                            login={login}
                            walletConfig={entry}
                            onDismiss={onDismiss}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default WalletModal;