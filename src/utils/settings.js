import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_PRICE } from '../config'
import { getDecimalAmount } from './formatBalance'

export const VERSION = 1.01

export const GAS_SETTINGS = {
    default: DEFAULT_GAS_PRICE,
    fast: 10,
    reallyfast: 15,
}

export const getGasPriceInWei = (amountInGwei) => {
    return getDecimalAmount(new BigNumber(amountInGwei), 9)
}

export const getDefaultSettings = () => ({
gasPrice: GAS_SETTINGS.default,
})

export const getStorageKey = (account) => {
return `brisepad_settings_${account}_${VERSION}`
}

export const getSettings = (account) => {
try {
    const settingsFromLs = localStorage.getItem(getStorageKey(account))
    return settingsFromLs ? JSON.parse(settingsFromLs) : getDefaultSettings()
} catch (error) {
    return getDefaultSettings()
}
}

export const setSettings = (account, newSettings) => {
    localStorage.setItem(getStorageKey(account), JSON.stringify(newSettings))
}

export const setSetting = (account, newSetting) => {
    const currentSettings = getSettings(account)
    setSettings(account, { ...currentSettings, ...newSetting })
}
