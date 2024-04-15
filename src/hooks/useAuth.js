import { useCallback } from 'react';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { NoBscProviderError } from '@binance-chain/bsc-connector';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector';
import toast from "react-hot-toast";
import { connectorsByName } from '../utils/web3React';
import { connectorLocalStorageKey } from '../components/wallet/config';
import { setupNetwork } from '../utils/wallet';

const useAuth = () => {
  const { activate, deactivate, library } = useWeb3React();

  const login = useCallback(

    (connectorID) => {
        const connector = connectorsByName[connectorID];
        if(connector) {
            activate(connector, async(error) => {
                if(!error){
                  window.initWeb3 = library;
                }
                if (error instanceof UnsupportedChainIdError) {
                    const hasSetup = await setupNetwork();
                    if (hasSetup) {
                        activate(connector);
                    }
                } else {
                    window.localStorage.removeItem(connectorLocalStorageKey)
                    if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
                      (() => toast.error("No provider was found"))();
                        
                      // toastError('Provider Error', 'No provider was found')
                    } else if (
                        error instanceof UserRejectedRequestErrorInjected ||
                        error instanceof UserRejectedRequestErrorWalletConnect
                    ) {
                        if (connector instanceof WalletConnectConnector) {
                          const walletConnector = connector;
                          walletConnector.walletConnectProvider = null
                          }
                          (() => toast.error("Please authorize to access your account"))();
                          
                          // toastError('Authorization Error', 'Please authorize to access your account')
                        
                      } else {
                        (() => toast.error(error.message))();
                        // toastError(error.name, error.message)
                      }
                    }
                  });
                }else {
                  (() => toast.error("The connector config is wrong"))();
                  // toastError('Unable to find connector', 'The connector config is wrong')
                }


    }, [activate]
  );

  const logout = useCallback(() => {
    // dispatch(profileClear())
    deactivate()
    // This localStorage key is set by @web3-react/walletconnect-connector
    if (window.localStorage.getItem('walletconnect')) {
      connectorsByName.walletconnect.close();
      connectorsByName.walletconnect.walletConnectProvider = null;
    }
  }, [deactivate]);

  return { login, logout };

}

export default useAuth;