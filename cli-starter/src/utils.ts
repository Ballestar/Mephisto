import { readFileSync, writeFileSync } from 'fs'
import { Wallet } from 'ethers'

export const WALLET_FILE_LOCATION = './xmtp_wallet'
export const BIGDADDY_LOCATION = './xmtp_wallet_BIGDADDY'
export const LITTLEBOY_LOCATION = './xmtp_wallet_LITTLEBOY'
export const MEPHISTO_LOCATION = './xmtp_mephisto'
export const ALCHEMY_LOCATION = './xmtp_alchemy_apikey'

export const saveRandomWallet = () => {
  const newWallet = Wallet.createRandom()
  writeFileSync(WALLET_FILE_LOCATION, newWallet.mnemonic.phrase)
}

export const loadWallet = () => {
  try {
    const existing = readFileSync(WALLET_FILE_LOCATION)
    return Wallet.fromMnemonic(existing.toString())
  } catch (e) {
    throw new Error('No wallet file found')
  }
}

export const loadBIGDADDY = () => {
  try {
    const existing = readFileSync(BIGDADDY_LOCATION)
    return Wallet.fromMnemonic(existing.toString())
  } catch (e) {
    throw new Error('No wallet file found')
  }
}

export const loadLITTLEBOY = () => {
  try {
    const existing = readFileSync(LITTLEBOY_LOCATION)
    return Wallet.fromMnemonic(existing.toString())
  } catch (e) {
    throw new Error('No wallet file found')
  }
}

export const loadMephisto = () => {
  return MEPHISTO_LOCATION
}

export const loadApiKey = () => {
  return ALCHEMY_LOCATION
}

const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/

export const truncateEthAddress = (address: string) => {
  const match = address.match(truncateRegex)
  if (!match) return address
  return `${match[1]}…${match[2]}`
}
