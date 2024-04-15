import React, { useRef, useState } from 'react';
import './styles/accountmodal.css';
import { connectorLocalStorageKey } from './config';
import useOutsideDetector from '../../hooks/useOutsideDetector';
import Copy from './icons/Copy';
import OpenNew from './icons/OpenNew';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import truncateWalletAddress from '../../utils/truncateWalletAddress';
import { BASE_BSC_SCAN_URL } from '../../config';


const AccountModal = ({ account, logout, onDismiss = () => {} }) => {

    const [isTooltipDisplayed, setIsTooltipDisplayed] = useState();
    const { width: windowWidth } = useWindowDimensions();
    const wrapperRef = useRef(null);
    useOutsideDetector(wrapperRef, onDismiss);

    
    const copyToClipboardWithCommand = (content) => {
        const el = document.createElement("textarea");
        el.value = content;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
    };

    function displayTooltip() {
        setIsTooltipDisplayed(true);
        setTimeout(() => {
            setIsTooltipDisplayed(false);
        }, 1000);
    }

    const handleCopy = () => {
        copyToClipboardWithCommand(account);
        displayTooltip();
    }
    // truncateWalletAddress
    return(
        <div className='account_modal_container'>
            <div ref={wrapperRef} className='account_modal_content'>
                <p className='active_account'>{windowWidth < 473 ? truncateWalletAddress(account) : account}</p>
                
                <div className='account_modal_links'>
                    <a target='_blank' rel='noreferrer noopener' className='view_btn' href={`${BASE_BSC_SCAN_URL}/address/${account}`}>
                        Brisescan
                        <OpenNew />
                    </a>
                    <button onClick={handleCopy} className='copy_btn'>
                        Copy
                        <Copy />
                    </button>
                    <button
                        className='logout_btn'
                        onClick={() => {
                            logout();
                            window.localStorage.removeItem(connectorLocalStorageKey);
                            onDismiss();
                        }}
                    >
                        Logout
                    </button>
                </div>
                {
                    isTooltipDisplayed 
                    &&
                    <div className='tooltip'>
                        Copied!
                    </div>
                }
            </div>
        </div>
    );
};

export default AccountModal;