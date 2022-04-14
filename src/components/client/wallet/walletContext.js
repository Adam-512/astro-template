import { createContext } from 'preact'

export const WalletContext = createContext();
export const WalletProvider = WalletContext.Provider
export const WalletConsumer = WalletContext.Consumer
