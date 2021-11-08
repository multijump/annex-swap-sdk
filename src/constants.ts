import JSBI from 'jsbi'

// exports for external consumption
export type BigintIsh = JSBI | bigint | string

export enum ChainId {
  MAINNET = 56,
  BSCTESTNET = 97,
  CASSINI = 339,
}

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP
}

export const FACTORY_ADDRESS = {
  [ChainId.MAINNET]: '0x6a616606D9f3BaE02d215db5046b7D1030674622',
  [ChainId.BSCTESTNET]: '0xd81014579288221814b5E066AaCF0B4A00739a24',
  [ChainId.CASSINI]: '0x43c369A3Fea13002e11059855Dc57F3Fe9dA81B7',
}

export const INIT_CODE_HASH = {
  [ChainId.MAINNET]: '0x163dd3668bfee3af10fd857a489c4dd9929f2f02440670f54d71ed57c025f4e8',
  [ChainId.BSCTESTNET]: '0x163dd3668bfee3af10fd857a489c4dd9929f2f02440670f54d71ed57c025f4e8',
  [ChainId.CASSINI]: '0x370859e0d12eaf24013515aa62dab3edc3947ceb62f71fecb341cc6a123fceb8',
}

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const _998 = JSBI.BigInt(998)
export const _1000 = JSBI.BigInt(1000)

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256'
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
}
