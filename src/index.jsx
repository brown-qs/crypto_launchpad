import React from 'react';
import ReactDOM from 'react-dom';
import { Web3ReactProvider } from '@web3-react/core'
import App from './App';
import './index.css';
import { getLibrary } from './utils/web3React';
// import MetamaskProvider from './components/metamaskprovider/MetaMaskProvider';


ReactDOM.render(
    <Web3ReactProvider getLibrary={getLibrary}>
        {/* <MetamaskProvider>
            <App />
        </MetamaskProvider> */}
        <App />

    </Web3ReactProvider>,
    document.getElementById('root')
);
