import { ChainId } from '../constants';
/**
 * A currency is any fungible financial instrument on Ethereum, including Ether and all ERC20 tokens.
 *
 * The only instance of the base class `Currency` is Ether.
 */
export declare class Currency {
    readonly decimals: number;
    readonly symbol?: string;
    readonly name?: string;
    readonly chainId?: number;
    /**
     * The only instance of the base class `Currency`.
     */
    static readonly ETHER: Currency;
    static readonly TBNB: Currency;
    static readonly TCRO: Currency;
    static readonly CRO: Currency;
    static readonly KAVA: Currency;
    /**
     * Constructs an instance of the base class `Currency`. The only instance of the base class `Currency` is `Currency.ETHER`.
     * @param decimals decimals of the currency
     * @param symbol symbol of the currency
     * @param name of the currency
     */
    protected constructor(decimals: number, symbol?: string, name?: string, chainId?: number);
}
declare const ETHER: Currency;
declare const ETHERS: {
    56: Currency;
    97: Currency;
    339: Currency;
    25: Currency;
    2222: Currency;
};
export { ETHER, ETHERS };
