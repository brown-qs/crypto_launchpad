import Metamask from "./icons/Metamask";
import MathWallet from "./icons/MathWallet";
import TokenPocket from "./icons/TokenPocket";
import TrustWallet from "./icons/TrustWallet";
import WalletConnect from "./icons/WalletConnect";
import BinanceChain from "./icons/BinanceChain";
import SafePalWallet from "./icons/SafePalWallet";

export const ConnectorNames = {
    Injected: "injected",
    WalletConnect: "walletconnect",
    BSC: "bsc",
}
  

const connectors = [
  {
    title: "Metamask",
    Icon: Metamask,
    connectorId: ConnectorNames.Injected,
  },
  // {
  //   title: "TrustWallet",
  //   Icon: TrustWallet,
  //   connectorId: ConnectorNames.Injected,
  // },
  // {
  //   title: "MathWallet",
  //   Icon: MathWallet,
  //   connectorId: ConnectorNames.Injected,
  // },
  // {
  //   title: "TokenPocket",
  //   Icon: TokenPocket,
  //   connectorId: ConnectorNames.Injected,
  // },
  {
    title: "WalletConnect",
    Icon: WalletConnect,
    connectorId: ConnectorNames.WalletConnect,
  },
  // {
  //   title: "Binance Chain Wallet",
  //   icon: "BinanceChain",
  //   connectorId: ConnectorNames.BSC,
  // },
  // {
  //   title: "SafePal Wallet",
  //   Icon: SafePalWallet,
  //   connectorId: ConnectorNames.Injected,
  // },
];

export default connectors;

export const connectorLocalStorageKey = "brisepadconnectorId";
