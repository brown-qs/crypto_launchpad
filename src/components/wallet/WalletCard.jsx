import React, { useState } from 'react';
import { connectorLocalStorageKey } from './config';

import './styles/walletcard.css';

const WalletCard = ({login, walletConfig, onDismiss }) => {
    const { title, Icon } = walletConfig;

    return (
        <button
            className='wallet_card_wrapper'
            onClick={() => {
                login(walletConfig.connectorId);
                window.localStorage.setItem(connectorLocalStorageKey, walletConfig.connectorId);
                onDismiss();
            }}
        >
            {title}
            <div className='wallet_card_icon'>
                <Icon/>
            </div>

        </button>
    );
};

export default WalletCard;