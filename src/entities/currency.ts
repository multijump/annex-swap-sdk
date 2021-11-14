import JSBI from 'jsbi'

import { SolidityType, ChainId } from '../constants'
import { validateSolidityTypeInstance } from '../utils'

/**
 * A currency is any fungible financial instrument on Ethereum, including Ether and all ERC20 tokens.
 *
 * The only instance of the base class `Currency` is Ether.
 */
export class Currency {
  public readonly decimals: number
  public readonly symbol?: string
  public readonly name?: string
  public readonly chainId?: number

  /**
   * The only instance of the base class `Currency`.
   */
  public static readonly ETHER: Currency = new Currency(18, 'BNB', 'Binance', 56)
  public static readonly TBNB: Currency = new Currency(18, 'BNB', 'Binance', 97)
  public static readonly TCRO: Currency = new Currency(18, 'TCRO', 'Cassini', 339)
  public static readonly CRO: Currency = new Currency(18, 'CRO', 'Cronos', 25)

  /**
   * Constructs an instance of the base class `Currency`. The only instance of the base class `Currency` is `Currency.ETHER`.
   * @param decimals decimals of the currency
   * @param symbol symbol of the currency
   * @param name of the currency
   */
  protected constructor(decimals: number, symbol?: string, name?: string, chainId?: number) {
    validateSolidityTypeInstance(JSBI.BigInt(decimals), SolidityType.uint8)

    this.decimals = decimals
    this.symbol = symbol
    this.name = name
    this.chainId = chainId
  }
}

const ETHER = Currency.ETHER
const ETHERS = {
  [ChainId.MAINNET]: Currency.ETHER,
  [ChainId.BSCTESTNET]: Currency.TBNB,
  [ChainId.CASSINI]: Currency.TCRO,
  [ChainId.CRONOS]: Currency.CRO,
}
export { ETHER, ETHERS }
