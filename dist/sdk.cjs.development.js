'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var JSBI = _interopDefault(require('jsbi'));
var invariant = _interopDefault(require('tiny-invariant'));
var warning = _interopDefault(require('tiny-warning'));
var address = require('@ethersproject/address');
var _Big = _interopDefault(require('big.js'));
var toFormat = _interopDefault(require('toformat'));
var _Decimal = _interopDefault(require('decimal.js-light'));
var solidity = require('@ethersproject/solidity');
var contracts = require('@ethersproject/contracts');
var networks$1 = require('@ethersproject/networks');
var providers = require('@ethersproject/providers');

var _FACTORY_ADDRESS, _INIT_CODE_HASH, _SOLIDITY_TYPE_MAXIMA;

(function (ChainId) {
  ChainId[ChainId["MAINNET"] = 56] = "MAINNET";
  ChainId[ChainId["BSCTESTNET"] = 97] = "BSCTESTNET";
  ChainId[ChainId["CASSINI"] = 339] = "CASSINI";
})(exports.ChainId || (exports.ChainId = {}));

(function (TradeType) {
  TradeType[TradeType["EXACT_INPUT"] = 0] = "EXACT_INPUT";
  TradeType[TradeType["EXACT_OUTPUT"] = 1] = "EXACT_OUTPUT";
})(exports.TradeType || (exports.TradeType = {}));

(function (Rounding) {
  Rounding[Rounding["ROUND_DOWN"] = 0] = "ROUND_DOWN";
  Rounding[Rounding["ROUND_HALF_UP"] = 1] = "ROUND_HALF_UP";
  Rounding[Rounding["ROUND_UP"] = 2] = "ROUND_UP";
})(exports.Rounding || (exports.Rounding = {}));

var FACTORY_ADDRESS = (_FACTORY_ADDRESS = {}, _FACTORY_ADDRESS[exports.ChainId.MAINNET] = '0x6a616606D9f3BaE02d215db5046b7D1030674622', _FACTORY_ADDRESS[exports.ChainId.BSCTESTNET] = '0xd81014579288221814b5E066AaCF0B4A00739a24', _FACTORY_ADDRESS[exports.ChainId.CASSINI] = '0x43c369A3Fea13002e11059855Dc57F3Fe9dA81B7', _FACTORY_ADDRESS);
var INIT_CODE_HASH = (_INIT_CODE_HASH = {}, _INIT_CODE_HASH[exports.ChainId.MAINNET] = '0x163dd3668bfee3af10fd857a489c4dd9929f2f02440670f54d71ed57c025f4e8', _INIT_CODE_HASH[exports.ChainId.BSCTESTNET] = '0x163dd3668bfee3af10fd857a489c4dd9929f2f02440670f54d71ed57c025f4e8', _INIT_CODE_HASH[exports.ChainId.CASSINI] = '0x370859e0d12eaf24013515aa62dab3edc3947ceb62f71fecb341cc6a123fceb8', _INIT_CODE_HASH);
var MINIMUM_LIQUIDITY = /*#__PURE__*/JSBI.BigInt(1000); // exports for internal consumption

var ZERO = /*#__PURE__*/JSBI.BigInt(0);
var ONE = /*#__PURE__*/JSBI.BigInt(1);
var TWO = /*#__PURE__*/JSBI.BigInt(2);
var THREE = /*#__PURE__*/JSBI.BigInt(3);
var FIVE = /*#__PURE__*/JSBI.BigInt(5);
var TEN = /*#__PURE__*/JSBI.BigInt(10);
var _100 = /*#__PURE__*/JSBI.BigInt(100);
var _998 = /*#__PURE__*/JSBI.BigInt(998);
var _1000 = /*#__PURE__*/JSBI.BigInt(1000);
var SolidityType;

(function (SolidityType) {
  SolidityType["uint8"] = "uint8";
  SolidityType["uint256"] = "uint256";
})(SolidityType || (SolidityType = {}));

var SOLIDITY_TYPE_MAXIMA = (_SOLIDITY_TYPE_MAXIMA = {}, _SOLIDITY_TYPE_MAXIMA[SolidityType.uint8] = /*#__PURE__*/JSBI.BigInt('0xff'), _SOLIDITY_TYPE_MAXIMA[SolidityType.uint256] = /*#__PURE__*/JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'), _SOLIDITY_TYPE_MAXIMA);

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// see https://stackoverflow.com/a/41102306
var CAN_SET_PROTOTYPE = ('setPrototypeOf' in Object);
/**
 * Indicates that the pair has insufficient reserves for a desired output amount. I.e. the amount of output cannot be
 * obtained by sending any amount of input.
 */

var InsufficientReservesError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(InsufficientReservesError, _Error);

  function InsufficientReservesError() {
    var _this;

    _this = _Error.call(this) || this;
    _this.isInsufficientReservesError = true;
    _this.name = _this.constructor.name;
    if (CAN_SET_PROTOTYPE) Object.setPrototypeOf(_assertThisInitialized(_this), (this instanceof InsufficientReservesError ? this.constructor : void 0).prototype);
    return _this;
  }

  return InsufficientReservesError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Indicates that the input amount is too small to produce any amount of output. I.e. the amount of input sent is less
 * than the price of a single unit of output after fees.
 */

var InsufficientInputAmountError = /*#__PURE__*/function (_Error2) {
  _inheritsLoose(InsufficientInputAmountError, _Error2);

  function InsufficientInputAmountError() {
    var _this2;

    _this2 = _Error2.call(this) || this;
    _this2.isInsufficientInputAmountError = true;
    _this2.name = _this2.constructor.name;
    if (CAN_SET_PROTOTYPE) Object.setPrototypeOf(_assertThisInitialized(_this2), (this instanceof InsufficientInputAmountError ? this.constructor : void 0).prototype);
    return _this2;
  }

  return InsufficientInputAmountError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

function validateSolidityTypeInstance(value, solidityType) {
  !JSBI.greaterThanOrEqual(value, ZERO) ?  invariant(false, value + " is not a " + solidityType + ".")  : void 0;
  !JSBI.lessThanOrEqual(value, SOLIDITY_TYPE_MAXIMA[solidityType]) ?  invariant(false, value + " is not a " + solidityType + ".")  : void 0;
} // warns if addresses are not checksummed

function validateAndParseAddress(address$1) {
  try {
    var checksummedAddress = address.getAddress(address$1);
    "development" !== "production" ? warning(address$1 === checksummedAddress, address$1 + " is not checksummed.") : void 0;
    return checksummedAddress;
  } catch (error) {
      invariant(false, address$1 + " is not a valid address.")  ;
  }
}
function parseBigintIsh(bigintIsh) {
  return bigintIsh instanceof JSBI ? bigintIsh : typeof bigintIsh === 'bigint' ? JSBI.BigInt(bigintIsh.toString()) : JSBI.BigInt(bigintIsh);
} // mock the on-chain sqrt function

function sqrt(y) {
  validateSolidityTypeInstance(y, SolidityType.uint256);
  var z = ZERO;
  var x;

  if (JSBI.greaterThan(y, THREE)) {
    z = y;
    x = JSBI.add(JSBI.divide(y, TWO), ONE);

    while (JSBI.lessThan(x, z)) {
      z = x;
      x = JSBI.divide(JSBI.add(JSBI.divide(y, x), x), TWO);
    }
  } else if (JSBI.notEqual(y, ZERO)) {
    z = ONE;
  }

  return z;
} // given an array of items sorted by `comparator`, insert an item into its sort index and constrain the size to
// `maxSize` by removing the last item

function sortedInsert(items, add, maxSize, comparator) {
  !(maxSize > 0) ?  invariant(false, 'MAX_SIZE_ZERO')  : void 0; // this is an invariant because the interface cannot return multiple removed items if items.length exceeds maxSize

  !(items.length <= maxSize) ?  invariant(false, 'ITEMS_SIZE')  : void 0; // short circuit first item add

  if (items.length === 0) {
    items.push(add);
    return null;
  } else {
    var isFull = items.length === maxSize; // short circuit if full and the additional item does not come before the last item

    if (isFull && comparator(items[items.length - 1], add) <= 0) {
      return add;
    }

    var lo = 0,
        hi = items.length;

    while (lo < hi) {
      var mid = lo + hi >>> 1;

      if (comparator(items[mid], add) <= 0) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }

    items.splice(lo, 0, add);
    return isFull ? items.pop() : null;
  }
}

var _ETHERS;
/**
 * A currency is any fungible financial instrument on Ethereum, including Ether and all ERC20 tokens.
 *
 * The only instance of the base class `Currency` is Ether.
 */

var Currency =
/**
 * Constructs an instance of the base class `Currency`. The only instance of the base class `Currency` is `Currency.ETHER`.
 * @param decimals decimals of the currency
 * @param symbol symbol of the currency
 * @param name of the currency
 */
function Currency(decimals, symbol, name) {
  validateSolidityTypeInstance(JSBI.BigInt(decimals), SolidityType.uint8);
  this.decimals = decimals;
  this.symbol = symbol;
  this.name = name;
};
/**
 * The only instance of the base class `Currency`.
 */

Currency.ETHER = /*#__PURE__*/new Currency(18, 'BNB', 'Binance');
Currency.TCRO = /*#__PURE__*/new Currency(18, 'TCRO', 'Cassini');
Currency.CRO = /*#__PURE__*/new Currency(18, 'CRO', 'Cronos');
var ETHER = Currency.ETHER;
var ETHERS = (_ETHERS = {}, _ETHERS[exports.ChainId.MAINNET] = Currency.ETHER, _ETHERS[exports.ChainId.BSCTESTNET] = Currency.ETHER, _ETHERS[exports.ChainId.CASSINI] = Currency.TCRO, _ETHERS);

var _WETH;
/**
 * Represents an ERC20 token with a unique address and some metadata.
 */

var Token = /*#__PURE__*/function (_Currency) {
  _inheritsLoose(Token, _Currency);

  function Token(chainId, address, decimals, symbol, name) {
    var _this;

    _this = _Currency.call(this, decimals, symbol, name) || this;
    _this.chainId = chainId;
    _this.address = validateAndParseAddress(address);
    return _this;
  }
  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */


  var _proto = Token.prototype;

  _proto.equals = function equals(other) {
    // short circuit on reference equality
    if (this === other) {
      return true;
    }

    return this.chainId === other.chainId && this.address === other.address;
  }
  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  ;

  _proto.sortsBefore = function sortsBefore(other) {
    !(this.chainId === other.chainId) ?  invariant(false, 'CHAIN_IDS')  : void 0;
    !(this.address !== other.address) ?  invariant(false, 'ADDRESSES')  : void 0;
    return this.address.toLowerCase() < other.address.toLowerCase();
  };

  return Token;
}(Currency);
/**
 * Compares two currencies for equality
 */

function currencyEquals(currencyA, currencyB) {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB);
  } else if (currencyA instanceof Token) {
    return false;
  } else if (currencyB instanceof Token) {
    return false;
  } else {
    return currencyA === currencyB;
  }
}
var WETH = (_WETH = {}, _WETH[exports.ChainId.MAINNET] = /*#__PURE__*/new Token(exports.ChainId.MAINNET, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18, 'WBNB', 'Wrapped BNB'), _WETH[exports.ChainId.BSCTESTNET] = /*#__PURE__*/new Token(exports.ChainId.BSCTESTNET, '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd', 18, 'WBNB', 'Wrapped BNB'), _WETH[exports.ChainId.CASSINI] = /*#__PURE__*/new Token(exports.ChainId.CASSINI, '0x7b99bD319036FAF92C02478f973bAadEdea7a1Aa', 18, 'WCRO', 'Wrapped CRO'), _WETH);

var _toSignificantRoundin, _toFixedRounding;
var Decimal = /*#__PURE__*/toFormat(_Decimal);
var Big = /*#__PURE__*/toFormat(_Big);
var toSignificantRounding = (_toSignificantRoundin = {}, _toSignificantRoundin[exports.Rounding.ROUND_DOWN] = Decimal.ROUND_DOWN, _toSignificantRoundin[exports.Rounding.ROUND_HALF_UP] = Decimal.ROUND_HALF_UP, _toSignificantRoundin[exports.Rounding.ROUND_UP] = Decimal.ROUND_UP, _toSignificantRoundin);
var toFixedRounding = (_toFixedRounding = {}, _toFixedRounding[exports.Rounding.ROUND_DOWN] = 0, _toFixedRounding[exports.Rounding.ROUND_HALF_UP] = 1, _toFixedRounding[exports.Rounding.ROUND_UP] = 3, _toFixedRounding);
var Fraction = /*#__PURE__*/function () {
  function Fraction(numerator, denominator) {
    if (denominator === void 0) {
      denominator = ONE;
    }

    this.numerator = parseBigintIsh(numerator);
    this.denominator = parseBigintIsh(denominator);
  } // performs floor division


  var _proto = Fraction.prototype;

  _proto.invert = function invert() {
    return new Fraction(this.denominator, this.numerator);
  };

  _proto.add = function add(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));

    if (JSBI.equal(this.denominator, otherParsed.denominator)) {
      return new Fraction(JSBI.add(this.numerator, otherParsed.numerator), this.denominator);
    }

    return new Fraction(JSBI.add(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator)), JSBI.multiply(this.denominator, otherParsed.denominator));
  };

  _proto.subtract = function subtract(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));

    if (JSBI.equal(this.denominator, otherParsed.denominator)) {
      return new Fraction(JSBI.subtract(this.numerator, otherParsed.numerator), this.denominator);
    }

    return new Fraction(JSBI.subtract(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator)), JSBI.multiply(this.denominator, otherParsed.denominator));
  };

  _proto.lessThan = function lessThan(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return JSBI.lessThan(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };

  _proto.equalTo = function equalTo(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return JSBI.equal(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };

  _proto.greaterThan = function greaterThan(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return JSBI.greaterThan(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };

  _proto.multiply = function multiply(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return new Fraction(JSBI.multiply(this.numerator, otherParsed.numerator), JSBI.multiply(this.denominator, otherParsed.denominator));
  };

  _proto.divide = function divide(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return new Fraction(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(this.denominator, otherParsed.numerator));
  };

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (format === void 0) {
      format = {
        groupSeparator: ''
      };
    }

    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_HALF_UP;
    }

    !Number.isInteger(significantDigits) ?  invariant(false, significantDigits + " is not an integer.")  : void 0;
    !(significantDigits > 0) ?  invariant(false, significantDigits + " is not positive.")  : void 0;
    Decimal.set({
      precision: significantDigits + 1,
      rounding: toSignificantRounding[rounding]
    });
    var quotient = new Decimal(this.numerator.toString()).div(this.denominator.toString()).toSignificantDigits(significantDigits);
    return quotient.toFormat(quotient.decimalPlaces(), format);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (format === void 0) {
      format = {
        groupSeparator: ''
      };
    }

    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_HALF_UP;
    }

    !Number.isInteger(decimalPlaces) ?  invariant(false, decimalPlaces + " is not an integer.")  : void 0;
    !(decimalPlaces >= 0) ?  invariant(false, decimalPlaces + " is negative.")  : void 0;
    Big.DP = decimalPlaces;
    Big.RM = toFixedRounding[rounding];
    return new Big(this.numerator.toString()).div(this.denominator.toString()).toFormat(decimalPlaces, format);
  };

  _createClass(Fraction, [{
    key: "quotient",
    get: function get() {
      return JSBI.divide(this.numerator, this.denominator);
    } // remainder after floor division

  }, {
    key: "remainder",
    get: function get() {
      return new Fraction(JSBI.remainder(this.numerator, this.denominator), this.denominator);
    }
  }]);

  return Fraction;
}();

var Big$1 = /*#__PURE__*/toFormat(_Big);
var CurrencyAmount = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(CurrencyAmount, _Fraction);

  // amount _must_ be raw, i.e. in the native representation
  function CurrencyAmount(currency, amount) {
    var _this;

    var parsedAmount = parseBigintIsh(amount);
    validateSolidityTypeInstance(parsedAmount, SolidityType.uint256);
    _this = _Fraction.call(this, parsedAmount, JSBI.exponentiate(TEN, JSBI.BigInt(currency.decimals))) || this;
    _this.currency = currency;
    return _this;
  }
  /**
   * Helper that calls the constructor with the ETHER currency
   * @param amount ether amount in wei
   */


  CurrencyAmount.ether = function ether(amount, chainId) {
    if (chainId === void 0) {
      chainId = exports.ChainId.MAINNET;
    }

    return new CurrencyAmount(ETHERS[chainId], amount);
  };

  var _proto = CurrencyAmount.prototype;

  _proto.add = function add(other) {
    !currencyEquals(this.currency, other.currency) ?  invariant(false, 'TOKEN')  : void 0;
    return new CurrencyAmount(this.currency, JSBI.add(this.raw, other.raw));
  };

  _proto.subtract = function subtract(other) {
    !currencyEquals(this.currency, other.currency) ?  invariant(false, 'TOKEN')  : void 0;
    return new CurrencyAmount(this.currency, JSBI.subtract(this.raw, other.raw));
  };

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 6;
    }

    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_DOWN;
    }

    return _Fraction.prototype.toSignificant.call(this, significantDigits, format, rounding);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = this.currency.decimals;
    }

    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_DOWN;
    }

    !(decimalPlaces <= this.currency.decimals) ?  invariant(false, 'DECIMALS')  : void 0;
    return _Fraction.prototype.toFixed.call(this, decimalPlaces, format, rounding);
  };

  _proto.toExact = function toExact(format) {
    if (format === void 0) {
      format = {
        groupSeparator: ''
      };
    }

    Big$1.DP = this.currency.decimals;
    return new Big$1(this.numerator.toString()).div(this.denominator.toString()).toFormat(format);
  };

  _createClass(CurrencyAmount, [{
    key: "raw",
    get: function get() {
      return this.numerator;
    }
  }]);

  return CurrencyAmount;
}(Fraction);

var TokenAmount = /*#__PURE__*/function (_CurrencyAmount) {
  _inheritsLoose(TokenAmount, _CurrencyAmount);

  // amount _must_ be raw, i.e. in the native representation
  function TokenAmount(token, amount) {
    var _this;

    _this = _CurrencyAmount.call(this, token, amount) || this;
    _this.token = token;
    return _this;
  }

  var _proto = TokenAmount.prototype;

  _proto.add = function add(other) {
    !this.token.equals(other.token) ?  invariant(false, 'TOKEN')  : void 0;
    return new TokenAmount(this.token, JSBI.add(this.raw, other.raw));
  };

  _proto.subtract = function subtract(other) {
    !this.token.equals(other.token) ?  invariant(false, 'TOKEN')  : void 0;
    return new TokenAmount(this.token, JSBI.subtract(this.raw, other.raw));
  };

  return TokenAmount;
}(CurrencyAmount);

var Price = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(Price, _Fraction);

  // denominator and numerator _must_ be raw, i.e. in the native representation
  function Price(baseCurrency, quoteCurrency, denominator, numerator) {
    var _this;

    _this = _Fraction.call(this, numerator, denominator) || this;
    _this.baseCurrency = baseCurrency;
    _this.quoteCurrency = quoteCurrency;
    _this.scalar = new Fraction(JSBI.exponentiate(TEN, JSBI.BigInt(baseCurrency.decimals)), JSBI.exponentiate(TEN, JSBI.BigInt(quoteCurrency.decimals)));
    return _this;
  }

  Price.fromRoute = function fromRoute(route) {
    var prices = [];

    for (var _iterator = _createForOfIteratorHelperLoose(route.pairs.entries()), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
          i = _step$value[0],
          pair = _step$value[1];
      prices.push(route.path[i].equals(pair.token0) ? new Price(pair.reserve0.currency, pair.reserve1.currency, pair.reserve0.raw, pair.reserve1.raw) : new Price(pair.reserve1.currency, pair.reserve0.currency, pair.reserve1.raw, pair.reserve0.raw));
    }

    return prices.slice(1).reduce(function (accumulator, currentValue) {
      return accumulator.multiply(currentValue);
    }, prices[0]);
  };

  var _proto = Price.prototype;

  _proto.invert = function invert() {
    return new Price(this.quoteCurrency, this.baseCurrency, this.numerator, this.denominator);
  };

  _proto.multiply = function multiply(other) {
    !currencyEquals(this.quoteCurrency, other.baseCurrency) ?  invariant(false, 'TOKEN')  : void 0;

    var fraction = _Fraction.prototype.multiply.call(this, other);

    return new Price(this.baseCurrency, other.quoteCurrency, fraction.denominator, fraction.numerator);
  } // performs floor division on overflow
  ;

  _proto.quote = function quote(currencyAmount, chainId) {
    if (chainId === void 0) {
      chainId = exports.ChainId.MAINNET;
    }

    !currencyEquals(currencyAmount.currency, this.baseCurrency) ?  invariant(false, 'TOKEN')  : void 0;

    if (this.quoteCurrency instanceof Token) {
      return new TokenAmount(this.quoteCurrency, _Fraction.prototype.multiply.call(this, currencyAmount.raw).quotient);
    }

    return CurrencyAmount.ether(_Fraction.prototype.multiply.call(this, currencyAmount.raw).quotient, chainId);
  };

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 6;
    }

    return this.adjusted.toSignificant(significantDigits, format, rounding);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = 4;
    }

    return this.adjusted.toFixed(decimalPlaces, format, rounding);
  };

  _createClass(Price, [{
    key: "raw",
    get: function get() {
      return new Fraction(this.numerator, this.denominator);
    }
  }, {
    key: "adjusted",
    get: function get() {
      return _Fraction.prototype.multiply.call(this, this.scalar);
    }
  }]);

  return Price;
}(Fraction);

var PAIR_ADDRESS_CACHE = {};
var Pair = /*#__PURE__*/function () {
  function Pair(tokenAmountA, tokenAmountB) {
    var tokenAmounts = tokenAmountA.token.sortsBefore(tokenAmountB.token) // does safety checks
    ? [tokenAmountA, tokenAmountB] : [tokenAmountB, tokenAmountA];
    this.liquidityToken = new Token(tokenAmounts[0].token.chainId, Pair.getAddress(tokenAmounts[0].token, tokenAmounts[1].token), 18, 'ANN-LP', 'Annex LP');
    this.tokenAmounts = tokenAmounts;
  }

  Pair.getAddress = function getAddress(tokenA, tokenB) {
    var _PAIR_ADDRESS_CACHE, _PAIR_ADDRESS_CACHE$t;

    var tokens = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]; // does safety checks

    if (((_PAIR_ADDRESS_CACHE = PAIR_ADDRESS_CACHE) === null || _PAIR_ADDRESS_CACHE === void 0 ? void 0 : (_PAIR_ADDRESS_CACHE$t = _PAIR_ADDRESS_CACHE[tokens[0].address]) === null || _PAIR_ADDRESS_CACHE$t === void 0 ? void 0 : _PAIR_ADDRESS_CACHE$t[tokens[1].address]) === undefined) {
      var _PAIR_ADDRESS_CACHE2, _extends2, _extends3;

      PAIR_ADDRESS_CACHE = _extends({}, PAIR_ADDRESS_CACHE, (_extends3 = {}, _extends3[tokens[0].address] = _extends({}, (_PAIR_ADDRESS_CACHE2 = PAIR_ADDRESS_CACHE) === null || _PAIR_ADDRESS_CACHE2 === void 0 ? void 0 : _PAIR_ADDRESS_CACHE2[tokens[0].address], (_extends2 = {}, _extends2[tokens[1].address] = address.getCreate2Address(FACTORY_ADDRESS[tokens[0].chainId], solidity.keccak256(['bytes'], [solidity.pack(['address', 'address'], [tokens[0].address, tokens[1].address])]), INIT_CODE_HASH[tokens[0].chainId]), _extends2)), _extends3));
    }

    return PAIR_ADDRESS_CACHE[tokens[0].address][tokens[1].address];
  }
  /**
   * Returns true if the token is either token0 or token1
   * @param token to check
   */
  ;

  var _proto = Pair.prototype;

  _proto.involvesToken = function involvesToken(token) {
    return token.equals(this.token0) || token.equals(this.token1);
  }
  /**
   * Returns the current mid price of the pair in terms of token0, i.e. the ratio of reserve1 to reserve0
   */
  ;

  /**
   * Return the price of the given token in terms of the other token in the pair.
   * @param token token to return price of
   */
  _proto.priceOf = function priceOf(token) {
    !this.involvesToken(token) ?  invariant(false, 'TOKEN')  : void 0;
    return token.equals(this.token0) ? this.token0Price : this.token1Price;
  }
  /**
   * Returns the chain ID of the tokens in the pair.
   */
  ;

  _proto.reserveOf = function reserveOf(token) {
    !this.involvesToken(token) ?  invariant(false, 'TOKEN')  : void 0;
    return token.equals(this.token0) ? this.reserve0 : this.reserve1;
  };

  _proto.getOutputAmount = function getOutputAmount(inputAmount) {
    !this.involvesToken(inputAmount.token) ?  invariant(false, 'TOKEN')  : void 0;

    if (JSBI.equal(this.reserve0.raw, ZERO) || JSBI.equal(this.reserve1.raw, ZERO)) {
      throw new InsufficientReservesError();
    }

    var inputReserve = this.reserveOf(inputAmount.token);
    var outputReserve = this.reserveOf(inputAmount.token.equals(this.token0) ? this.token1 : this.token0);
    var inputAmountWithFee = JSBI.multiply(inputAmount.raw, _998);
    var numerator = JSBI.multiply(inputAmountWithFee, outputReserve.raw);
    var denominator = JSBI.add(JSBI.multiply(inputReserve.raw, _1000), inputAmountWithFee);
    var outputAmount = new TokenAmount(inputAmount.token.equals(this.token0) ? this.token1 : this.token0, JSBI.divide(numerator, denominator));

    if (JSBI.equal(outputAmount.raw, ZERO)) {
      throw new InsufficientInputAmountError();
    }

    return [outputAmount, new Pair(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount))];
  };

  _proto.getInputAmount = function getInputAmount(outputAmount) {
    !this.involvesToken(outputAmount.token) ?  invariant(false, 'TOKEN')  : void 0;

    if (JSBI.equal(this.reserve0.raw, ZERO) || JSBI.equal(this.reserve1.raw, ZERO) || JSBI.greaterThanOrEqual(outputAmount.raw, this.reserveOf(outputAmount.token).raw)) {
      throw new InsufficientReservesError();
    }

    var outputReserve = this.reserveOf(outputAmount.token);
    var inputReserve = this.reserveOf(outputAmount.token.equals(this.token0) ? this.token1 : this.token0);
    var numerator = JSBI.multiply(JSBI.multiply(inputReserve.raw, outputAmount.raw), _1000);
    var denominator = JSBI.multiply(JSBI.subtract(outputReserve.raw, outputAmount.raw), _998);
    var inputAmount = new TokenAmount(outputAmount.token.equals(this.token0) ? this.token1 : this.token0, JSBI.add(JSBI.divide(numerator, denominator), ONE));
    return [inputAmount, new Pair(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount))];
  };

  _proto.getLiquidityMinted = function getLiquidityMinted(totalSupply, tokenAmountA, tokenAmountB) {
    !totalSupply.token.equals(this.liquidityToken) ?  invariant(false, 'LIQUIDITY')  : void 0;
    var tokenAmounts = tokenAmountA.token.sortsBefore(tokenAmountB.token) // does safety checks
    ? [tokenAmountA, tokenAmountB] : [tokenAmountB, tokenAmountA];
    !(tokenAmounts[0].token.equals(this.token0) && tokenAmounts[1].token.equals(this.token1)) ?  invariant(false, 'TOKEN')  : void 0;
    var liquidity;

    if (JSBI.equal(totalSupply.raw, ZERO)) {
      liquidity = JSBI.subtract(sqrt(JSBI.multiply(tokenAmounts[0].raw, tokenAmounts[1].raw)), MINIMUM_LIQUIDITY);
    } else {
      var amount0 = JSBI.divide(JSBI.multiply(tokenAmounts[0].raw, totalSupply.raw), this.reserve0.raw);
      var amount1 = JSBI.divide(JSBI.multiply(tokenAmounts[1].raw, totalSupply.raw), this.reserve1.raw);
      liquidity = JSBI.lessThanOrEqual(amount0, amount1) ? amount0 : amount1;
    }

    if (!JSBI.greaterThan(liquidity, ZERO)) {
      throw new InsufficientInputAmountError();
    }

    return new TokenAmount(this.liquidityToken, liquidity);
  };

  _proto.getLiquidityValue = function getLiquidityValue(token, totalSupply, liquidity, feeOn, kLast) {
    if (feeOn === void 0) {
      feeOn = false;
    }

    !this.involvesToken(token) ?  invariant(false, 'TOKEN')  : void 0;
    !totalSupply.token.equals(this.liquidityToken) ?  invariant(false, 'TOTAL_SUPPLY')  : void 0;
    !liquidity.token.equals(this.liquidityToken) ?  invariant(false, 'LIQUIDITY')  : void 0;
    !JSBI.lessThanOrEqual(liquidity.raw, totalSupply.raw) ?  invariant(false, 'LIQUIDITY')  : void 0;
    var totalSupplyAdjusted;

    if (!feeOn) {
      totalSupplyAdjusted = totalSupply;
    } else {
      !!!kLast ?  invariant(false, 'K_LAST')  : void 0;
      var kLastParsed = parseBigintIsh(kLast);

      if (!JSBI.equal(kLastParsed, ZERO)) {
        var rootK = sqrt(JSBI.multiply(this.reserve0.raw, this.reserve1.raw));
        var rootKLast = sqrt(kLastParsed);

        if (JSBI.greaterThan(rootK, rootKLast)) {
          var numerator = JSBI.multiply(totalSupply.raw, JSBI.subtract(rootK, rootKLast));
          var denominator = JSBI.add(JSBI.multiply(rootK, FIVE), rootKLast);
          var feeLiquidity = JSBI.divide(numerator, denominator);
          totalSupplyAdjusted = totalSupply.add(new TokenAmount(this.liquidityToken, feeLiquidity));
        } else {
          totalSupplyAdjusted = totalSupply;
        }
      } else {
        totalSupplyAdjusted = totalSupply;
      }
    }

    return new TokenAmount(token, JSBI.divide(JSBI.multiply(liquidity.raw, this.reserveOf(token).raw), totalSupplyAdjusted.raw));
  };

  _createClass(Pair, [{
    key: "token0Price",
    get: function get() {
      return new Price(this.token0, this.token1, this.tokenAmounts[0].raw, this.tokenAmounts[1].raw);
    }
    /**
     * Returns the current mid price of the pair in terms of token1, i.e. the ratio of reserve0 to reserve1
     */

  }, {
    key: "token1Price",
    get: function get() {
      return new Price(this.token1, this.token0, this.tokenAmounts[1].raw, this.tokenAmounts[0].raw);
    }
  }, {
    key: "chainId",
    get: function get() {
      return this.token0.chainId;
    }
  }, {
    key: "token0",
    get: function get() {
      return this.tokenAmounts[0].token;
    }
  }, {
    key: "token1",
    get: function get() {
      return this.tokenAmounts[1].token;
    }
  }, {
    key: "reserve0",
    get: function get() {
      return this.tokenAmounts[0];
    }
  }, {
    key: "reserve1",
    get: function get() {
      return this.tokenAmounts[1];
    }
  }]);

  return Pair;
}();

var Route = /*#__PURE__*/function () {
  function Route(pairs, input, output) {
    !(pairs.length > 0) ?  invariant(false, 'PAIRS')  : void 0;
    !pairs.every(function (pair) {
      return pair.chainId === pairs[0].chainId;
    }) ?  invariant(false, 'CHAIN_IDS')  : void 0;
    !(input instanceof Token && pairs[0].involvesToken(input) || input === ETHERS[pairs[0].chainId] && pairs[0].involvesToken(WETH[pairs[0].chainId])) ?  invariant(false, 'INPUT')  : void 0;
    !(typeof output === 'undefined' || output instanceof Token && pairs[pairs.length - 1].involvesToken(output) || output === ETHERS[pairs[0].chainId] && pairs[pairs.length - 1].involvesToken(WETH[pairs[0].chainId])) ?  invariant(false, 'OUTPUT')  : void 0;
    var path = [input instanceof Token ? input : WETH[pairs[0].chainId]];

    for (var _iterator = _createForOfIteratorHelperLoose(pairs.entries()), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
          i = _step$value[0],
          pair = _step$value[1];
      var currentInput = path[i];
      !(currentInput.equals(pair.token0) || currentInput.equals(pair.token1)) ?  invariant(false, 'PATH')  : void 0;

      var _output = currentInput.equals(pair.token0) ? pair.token1 : pair.token0;

      path.push(_output);
    }

    this.pairs = pairs;
    this.path = path;
    this.midPrice = Price.fromRoute(this);
    this.input = input;
    this.output = output !== null && output !== void 0 ? output : path[path.length - 1];
  }

  _createClass(Route, [{
    key: "chainId",
    get: function get() {
      return this.pairs[0].chainId;
    }
  }]);

  return Route;
}();

var _100_PERCENT = /*#__PURE__*/new Fraction(_100);

var Percent = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(Percent, _Fraction);

  function Percent() {
    return _Fraction.apply(this, arguments) || this;
  }

  var _proto = Percent.prototype;

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 5;
    }

    return this.multiply(_100_PERCENT).toSignificant(significantDigits, format, rounding);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = 2;
    }

    return this.multiply(_100_PERCENT).toFixed(decimalPlaces, format, rounding);
  };

  return Percent;
}(Fraction);

/**
 * Returns the percent difference between the mid price and the execution price, i.e. price impact.
 * @param midPrice mid price before the trade
 * @param inputAmount the input amount of the trade
 * @param outputAmount the output amount of the trade
 */

function computePriceImpact(midPrice, inputAmount, outputAmount) {
  var exactQuote = midPrice.raw.multiply(inputAmount.raw); // calculate slippage := (exactQuote - outputAmount) / exactQuote

  var slippage = exactQuote.subtract(outputAmount.raw).divide(exactQuote);
  return new Percent(slippage.numerator, slippage.denominator);
} // comparator function that allows sorting trades by their output amounts, in decreasing order, and then input amounts
// in increasing order. i.e. the best trades have the most outputs for the least inputs and are sorted first


function inputOutputComparator(a, b) {
  // must have same input and output token for comparison
  !currencyEquals(a.inputAmount.currency, b.inputAmount.currency) ?  invariant(false, 'INPUT_CURRENCY')  : void 0;
  !currencyEquals(a.outputAmount.currency, b.outputAmount.currency) ?  invariant(false, 'OUTPUT_CURRENCY')  : void 0;

  if (a.outputAmount.equalTo(b.outputAmount)) {
    if (a.inputAmount.equalTo(b.inputAmount)) {
      return 0;
    } // trade A requires less input than trade B, so A should come first


    if (a.inputAmount.lessThan(b.inputAmount)) {
      return -1;
    } else {
      return 1;
    }
  } else {
    // tradeA has less output than trade B, so should come second
    if (a.outputAmount.lessThan(b.outputAmount)) {
      return 1;
    } else {
      return -1;
    }
  }
} // extension of the input output comparator that also considers other dimensions of the trade in ranking them

function tradeComparator(a, b) {
  var ioComp = inputOutputComparator(a, b);

  if (ioComp !== 0) {
    return ioComp;
  } // consider lowest slippage next, since these are less likely to fail


  if (a.priceImpact.lessThan(b.priceImpact)) {
    return -1;
  } else if (a.priceImpact.greaterThan(b.priceImpact)) {
    return 1;
  } // finally consider the number of hops since each hop costs gas


  return a.route.path.length - b.route.path.length;
}
/**
 * Given a currency amount and a chain ID, returns the equivalent representation as the token amount.
 * In other words, if the currency is ETHER, returns the WETH token amount for the given chain. Otherwise, returns
 * the input currency amount.
 */

function wrappedAmount(currencyAmount, chainId) {
  if (currencyAmount instanceof TokenAmount) return currencyAmount;
  if (currencyAmount.currency === ETHERS[chainId]) return new TokenAmount(WETH[chainId], currencyAmount.raw);
    invariant(false, 'CURRENCY')  ;
}

function wrappedCurrency(currency, chainId) {
  if (currency instanceof Token) return currency;
  if (currency === ETHERS[chainId]) return WETH[chainId];
    invariant(false, 'CURRENCY')  ;
}
/**
 * Represents a trade executed against a list of pairs.
 * Does not account for slippage, i.e. trades that front run this trade and move the price.
 */


var Trade = /*#__PURE__*/function () {
  function Trade(route, amount, tradeType) {
    var amounts = new Array(route.path.length);
    var nextPairs = new Array(route.pairs.length);

    if (tradeType === exports.TradeType.EXACT_INPUT) {
      !currencyEquals(amount.currency, route.input) ?  invariant(false, 'INPUT')  : void 0;
      amounts[0] = wrappedAmount(amount, route.chainId);

      for (var i = 0; i < route.path.length - 1; i++) {
        var pair = route.pairs[i];

        var _pair$getOutputAmount = pair.getOutputAmount(amounts[i]),
            outputAmount = _pair$getOutputAmount[0],
            nextPair = _pair$getOutputAmount[1];

        amounts[i + 1] = outputAmount;
        nextPairs[i] = nextPair;
      }
    } else {
      !currencyEquals(amount.currency, route.output) ?  invariant(false, 'OUTPUT')  : void 0;
      amounts[amounts.length - 1] = wrappedAmount(amount, route.chainId);

      for (var _i = route.path.length - 1; _i > 0; _i--) {
        var _pair = route.pairs[_i - 1];

        var _pair$getInputAmount = _pair.getInputAmount(amounts[_i]),
            inputAmount = _pair$getInputAmount[0],
            _nextPair = _pair$getInputAmount[1];

        amounts[_i - 1] = inputAmount;
        nextPairs[_i - 1] = _nextPair;
      }
    }

    this.route = route;
    this.tradeType = tradeType;
    this.inputAmount = tradeType === exports.TradeType.EXACT_INPUT ? amount : route.input === ETHERS[route.chainId] ? CurrencyAmount.ether(amounts[0].raw, route.chainId) : amounts[0];
    this.outputAmount = tradeType === exports.TradeType.EXACT_OUTPUT ? amount : route.output === ETHERS[route.chainId] ? CurrencyAmount.ether(amounts[amounts.length - 1].raw, route.chainId) : amounts[amounts.length - 1];
    this.executionPrice = new Price(this.inputAmount.currency, this.outputAmount.currency, this.inputAmount.raw, this.outputAmount.raw);
    this.nextMidPrice = Price.fromRoute(new Route(nextPairs, route.input));
    this.priceImpact = computePriceImpact(route.midPrice, this.inputAmount, this.outputAmount);
  }
  /**
   * Constructs an exact in trade with the given amount in and route
   * @param route route of the exact in trade
   * @param amountIn the amount being passed in
   */


  Trade.exactIn = function exactIn(route, amountIn) {
    return new Trade(route, amountIn, exports.TradeType.EXACT_INPUT);
  }
  /**
   * Constructs an exact out trade with the given amount out and route
   * @param route route of the exact out trade
   * @param amountOut the amount returned by the trade
   */
  ;

  Trade.exactOut = function exactOut(route, amountOut) {
    return new Trade(route, amountOut, exports.TradeType.EXACT_OUTPUT);
  }
  /**
   * Get the minimum amount that must be received from this trade for the given slippage tolerance
   * @param slippageTolerance tolerance of unfavorable slippage from the execution price of this trade
   */
  ;

  var _proto = Trade.prototype;

  _proto.minimumAmountOut = function minimumAmountOut(slippageTolerance, chainId) {
    if (chainId === void 0) {
      chainId = exports.ChainId.MAINNET;
    }

    !!slippageTolerance.lessThan(ZERO) ?  invariant(false, 'SLIPPAGE_TOLERANCE')  : void 0;

    if (this.tradeType === exports.TradeType.EXACT_OUTPUT) {
      return this.outputAmount;
    } else {
      var slippageAdjustedAmountOut = new Fraction(ONE).add(slippageTolerance).invert().multiply(this.outputAmount.raw).quotient;
      return this.outputAmount instanceof TokenAmount ? new TokenAmount(this.outputAmount.token, slippageAdjustedAmountOut) : CurrencyAmount.ether(slippageAdjustedAmountOut, chainId);
    }
  }
  /**
   * Get the maximum amount in that can be spent via this trade for the given slippage tolerance
   * @param slippageTolerance tolerance of unfavorable slippage from the execution price of this trade
   */
  ;

  _proto.maximumAmountIn = function maximumAmountIn(slippageTolerance, chainId) {
    if (chainId === void 0) {
      chainId = exports.ChainId.MAINNET;
    }

    !!slippageTolerance.lessThan(ZERO) ?  invariant(false, 'SLIPPAGE_TOLERANCE')  : void 0;

    if (this.tradeType === exports.TradeType.EXACT_INPUT) {
      return this.inputAmount;
    } else {
      var slippageAdjustedAmountIn = new Fraction(ONE).add(slippageTolerance).multiply(this.inputAmount.raw).quotient;
      return this.inputAmount instanceof TokenAmount ? new TokenAmount(this.inputAmount.token, slippageAdjustedAmountIn) : CurrencyAmount.ether(slippageAdjustedAmountIn, chainId);
    }
  }
  /**
   * Given a list of pairs, and a fixed amount in, returns the top `maxNumResults` trades that go from an input token
   * amount to an output token, making at most `maxHops` hops.
   * Note this does not consider aggregation, as routes are linear. It's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pairs the pairs to consider in finding the best trade
   * @param currencyAmountIn exact amount of input currency to spend
   * @param currencyOut the desired currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pair
   * @param currentPairs used in recursion; the current list of pairs
   * @param originalAmountIn used in recursion; the original value of the currencyAmountIn parameter
   * @param bestTrades used in recursion; the current list of best trades
   */
  ;

  Trade.bestTradeExactIn = function bestTradeExactIn(pairs, currencyAmountIn, currencyOut, _temp, // used in recursion.
  currentPairs, originalAmountIn, bestTrades) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$maxNumResults = _ref.maxNumResults,
        maxNumResults = _ref$maxNumResults === void 0 ? 3 : _ref$maxNumResults,
        _ref$maxHops = _ref.maxHops,
        maxHops = _ref$maxHops === void 0 ? 3 : _ref$maxHops;

    if (currentPairs === void 0) {
      currentPairs = [];
    }

    if (originalAmountIn === void 0) {
      originalAmountIn = currencyAmountIn;
    }

    if (bestTrades === void 0) {
      bestTrades = [];
    }

    !(pairs.length > 0) ?  invariant(false, 'PAIRS')  : void 0;
    !(maxHops > 0) ?  invariant(false, 'MAX_HOPS')  : void 0;
    !(originalAmountIn === currencyAmountIn || currentPairs.length > 0) ?  invariant(false, 'INVALID_RECURSION')  : void 0;
    var chainId = currencyAmountIn instanceof TokenAmount ? currencyAmountIn.token.chainId : currencyOut instanceof Token ? currencyOut.chainId : undefined;
    !(chainId !== undefined) ?  invariant(false, 'CHAIN_ID')  : void 0;
    var amountIn = wrappedAmount(currencyAmountIn, chainId);
    var tokenOut = wrappedCurrency(currencyOut, chainId);

    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i]; // pair irrelevant

      if (!pair.token0.equals(amountIn.token) && !pair.token1.equals(amountIn.token)) continue;
      if (pair.reserve0.equalTo(ZERO) || pair.reserve1.equalTo(ZERO)) continue;
      var amountOut = void 0;

      try {
        ;

        var _pair$getOutputAmount2 = pair.getOutputAmount(amountIn);

        amountOut = _pair$getOutputAmount2[0];
      } catch (error) {
        // input too low
        if (error.isInsufficientInputAmountError) {
          continue;
        }

        throw error;
      } // we have arrived at the output token, so this is the final trade of one of the paths


      if (amountOut.token.equals(tokenOut)) {
        sortedInsert(bestTrades, new Trade(new Route([].concat(currentPairs, [pair]), originalAmountIn.currency, currencyOut), originalAmountIn, exports.TradeType.EXACT_INPUT), maxNumResults, tradeComparator);
      } else if (maxHops > 1 && pairs.length > 1) {
        var pairsExcludingThisPair = pairs.slice(0, i).concat(pairs.slice(i + 1, pairs.length)); // otherwise, consider all the other paths that lead from this token as long as we have not exceeded maxHops

        Trade.bestTradeExactIn(pairsExcludingThisPair, amountOut, currencyOut, {
          maxNumResults: maxNumResults,
          maxHops: maxHops - 1
        }, [].concat(currentPairs, [pair]), originalAmountIn, bestTrades);
      }
    }

    return bestTrades;
  }
  /**
   * similar to the above method but instead targets a fixed output amount
   * given a list of pairs, and a fixed amount out, returns the top `maxNumResults` trades that go from an input token
   * to an output token amount, making at most `maxHops` hops
   * note this does not consider aggregation, as routes are linear. it's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pairs the pairs to consider in finding the best trade
   * @param currencyIn the currency to spend
   * @param currencyAmountOut the exact amount of currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pair
   * @param currentPairs used in recursion; the current list of pairs
   * @param originalAmountOut used in recursion; the original value of the currencyAmountOut parameter
   * @param bestTrades used in recursion; the current list of best trades
   */
  ;

  Trade.bestTradeExactOut = function bestTradeExactOut(pairs, currencyIn, currencyAmountOut, _temp2, // used in recursion.
  currentPairs, originalAmountOut, bestTrades) {
    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$maxNumResults = _ref2.maxNumResults,
        maxNumResults = _ref2$maxNumResults === void 0 ? 3 : _ref2$maxNumResults,
        _ref2$maxHops = _ref2.maxHops,
        maxHops = _ref2$maxHops === void 0 ? 3 : _ref2$maxHops;

    if (currentPairs === void 0) {
      currentPairs = [];
    }

    if (originalAmountOut === void 0) {
      originalAmountOut = currencyAmountOut;
    }

    if (bestTrades === void 0) {
      bestTrades = [];
    }

    !(pairs.length > 0) ?  invariant(false, 'PAIRS')  : void 0;
    !(maxHops > 0) ?  invariant(false, 'MAX_HOPS')  : void 0;
    !(originalAmountOut === currencyAmountOut || currentPairs.length > 0) ?  invariant(false, 'INVALID_RECURSION')  : void 0;
    var chainId = currencyAmountOut instanceof TokenAmount ? currencyAmountOut.token.chainId : currencyIn instanceof Token ? currencyIn.chainId : undefined;
    !(chainId !== undefined) ?  invariant(false, 'CHAIN_ID')  : void 0;
    var amountOut = wrappedAmount(currencyAmountOut, chainId);
    var tokenIn = wrappedCurrency(currencyIn, chainId);

    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i]; // pair irrelevant

      if (!pair.token0.equals(amountOut.token) && !pair.token1.equals(amountOut.token)) continue;
      if (pair.reserve0.equalTo(ZERO) || pair.reserve1.equalTo(ZERO)) continue;
      var amountIn = void 0;

      try {
        ;

        var _pair$getInputAmount2 = pair.getInputAmount(amountOut);

        amountIn = _pair$getInputAmount2[0];
      } catch (error) {
        // not enough liquidity in this pair
        if (error.isInsufficientReservesError) {
          continue;
        }

        throw error;
      } // we have arrived at the input token, so this is the first trade of one of the paths


      if (amountIn.token.equals(tokenIn)) {
        sortedInsert(bestTrades, new Trade(new Route([pair].concat(currentPairs), currencyIn, originalAmountOut.currency), originalAmountOut, exports.TradeType.EXACT_OUTPUT), maxNumResults, tradeComparator);
      } else if (maxHops > 1 && pairs.length > 1) {
        var pairsExcludingThisPair = pairs.slice(0, i).concat(pairs.slice(i + 1, pairs.length)); // otherwise, consider all the other paths that arrive at this token as long as we have not exceeded maxHops

        Trade.bestTradeExactOut(pairsExcludingThisPair, currencyIn, amountIn, {
          maxNumResults: maxNumResults,
          maxHops: maxHops - 1
        }, [pair].concat(currentPairs), originalAmountOut, bestTrades);
      }
    }

    return bestTrades;
  };

  return Trade;
}();

function toHex(currencyAmount) {
  return "0x" + currencyAmount.raw.toString(16);
}

var ZERO_HEX = '0x0';
/**
 * Represents the Uniswap V2 Router, and has static methods for helping execute trades.
 */

var Router = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function Router() {}
  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trade to produce call parameters for
   * @param options options for the call parameters
   */


  Router.swapCallParameters = function swapCallParameters(trade, options, chainId) {
    if (chainId === void 0) {
      chainId = exports.ChainId.MAINNET;
    }

    var etherIn = trade.inputAmount.currency === ETHERS[chainId];
    var etherOut = trade.outputAmount.currency === ETHERS[chainId]; // the router does not support both ether in and out

    !!(etherIn && etherOut) ?  invariant(false, 'ETHER_IN_OUT')  : void 0;
    !(options.ttl > 0) ?  invariant(false, 'TTL')  : void 0;
    var to = validateAndParseAddress(options.recipient);
    var amountIn = toHex(trade.maximumAmountIn(options.allowedSlippage, chainId));
    var amountOut = toHex(trade.minimumAmountOut(options.allowedSlippage, chainId));
    var path = trade.route.path.map(function (token) {
      return token.address;
    });
    var deadline = "0x" + (Math.floor(new Date().getTime() / 1000) + options.ttl).toString(16);
    var useFeeOnTransfer = Boolean(options.feeOnTransfer);
    var methodName;
    var args;
    var value;

    switch (trade.tradeType) {
      case exports.TradeType.EXACT_INPUT:
        if (etherIn) {
          methodName = useFeeOnTransfer ? 'swapExactETHForTokensSupportingFeeOnTransferTokens' : 'swapExactETHForTokens'; // (uint amountOutMin, address[] calldata path, address to, uint deadline)

          args = [amountOut, path, to, deadline];
          value = amountIn;
        } else if (etherOut) {
          methodName = useFeeOnTransfer ? 'swapExactTokensForETHSupportingFeeOnTransferTokens' : 'swapExactTokensForETH'; // (uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)

          args = [amountIn, amountOut, path, to, deadline];
          value = ZERO_HEX;
        } else {
          methodName = useFeeOnTransfer ? 'swapExactTokensForTokensSupportingFeeOnTransferTokens' : 'swapExactTokensForTokens'; // (uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)

          args = [amountIn, amountOut, path, to, deadline];
          value = ZERO_HEX;
        }

        break;

      case exports.TradeType.EXACT_OUTPUT:
        !!useFeeOnTransfer ?  invariant(false, 'EXACT_OUT_FOT')  : void 0;

        if (etherIn) {
          methodName = 'swapETHForExactTokens'; // (uint amountOut, address[] calldata path, address to, uint deadline)

          args = [amountOut, path, to, deadline];
          value = amountIn;
        } else if (etherOut) {
          methodName = 'swapTokensForExactETH'; // (uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)

          args = [amountOut, amountIn, path, to, deadline];
          value = ZERO_HEX;
        } else {
          methodName = 'swapTokensForExactTokens'; // (uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)

          args = [amountOut, amountIn, path, to, deadline];
          value = ZERO_HEX;
        }

        break;
    }

    return {
      methodName: methodName,
      args: args,
      value: value
    };
  };

  return Router;
}();

var contractName = "IAnnexPair";
var abi = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "Burn",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		name: "Mint",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0In",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1In",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0Out",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1Out",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "Swap",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint112",
				name: "reserve0",
				type: "uint112"
			},
			{
				indexed: false,
				internalType: "uint112",
				name: "reserve1",
				type: "uint112"
			}
		],
		name: "Sync",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		inputs: [
		],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "DOMAIN_SEPARATOR",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "PERMIT_TYPEHASH",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "nonces",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "permit",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "MINIMUM_LIQUIDITY",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
		],
		name: "factory",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "token0",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "token1",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getReserves",
		outputs: [
			{
				internalType: "uint112",
				name: "reserve0",
				type: "uint112"
			},
			{
				internalType: "uint112",
				name: "reserve1",
				type: "uint112"
			},
			{
				internalType: "uint32",
				name: "blockTimestampLast",
				type: "uint32"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "price0CumulativeLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "price1CumulativeLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "kLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "mint",
		outputs: [
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "burn",
		outputs: [
			{
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amount0Out",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1Out",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes"
			}
		],
		name: "swap",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "skim",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "sync",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "initialize",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];
var metadata = "{\"compiler\":{\"version\":\"0.6.6+commit.6c089d02\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount0\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount1\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"}],\"name\":\"Burn\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount0\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount1\",\"type\":\"uint256\"}],\"name\":\"Mint\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount0In\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount1In\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount0Out\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount1Out\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"}],\"name\":\"Swap\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint112\",\"name\":\"reserve0\",\"type\":\"uint112\"},{\"indexed\":false,\"internalType\":\"uint112\",\"name\":\"reserve1\",\"type\":\"uint112\"}],\"name\":\"Sync\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"DOMAIN_SEPARATOR\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"MINIMUM_LIQUIDITY\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"PERMIT_TYPEHASH\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"}],\"name\":\"allowance\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"}],\"name\":\"burn\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"amount0\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount1\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"decimals\",\"outputs\":[{\"internalType\":\"uint8\",\"name\":\"\",\"type\":\"uint8\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"factory\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getReserves\",\"outputs\":[{\"internalType\":\"uint112\",\"name\":\"reserve0\",\"type\":\"uint112\"},{\"internalType\":\"uint112\",\"name\":\"reserve1\",\"type\":\"uint112\"},{\"internalType\":\"uint32\",\"name\":\"blockTimestampLast\",\"type\":\"uint32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"initialize\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"kLast\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"}],\"name\":\"mint\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"liquidity\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"nonces\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"deadline\",\"type\":\"uint256\"},{\"internalType\":\"uint8\",\"name\":\"v\",\"type\":\"uint8\"},{\"internalType\":\"bytes32\",\"name\":\"r\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"s\",\"type\":\"bytes32\"}],\"name\":\"permit\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"price0CumulativeLast\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"price1CumulativeLast\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"}],\"name\":\"skim\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"amount0Out\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount1Out\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"swap\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"sync\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"token0\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"token1\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"methods\":{}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"/L/projects/trident-uniswap-contracts/contracts/interfaces/IAnnexPair.sol\":\"IAnnexPair\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":999999},\"remappings\":[]},\"sources\":{\"/L/projects/trident-uniswap-contracts/contracts/interfaces/IAnnexPair.sol\":{\"keccak256\":\"0xbfee830e585302b5ef85b316877e7252208d1f6a35555baeb8936106e793229b\",\"urls\":[\"bzz-raw://10ef57c1b55135a29ccf8c87d1598cf8e02c6d1830475c95927d6ed558e9f853\",\"dweb:/ipfs/QmdRFEEu8ePzemx1VvD2pb94RmW9GDSLJQcnFtUbjkdPNv\"]}},\"version\":1}";
var bytecode = "0x";
var deployedBytecode = "0x";
var immutableReferences = {
};
var sourceMap = "";
var deployedSourceMap = "";
var source = "pragma solidity >=0.5.0;\r\n\r\ninterface IAnnexPair {\r\n    event Approval(address indexed owner, address indexed spender, uint value);\r\n    event Transfer(address indexed from, address indexed to, uint value);\r\n\r\n    function name() external pure returns (string memory);\r\n    function symbol() external pure returns (string memory);\r\n    function decimals() external pure returns (uint8);\r\n    function totalSupply() external view returns (uint);\r\n    function balanceOf(address owner) external view returns (uint);\r\n    function allowance(address owner, address spender) external view returns (uint);\r\n\r\n    function approve(address spender, uint value) external returns (bool);\r\n    function transfer(address to, uint value) external returns (bool);\r\n    function transferFrom(address from, address to, uint value) external returns (bool);\r\n\r\n    function DOMAIN_SEPARATOR() external view returns (bytes32);\r\n    function PERMIT_TYPEHASH() external pure returns (bytes32);\r\n    function nonces(address owner) external view returns (uint);\r\n\r\n    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;\r\n\r\n    event Mint(address indexed sender, uint amount0, uint amount1);\r\n    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);\r\n    event Swap(\r\n        address indexed sender,\r\n        uint amount0In,\r\n        uint amount1In,\r\n        uint amount0Out,\r\n        uint amount1Out,\r\n        address indexed to\r\n    );\r\n    event Sync(uint112 reserve0, uint112 reserve1);\r\n\r\n    function MINIMUM_LIQUIDITY() external pure returns (uint);\r\n    function factory() external view returns (address);\r\n    function token0() external view returns (address);\r\n    function token1() external view returns (address);\r\n    function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);\r\n    function price0CumulativeLast() external view returns (uint);\r\n    function price1CumulativeLast() external view returns (uint);\r\n    function kLast() external view returns (uint);\r\n\r\n    function mint(address to) external returns (uint liquidity);\r\n    function burn(address to) external returns (uint amount0, uint amount1);\r\n    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;\r\n    function skim(address to) external;\r\n    function sync() external;\r\n\r\n    function initialize(address, address) external;\r\n}";
var sourcePath = "L:/projects/trident-uniswap-contracts/contracts/interfaces/IAnnexPair.sol";
var ast = {
	absolutePath: "/L/projects/trident-uniswap-contracts/contracts/interfaces/IAnnexPair.sol",
	exportedSymbols: {
		IAnnexPair: [
			241
		]
	},
	id: 242,
	nodeType: "SourceUnit",
	nodes: [
		{
			id: 1,
			literals: [
				"solidity",
				">=",
				"0.5",
				".0"
			],
			nodeType: "PragmaDirective",
			src: "0:24:0"
		},
		{
			abstract: false,
			baseContracts: [
			],
			contractDependencies: [
			],
			contractKind: "interface",
			documentation: null,
			fullyImplemented: false,
			id: 241,
			linearizedBaseContracts: [
				241
			],
			name: "IAnnexPair",
			nodeType: "ContractDefinition",
			nodes: [
				{
					anonymous: false,
					documentation: null,
					id: 9,
					name: "Approval",
					nodeType: "EventDefinition",
					parameters: {
						id: 8,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 3,
								indexed: true,
								mutability: "mutable",
								name: "owner",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 9,
								src: "71:21:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "71:7:0",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 5,
								indexed: true,
								mutability: "mutable",
								name: "spender",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 9,
								src: "94:23:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 4,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "94:7:0",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 7,
								indexed: false,
								mutability: "mutable",
								name: "value",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 9,
								src: "119:10:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "119:4:0",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "70:60:0"
					},
					src: "56:75:0"
				},
				{
					anonymous: false,
					documentation: null,
					id: 17,
					name: "Transfer",
					nodeType: "EventDefinition",
					parameters: {
						id: 16,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 11,
								indexed: true,
								mutability: "mutable",
								name: "from",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 17,
								src: "152:20:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 10,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "152:7:0",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 13,
								indexed: true,
								mutability: "mutable",
								name: "to",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 17,
								src: "174:18:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 12,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "174:7:0",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 15,
								indexed: false,
								mutability: "mutable",
								name: "value",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 17,
								src: "194:10:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 14,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "194:4:0",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "151:54:0"
					},
					src: "137:69:0"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "06fdde03",
					id: 22,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "name",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 18,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "227:2:0"
					},
					returnParameters: {
						id: 21,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 20,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 22,
								src: "253:13:0",
								stateVariable: false,
								storageLocation: "memory",
								typeDescriptions: {
									typeIdentifier: "t_string_memory_ptr",
									typeString: "string"
								},
								typeName: {
									id: 19,
									name: "string",
									nodeType: "ElementaryTypeName",
									src: "253:6:0",
									typeDescriptions: {
										typeIdentifier: "t_string_storage_ptr",
										typeString: "string"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "252:15:0"
					},
					scope: 241,
					src: "214:54:0",
					stateMutability: "pure",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "95d89b41",
					id: 27,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "symbol",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 23,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "289:2:0"
					},
					returnParameters: {
						id: 26,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 25,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 27,
								src: "315:13:0",
								stateVariable: false,
								storageLocation: "memory",
								typeDescriptions: {
									typeIdentifier: "t_string_memory_ptr",
									typeString: "string"
								},
								typeName: {
									id: 24,
									name: "string",
									nodeType: "ElementaryTypeName",
									src: "315:6:0",
									typeDescriptions: {
										typeIdentifier: "t_string_storage_ptr",
										typeString: "string"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "314:15:0"
					},
					scope: 241,
					src: "274:56:0",
					stateMutability: "pure",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "313ce567",
					id: 32,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "decimals",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 28,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "353:2:0"
					},
					returnParameters: {
						id: 31,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 30,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 32,
								src: "379:5:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint8",
									typeString: "uint8"
								},
								typeName: {
									id: 29,
									name: "uint8",
									nodeType: "ElementaryTypeName",
									src: "379:5:0",
									typeDescriptions: {
										typeIdentifier: "t_uint8",
										typeString: "uint8"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "378:7:0"
					},
					scope: 241,
					src: "336:50:0",
					stateMutability: "pure",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "18160ddd",
					id: 37,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "totalSupply",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 33,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "412:2:0"
					},
					returnParameters: {
						id: 36,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 35,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 37,
								src: "438:4:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 34,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "438:4:0",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "437:6:0"
					},
					scope: 241,
					src: "392:52:0",
					stateMutability: "view",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "70a08231",
					id: 44,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "balanceOf",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 40,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 39,
								mutability: "mutable",
								name: "owner",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 44,
								src: "469:13:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 38,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "469:7:0",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "468:15:0"
					},
					returnParameters: {
						id: 43,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 42,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 44,
								src: "507:4:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 41,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "507:4:0",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "506:6:0"
					},
					scope: 241,
					src: "450:63:0",
					stateMutability: "view",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "dd62ed3e",
					id: 53,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "allowance",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 49,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 46,
								mutability: "mutable",
								name: "owner",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 53,
								src: "538:13:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 45,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "538:7:0",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 48,
								mutability: "mutable",
								name: "spender",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 53,
								src: "553:15:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 47,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "553:7:0",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "537:32:0"
					},
					returnParameters: {
						id: 52,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 51,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 53,
								src: "593:4:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 50,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "593:4:0",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "592:6:0"
					},
					scope: 241,
					src: "519:80:0",
					stateMutability: "view",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "095ea7b3",
					id: 62,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "approve",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 58,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 55,
								mutability: "mutable",
								name: "spender",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 62,
								src: "624:15:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 54,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "624:7:0",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 57,
								mutability: "mutable",
								name: "value",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 62,
								src: "641:10:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 56,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "641:4:0",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "623:29:0"
					},
					returnParameters: {
						id: 61,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 60,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 62,
								src: "671:4:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bool",
									typeString: "bool"
								},
								typeName: {
									id: 59,
									name: "bool",
									nodeType: "ElementaryTypeName",
									src: "671:4:0",
									typeDescriptions: {
										typeIdentifier: "t_bool",
										typeString: "bool"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "670:6:0"
					},
					scope: 241,
					src: "607:70:0",
					stateMutability: "nonpayable",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "a9059cbb",
					id: 71,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "transfer",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 67,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 64,
								mutability: "mutable",
								name: "to",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 71,
								src: "701:10:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 63,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "701:7:0",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 66,
								mutability: "mutable",
								name: "value",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 71,
								src: "713:10:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 65,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "713:4:0",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "700:24:0"
					},
					returnParameters: {
						id: 70,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 69,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 71,
								src: "743:4:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bool",
									typeString: "bool"
								},
								typeName: {
									id: 68,
									name: "bool",
									nodeType: "ElementaryTypeName",
									src: "743:4:0",
									typeDescriptions: {
										typeIdentifier: "t_bool",
										typeString: "bool"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "742:6:0"
					},
					scope: 241,
					src: "683:66:0",
					stateMutability: "nonpayable",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "23b872dd",
					id: 82,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "transferFrom",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 78,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 73,
								mutability: "mutable",
								name: "from",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 82,
								src: "777:12:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 72,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "777:7:0",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 75,
								mutability: "mutable",
								name: "to",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 82,
								src: "791:10:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 74,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "791:7:0",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 77,
								mutability: "mutable",
								name: "value",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 82,
								src: "803:10:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 76,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "803:4:0",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "776:38:0"
					},
					returnParameters: {
						id: 81,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 80,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 82,
								src: "833:4:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bool",
									typeString: "bool"
								},
								typeName: {
									id: 79,
									name: "bool",
									nodeType: "ElementaryTypeName",
									src: "833:4:0",
									typeDescriptions: {
										typeIdentifier: "t_bool",
										typeString: "bool"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "832:6:0"
					},
					scope: 241,
					src: "755:84:0",
					stateMutability: "nonpayable",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "3644e515",
					id: 87,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "DOMAIN_SEPARATOR",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 83,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "872:2:0"
					},
					returnParameters: {
						id: 86,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 85,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 87,
								src: "898:7:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bytes32",
									typeString: "bytes32"
								},
								typeName: {
									id: 84,
									name: "bytes32",
									nodeType: "ElementaryTypeName",
									src: "898:7:0",
									typeDescriptions: {
										typeIdentifier: "t_bytes32",
										typeString: "bytes32"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "897:9:0"
					},
					scope: 241,
					src: "847:60:0",
					stateMutability: "view",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "30adf81f",
					id: 92,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "PERMIT_TYPEHASH",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 88,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "937:2:0"
					},
					returnParameters: {
						id: 91,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 90,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 92,
								src: "963:7:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bytes32",
									typeString: "bytes32"
								},
								typeName: {
									id: 89,
									name: "bytes32",
									nodeType: "ElementaryTypeName",
									src: "963:7:0",
									typeDescriptions: {
										typeIdentifier: "t_bytes32",
										typeString: "bytes32"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "962:9:0"
					},
					scope: 241,
					src: "913:59:0",
					stateMutability: "pure",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "7ecebe00",
					id: 99,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "nonces",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 95,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 94,
								mutability: "mutable",
								name: "owner",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 99,
								src: "994:13:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 93,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "994:7:0",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "993:15:0"
					},
					returnParameters: {
						id: 98,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 97,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 99,
								src: "1032:4:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 96,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1032:4:0",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1031:6:0"
					},
					scope: 241,
					src: "978:60:0",
					stateMutability: "view",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "d505accf",
					id: 116,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "permit",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 114,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 101,
								mutability: "mutable",
								name: "owner",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 116,
								src: "1062:13:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 100,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1062:7:0",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 103,
								mutability: "mutable",
								name: "spender",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 116,
								src: "1077:15:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 102,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1077:7:0",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 105,
								mutability: "mutable",
								name: "value",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 116,
								src: "1094:10:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 104,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1094:4:0",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 107,
								mutability: "mutable",
								name: "deadline",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 116,
								src: "1106:13:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 106,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1106:4:0",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 109,
								mutability: "mutable",
								name: "v",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 116,
								src: "1121:7:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint8",
									typeString: "uint8"
								},
								typeName: {
									id: 108,
									name: "uint8",
									nodeType: "ElementaryTypeName",
									src: "1121:5:0",
									typeDescriptions: {
										typeIdentifier: "t_uint8",
										typeString: "uint8"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 111,
								mutability: "mutable",
								name: "r",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 116,
								src: "1130:9:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bytes32",
									typeString: "bytes32"
								},
								typeName: {
									id: 110,
									name: "bytes32",
									nodeType: "ElementaryTypeName",
									src: "1130:7:0",
									typeDescriptions: {
										typeIdentifier: "t_bytes32",
										typeString: "bytes32"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 113,
								mutability: "mutable",
								name: "s",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 116,
								src: "1141:9:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bytes32",
									typeString: "bytes32"
								},
								typeName: {
									id: 112,
									name: "bytes32",
									nodeType: "ElementaryTypeName",
									src: "1141:7:0",
									typeDescriptions: {
										typeIdentifier: "t_bytes32",
										typeString: "bytes32"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1061:90:0"
					},
					returnParameters: {
						id: 115,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1160:0:0"
					},
					scope: 241,
					src: "1046:115:0",
					stateMutability: "nonpayable",
					virtual: false,
					visibility: "external"
				},
				{
					anonymous: false,
					documentation: null,
					id: 124,
					name: "Mint",
					nodeType: "EventDefinition",
					parameters: {
						id: 123,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 118,
								indexed: true,
								mutability: "mutable",
								name: "sender",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 124,
								src: "1180:22:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 117,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1180:7:0",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 120,
								indexed: false,
								mutability: "mutable",
								name: "amount0",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 124,
								src: "1204:12:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 119,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1204:4:0",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 122,
								indexed: false,
								mutability: "mutable",
								name: "amount1",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 124,
								src: "1218:12:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 121,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1218:4:0",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1179:52:0"
					},
					src: "1169:63:0"
				},
				{
					anonymous: false,
					documentation: null,
					id: 134,
					name: "Burn",
					nodeType: "EventDefinition",
					parameters: {
						id: 133,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 126,
								indexed: true,
								mutability: "mutable",
								name: "sender",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 134,
								src: "1249:22:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 125,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1249:7:0",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 128,
								indexed: false,
								mutability: "mutable",
								name: "amount0",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 134,
								src: "1273:12:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 127,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1273:4:0",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 130,
								indexed: false,
								mutability: "mutable",
								name: "amount1",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 134,
								src: "1287:12:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 129,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1287:4:0",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 132,
								indexed: true,
								mutability: "mutable",
								name: "to",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 134,
								src: "1301:18:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 131,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1301:7:0",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1248:72:0"
					},
					src: "1238:83:0"
				},
				{
					anonymous: false,
					documentation: null,
					id: 148,
					name: "Swap",
					nodeType: "EventDefinition",
					parameters: {
						id: 147,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 136,
								indexed: true,
								mutability: "mutable",
								name: "sender",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 148,
								src: "1348:22:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 135,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1348:7:0",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 138,
								indexed: false,
								mutability: "mutable",
								name: "amount0In",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 148,
								src: "1381:14:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 137,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1381:4:0",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 140,
								indexed: false,
								mutability: "mutable",
								name: "amount1In",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 148,
								src: "1406:14:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 139,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1406:4:0",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 142,
								indexed: false,
								mutability: "mutable",
								name: "amount0Out",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 148,
								src: "1431:15:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 141,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1431:4:0",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 144,
								indexed: false,
								mutability: "mutable",
								name: "amount1Out",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 148,
								src: "1457:15:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 143,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1457:4:0",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 146,
								indexed: true,
								mutability: "mutable",
								name: "to",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 148,
								src: "1483:18:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 145,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1483:7:0",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1337:171:0"
					},
					src: "1327:182:0"
				},
				{
					anonymous: false,
					documentation: null,
					id: 154,
					name: "Sync",
					nodeType: "EventDefinition",
					parameters: {
						id: 153,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 150,
								indexed: false,
								mutability: "mutable",
								name: "reserve0",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 154,
								src: "1526:16:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint112",
									typeString: "uint112"
								},
								typeName: {
									id: 149,
									name: "uint112",
									nodeType: "ElementaryTypeName",
									src: "1526:7:0",
									typeDescriptions: {
										typeIdentifier: "t_uint112",
										typeString: "uint112"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 152,
								indexed: false,
								mutability: "mutable",
								name: "reserve1",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 154,
								src: "1544:16:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint112",
									typeString: "uint112"
								},
								typeName: {
									id: 151,
									name: "uint112",
									nodeType: "ElementaryTypeName",
									src: "1544:7:0",
									typeDescriptions: {
										typeIdentifier: "t_uint112",
										typeString: "uint112"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1525:36:0"
					},
					src: "1515:47:0"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "ba9a7a56",
					id: 159,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "MINIMUM_LIQUIDITY",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 155,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1596:2:0"
					},
					returnParameters: {
						id: 158,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 157,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 159,
								src: "1622:4:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 156,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1622:4:0",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1621:6:0"
					},
					scope: 241,
					src: "1570:58:0",
					stateMutability: "pure",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "c45a0155",
					id: 164,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "factory",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 160,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1650:2:0"
					},
					returnParameters: {
						id: 163,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 162,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 164,
								src: "1676:7:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 161,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1676:7:0",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1675:9:0"
					},
					scope: 241,
					src: "1634:51:0",
					stateMutability: "view",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "0dfe1681",
					id: 169,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "token0",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 165,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1706:2:0"
					},
					returnParameters: {
						id: 168,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 167,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 169,
								src: "1732:7:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 166,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1732:7:0",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1731:9:0"
					},
					scope: 241,
					src: "1691:50:0",
					stateMutability: "view",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "d21220a7",
					id: 174,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "token1",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 170,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1762:2:0"
					},
					returnParameters: {
						id: 173,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 172,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 174,
								src: "1788:7:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 171,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1788:7:0",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1787:9:0"
					},
					scope: 241,
					src: "1747:50:0",
					stateMutability: "view",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "0902f1ac",
					id: 183,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "getReserves",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 175,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1823:2:0"
					},
					returnParameters: {
						id: 182,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 177,
								mutability: "mutable",
								name: "reserve0",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 183,
								src: "1849:16:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint112",
									typeString: "uint112"
								},
								typeName: {
									id: 176,
									name: "uint112",
									nodeType: "ElementaryTypeName",
									src: "1849:7:0",
									typeDescriptions: {
										typeIdentifier: "t_uint112",
										typeString: "uint112"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 179,
								mutability: "mutable",
								name: "reserve1",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 183,
								src: "1867:16:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint112",
									typeString: "uint112"
								},
								typeName: {
									id: 178,
									name: "uint112",
									nodeType: "ElementaryTypeName",
									src: "1867:7:0",
									typeDescriptions: {
										typeIdentifier: "t_uint112",
										typeString: "uint112"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 181,
								mutability: "mutable",
								name: "blockTimestampLast",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 183,
								src: "1885:25:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint32",
									typeString: "uint32"
								},
								typeName: {
									id: 180,
									name: "uint32",
									nodeType: "ElementaryTypeName",
									src: "1885:6:0",
									typeDescriptions: {
										typeIdentifier: "t_uint32",
										typeString: "uint32"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1848:63:0"
					},
					scope: 241,
					src: "1803:109:0",
					stateMutability: "view",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "5909c0d5",
					id: 188,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "price0CumulativeLast",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 184,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1947:2:0"
					},
					returnParameters: {
						id: 187,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 186,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 188,
								src: "1973:4:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 185,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1973:4:0",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1972:6:0"
					},
					scope: 241,
					src: "1918:61:0",
					stateMutability: "view",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "5a3d5493",
					id: 193,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "price1CumulativeLast",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 189,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2014:2:0"
					},
					returnParameters: {
						id: 192,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 191,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 193,
								src: "2040:4:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 190,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2040:4:0",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2039:6:0"
					},
					scope: 241,
					src: "1985:61:0",
					stateMutability: "view",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "7464fc3d",
					id: 198,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "kLast",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 194,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2066:2:0"
					},
					returnParameters: {
						id: 197,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 196,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 198,
								src: "2092:4:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 195,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2092:4:0",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2091:6:0"
					},
					scope: 241,
					src: "2052:46:0",
					stateMutability: "view",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "6a627842",
					id: 205,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "mint",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 201,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 200,
								mutability: "mutable",
								name: "to",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 205,
								src: "2120:10:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 199,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "2120:7:0",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2119:12:0"
					},
					returnParameters: {
						id: 204,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 203,
								mutability: "mutable",
								name: "liquidity",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 205,
								src: "2150:14:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 202,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2150:4:0",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2149:16:0"
					},
					scope: 241,
					src: "2106:60:0",
					stateMutability: "nonpayable",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "89afcb44",
					id: 214,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "burn",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 208,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 207,
								mutability: "mutable",
								name: "to",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 214,
								src: "2186:10:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 206,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "2186:7:0",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2185:12:0"
					},
					returnParameters: {
						id: 213,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 210,
								mutability: "mutable",
								name: "amount0",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 214,
								src: "2216:12:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 209,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2216:4:0",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 212,
								mutability: "mutable",
								name: "amount1",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 214,
								src: "2230:12:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 211,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2230:4:0",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2215:28:0"
					},
					scope: 241,
					src: "2172:72:0",
					stateMutability: "nonpayable",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "022c0d9f",
					id: 225,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "swap",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 223,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 216,
								mutability: "mutable",
								name: "amount0Out",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 225,
								src: "2264:15:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 215,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2264:4:0",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 218,
								mutability: "mutable",
								name: "amount1Out",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 225,
								src: "2281:15:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 217,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2281:4:0",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 220,
								mutability: "mutable",
								name: "to",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 225,
								src: "2298:10:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 219,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "2298:7:0",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 222,
								mutability: "mutable",
								name: "data",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 225,
								src: "2310:19:0",
								stateVariable: false,
								storageLocation: "calldata",
								typeDescriptions: {
									typeIdentifier: "t_bytes_calldata_ptr",
									typeString: "bytes"
								},
								typeName: {
									id: 221,
									name: "bytes",
									nodeType: "ElementaryTypeName",
									src: "2310:5:0",
									typeDescriptions: {
										typeIdentifier: "t_bytes_storage_ptr",
										typeString: "bytes"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2263:67:0"
					},
					returnParameters: {
						id: 224,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2339:0:0"
					},
					scope: 241,
					src: "2250:90:0",
					stateMutability: "nonpayable",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "bc25cf77",
					id: 230,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "skim",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 228,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 227,
								mutability: "mutable",
								name: "to",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 230,
								src: "2360:10:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 226,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "2360:7:0",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2359:12:0"
					},
					returnParameters: {
						id: 229,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2380:0:0"
					},
					scope: 241,
					src: "2346:35:0",
					stateMutability: "nonpayable",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "fff6cae9",
					id: 233,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "sync",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 231,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2400:2:0"
					},
					returnParameters: {
						id: 232,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2411:0:0"
					},
					scope: 241,
					src: "2387:25:0",
					stateMutability: "nonpayable",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "485cc955",
					id: 240,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "initialize",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 238,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 235,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 240,
								src: "2440:7:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 234,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "2440:7:0",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 237,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 240,
								src: "2449:7:0",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 236,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "2449:7:0",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2439:18:0"
					},
					returnParameters: {
						id: 239,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2466:0:0"
					},
					scope: 241,
					src: "2420:47:0",
					stateMutability: "nonpayable",
					virtual: false,
					visibility: "external"
				}
			],
			scope: 242,
			src: "28:2442:0"
		}
	],
	src: "0:2470:0"
};
var legacyAST = {
	attributes: {
		absolutePath: "/L/projects/trident-uniswap-contracts/contracts/interfaces/IAnnexPair.sol",
		exportedSymbols: {
			IAnnexPair: [
				241
			]
		}
	},
	children: [
		{
			attributes: {
				literals: [
					"solidity",
					">=",
					"0.5",
					".0"
				]
			},
			id: 1,
			name: "PragmaDirective",
			src: "0:24:0"
		},
		{
			attributes: {
				abstract: false,
				baseContracts: [
					null
				],
				contractDependencies: [
					null
				],
				contractKind: "interface",
				documentation: null,
				fullyImplemented: false,
				linearizedBaseContracts: [
					241
				],
				name: "IAnnexPair",
				scope: 242
			},
			children: [
				{
					attributes: {
						anonymous: false,
						documentation: null,
						name: "Approval"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										indexed: true,
										mutability: "mutable",
										name: "owner",
										overrides: null,
										scope: 9,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2,
											name: "ElementaryTypeName",
											src: "71:7:0"
										}
									],
									id: 3,
									name: "VariableDeclaration",
									src: "71:21:0"
								},
								{
									attributes: {
										constant: false,
										indexed: true,
										mutability: "mutable",
										name: "spender",
										overrides: null,
										scope: 9,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 4,
											name: "ElementaryTypeName",
											src: "94:7:0"
										}
									],
									id: 5,
									name: "VariableDeclaration",
									src: "94:23:0"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										mutability: "mutable",
										name: "value",
										overrides: null,
										scope: 9,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6,
											name: "ElementaryTypeName",
											src: "119:4:0"
										}
									],
									id: 7,
									name: "VariableDeclaration",
									src: "119:10:0"
								}
							],
							id: 8,
							name: "ParameterList",
							src: "70:60:0"
						}
					],
					id: 9,
					name: "EventDefinition",
					src: "56:75:0"
				},
				{
					attributes: {
						anonymous: false,
						documentation: null,
						name: "Transfer"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										indexed: true,
										mutability: "mutable",
										name: "from",
										overrides: null,
										scope: 17,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 10,
											name: "ElementaryTypeName",
											src: "152:7:0"
										}
									],
									id: 11,
									name: "VariableDeclaration",
									src: "152:20:0"
								},
								{
									attributes: {
										constant: false,
										indexed: true,
										mutability: "mutable",
										name: "to",
										overrides: null,
										scope: 17,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 12,
											name: "ElementaryTypeName",
											src: "174:7:0"
										}
									],
									id: 13,
									name: "VariableDeclaration",
									src: "174:18:0"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										mutability: "mutable",
										name: "value",
										overrides: null,
										scope: 17,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 14,
											name: "ElementaryTypeName",
											src: "194:4:0"
										}
									],
									id: 15,
									name: "VariableDeclaration",
									src: "194:10:0"
								}
							],
							id: 16,
							name: "ParameterList",
							src: "151:54:0"
						}
					],
					id: 17,
					name: "EventDefinition",
					src: "137:69:0"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "06fdde03",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "name",
						overrides: null,
						scope: 241,
						stateMutability: "pure",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 18,
							name: "ParameterList",
							src: "227:2:0"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 22,
										stateVariable: false,
										storageLocation: "memory",
										type: "string",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "string",
												type: "string"
											},
											id: 19,
											name: "ElementaryTypeName",
											src: "253:6:0"
										}
									],
									id: 20,
									name: "VariableDeclaration",
									src: "253:13:0"
								}
							],
							id: 21,
							name: "ParameterList",
							src: "252:15:0"
						}
					],
					id: 22,
					name: "FunctionDefinition",
					src: "214:54:0"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "95d89b41",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "symbol",
						overrides: null,
						scope: 241,
						stateMutability: "pure",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 23,
							name: "ParameterList",
							src: "289:2:0"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 27,
										stateVariable: false,
										storageLocation: "memory",
										type: "string",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "string",
												type: "string"
											},
											id: 24,
											name: "ElementaryTypeName",
											src: "315:6:0"
										}
									],
									id: 25,
									name: "VariableDeclaration",
									src: "315:13:0"
								}
							],
							id: 26,
							name: "ParameterList",
							src: "314:15:0"
						}
					],
					id: 27,
					name: "FunctionDefinition",
					src: "274:56:0"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "313ce567",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "decimals",
						overrides: null,
						scope: 241,
						stateMutability: "pure",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 28,
							name: "ParameterList",
							src: "353:2:0"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 32,
										stateVariable: false,
										storageLocation: "default",
										type: "uint8",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint8",
												type: "uint8"
											},
											id: 29,
											name: "ElementaryTypeName",
											src: "379:5:0"
										}
									],
									id: 30,
									name: "VariableDeclaration",
									src: "379:5:0"
								}
							],
							id: 31,
							name: "ParameterList",
							src: "378:7:0"
						}
					],
					id: 32,
					name: "FunctionDefinition",
					src: "336:50:0"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "18160ddd",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "totalSupply",
						overrides: null,
						scope: 241,
						stateMutability: "view",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 33,
							name: "ParameterList",
							src: "412:2:0"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 37,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 34,
											name: "ElementaryTypeName",
											src: "438:4:0"
										}
									],
									id: 35,
									name: "VariableDeclaration",
									src: "438:4:0"
								}
							],
							id: 36,
							name: "ParameterList",
							src: "437:6:0"
						}
					],
					id: 37,
					name: "FunctionDefinition",
					src: "392:52:0"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "70a08231",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "balanceOf",
						overrides: null,
						scope: 241,
						stateMutability: "view",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "owner",
										overrides: null,
										scope: 44,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 38,
											name: "ElementaryTypeName",
											src: "469:7:0"
										}
									],
									id: 39,
									name: "VariableDeclaration",
									src: "469:13:0"
								}
							],
							id: 40,
							name: "ParameterList",
							src: "468:15:0"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 44,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 41,
											name: "ElementaryTypeName",
											src: "507:4:0"
										}
									],
									id: 42,
									name: "VariableDeclaration",
									src: "507:4:0"
								}
							],
							id: 43,
							name: "ParameterList",
							src: "506:6:0"
						}
					],
					id: 44,
					name: "FunctionDefinition",
					src: "450:63:0"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "dd62ed3e",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "allowance",
						overrides: null,
						scope: 241,
						stateMutability: "view",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "owner",
										overrides: null,
										scope: 53,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 45,
											name: "ElementaryTypeName",
											src: "538:7:0"
										}
									],
									id: 46,
									name: "VariableDeclaration",
									src: "538:13:0"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "spender",
										overrides: null,
										scope: 53,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 47,
											name: "ElementaryTypeName",
											src: "553:7:0"
										}
									],
									id: 48,
									name: "VariableDeclaration",
									src: "553:15:0"
								}
							],
							id: 49,
							name: "ParameterList",
							src: "537:32:0"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 53,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 50,
											name: "ElementaryTypeName",
											src: "593:4:0"
										}
									],
									id: 51,
									name: "VariableDeclaration",
									src: "593:4:0"
								}
							],
							id: 52,
							name: "ParameterList",
							src: "592:6:0"
						}
					],
					id: 53,
					name: "FunctionDefinition",
					src: "519:80:0"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "095ea7b3",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "approve",
						overrides: null,
						scope: 241,
						stateMutability: "nonpayable",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "spender",
										overrides: null,
										scope: 62,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 54,
											name: "ElementaryTypeName",
											src: "624:7:0"
										}
									],
									id: 55,
									name: "VariableDeclaration",
									src: "624:15:0"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "value",
										overrides: null,
										scope: 62,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 56,
											name: "ElementaryTypeName",
											src: "641:4:0"
										}
									],
									id: 57,
									name: "VariableDeclaration",
									src: "641:10:0"
								}
							],
							id: 58,
							name: "ParameterList",
							src: "623:29:0"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 62,
										stateVariable: false,
										storageLocation: "default",
										type: "bool",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bool",
												type: "bool"
											},
											id: 59,
											name: "ElementaryTypeName",
											src: "671:4:0"
										}
									],
									id: 60,
									name: "VariableDeclaration",
									src: "671:4:0"
								}
							],
							id: 61,
							name: "ParameterList",
							src: "670:6:0"
						}
					],
					id: 62,
					name: "FunctionDefinition",
					src: "607:70:0"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "a9059cbb",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "transfer",
						overrides: null,
						scope: 241,
						stateMutability: "nonpayable",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "to",
										overrides: null,
										scope: 71,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 63,
											name: "ElementaryTypeName",
											src: "701:7:0"
										}
									],
									id: 64,
									name: "VariableDeclaration",
									src: "701:10:0"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "value",
										overrides: null,
										scope: 71,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 65,
											name: "ElementaryTypeName",
											src: "713:4:0"
										}
									],
									id: 66,
									name: "VariableDeclaration",
									src: "713:10:0"
								}
							],
							id: 67,
							name: "ParameterList",
							src: "700:24:0"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 71,
										stateVariable: false,
										storageLocation: "default",
										type: "bool",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bool",
												type: "bool"
											},
											id: 68,
											name: "ElementaryTypeName",
											src: "743:4:0"
										}
									],
									id: 69,
									name: "VariableDeclaration",
									src: "743:4:0"
								}
							],
							id: 70,
							name: "ParameterList",
							src: "742:6:0"
						}
					],
					id: 71,
					name: "FunctionDefinition",
					src: "683:66:0"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "23b872dd",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "transferFrom",
						overrides: null,
						scope: 241,
						stateMutability: "nonpayable",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "from",
										overrides: null,
										scope: 82,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 72,
											name: "ElementaryTypeName",
											src: "777:7:0"
										}
									],
									id: 73,
									name: "VariableDeclaration",
									src: "777:12:0"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "to",
										overrides: null,
										scope: 82,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 74,
											name: "ElementaryTypeName",
											src: "791:7:0"
										}
									],
									id: 75,
									name: "VariableDeclaration",
									src: "791:10:0"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "value",
										overrides: null,
										scope: 82,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 76,
											name: "ElementaryTypeName",
											src: "803:4:0"
										}
									],
									id: 77,
									name: "VariableDeclaration",
									src: "803:10:0"
								}
							],
							id: 78,
							name: "ParameterList",
							src: "776:38:0"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 82,
										stateVariable: false,
										storageLocation: "default",
										type: "bool",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bool",
												type: "bool"
											},
											id: 79,
											name: "ElementaryTypeName",
											src: "833:4:0"
										}
									],
									id: 80,
									name: "VariableDeclaration",
									src: "833:4:0"
								}
							],
							id: 81,
							name: "ParameterList",
							src: "832:6:0"
						}
					],
					id: 82,
					name: "FunctionDefinition",
					src: "755:84:0"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "3644e515",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "DOMAIN_SEPARATOR",
						overrides: null,
						scope: 241,
						stateMutability: "view",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 83,
							name: "ParameterList",
							src: "872:2:0"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 87,
										stateVariable: false,
										storageLocation: "default",
										type: "bytes32",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bytes32",
												type: "bytes32"
											},
											id: 84,
											name: "ElementaryTypeName",
											src: "898:7:0"
										}
									],
									id: 85,
									name: "VariableDeclaration",
									src: "898:7:0"
								}
							],
							id: 86,
							name: "ParameterList",
							src: "897:9:0"
						}
					],
					id: 87,
					name: "FunctionDefinition",
					src: "847:60:0"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "30adf81f",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "PERMIT_TYPEHASH",
						overrides: null,
						scope: 241,
						stateMutability: "pure",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 88,
							name: "ParameterList",
							src: "937:2:0"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 92,
										stateVariable: false,
										storageLocation: "default",
										type: "bytes32",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bytes32",
												type: "bytes32"
											},
											id: 89,
											name: "ElementaryTypeName",
											src: "963:7:0"
										}
									],
									id: 90,
									name: "VariableDeclaration",
									src: "963:7:0"
								}
							],
							id: 91,
							name: "ParameterList",
							src: "962:9:0"
						}
					],
					id: 92,
					name: "FunctionDefinition",
					src: "913:59:0"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "7ecebe00",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "nonces",
						overrides: null,
						scope: 241,
						stateMutability: "view",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "owner",
										overrides: null,
										scope: 99,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 93,
											name: "ElementaryTypeName",
											src: "994:7:0"
										}
									],
									id: 94,
									name: "VariableDeclaration",
									src: "994:13:0"
								}
							],
							id: 95,
							name: "ParameterList",
							src: "993:15:0"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 99,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 96,
											name: "ElementaryTypeName",
											src: "1032:4:0"
										}
									],
									id: 97,
									name: "VariableDeclaration",
									src: "1032:4:0"
								}
							],
							id: 98,
							name: "ParameterList",
							src: "1031:6:0"
						}
					],
					id: 99,
					name: "FunctionDefinition",
					src: "978:60:0"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "d505accf",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "permit",
						overrides: null,
						scope: 241,
						stateMutability: "nonpayable",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "owner",
										overrides: null,
										scope: 116,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 100,
											name: "ElementaryTypeName",
											src: "1062:7:0"
										}
									],
									id: 101,
									name: "VariableDeclaration",
									src: "1062:13:0"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "spender",
										overrides: null,
										scope: 116,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 102,
											name: "ElementaryTypeName",
											src: "1077:7:0"
										}
									],
									id: 103,
									name: "VariableDeclaration",
									src: "1077:15:0"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "value",
										overrides: null,
										scope: 116,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 104,
											name: "ElementaryTypeName",
											src: "1094:4:0"
										}
									],
									id: 105,
									name: "VariableDeclaration",
									src: "1094:10:0"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "deadline",
										overrides: null,
										scope: 116,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 106,
											name: "ElementaryTypeName",
											src: "1106:4:0"
										}
									],
									id: 107,
									name: "VariableDeclaration",
									src: "1106:13:0"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "v",
										overrides: null,
										scope: 116,
										stateVariable: false,
										storageLocation: "default",
										type: "uint8",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint8",
												type: "uint8"
											},
											id: 108,
											name: "ElementaryTypeName",
											src: "1121:5:0"
										}
									],
									id: 109,
									name: "VariableDeclaration",
									src: "1121:7:0"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "r",
										overrides: null,
										scope: 116,
										stateVariable: false,
										storageLocation: "default",
										type: "bytes32",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bytes32",
												type: "bytes32"
											},
											id: 110,
											name: "ElementaryTypeName",
											src: "1130:7:0"
										}
									],
									id: 111,
									name: "VariableDeclaration",
									src: "1130:9:0"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "s",
										overrides: null,
										scope: 116,
										stateVariable: false,
										storageLocation: "default",
										type: "bytes32",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bytes32",
												type: "bytes32"
											},
											id: 112,
											name: "ElementaryTypeName",
											src: "1141:7:0"
										}
									],
									id: 113,
									name: "VariableDeclaration",
									src: "1141:9:0"
								}
							],
							id: 114,
							name: "ParameterList",
							src: "1061:90:0"
						},
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 115,
							name: "ParameterList",
							src: "1160:0:0"
						}
					],
					id: 116,
					name: "FunctionDefinition",
					src: "1046:115:0"
				},
				{
					attributes: {
						anonymous: false,
						documentation: null,
						name: "Mint"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										indexed: true,
										mutability: "mutable",
										name: "sender",
										overrides: null,
										scope: 124,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 117,
											name: "ElementaryTypeName",
											src: "1180:7:0"
										}
									],
									id: 118,
									name: "VariableDeclaration",
									src: "1180:22:0"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										mutability: "mutable",
										name: "amount0",
										overrides: null,
										scope: 124,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 119,
											name: "ElementaryTypeName",
											src: "1204:4:0"
										}
									],
									id: 120,
									name: "VariableDeclaration",
									src: "1204:12:0"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										mutability: "mutable",
										name: "amount1",
										overrides: null,
										scope: 124,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 121,
											name: "ElementaryTypeName",
											src: "1218:4:0"
										}
									],
									id: 122,
									name: "VariableDeclaration",
									src: "1218:12:0"
								}
							],
							id: 123,
							name: "ParameterList",
							src: "1179:52:0"
						}
					],
					id: 124,
					name: "EventDefinition",
					src: "1169:63:0"
				},
				{
					attributes: {
						anonymous: false,
						documentation: null,
						name: "Burn"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										indexed: true,
										mutability: "mutable",
										name: "sender",
										overrides: null,
										scope: 134,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 125,
											name: "ElementaryTypeName",
											src: "1249:7:0"
										}
									],
									id: 126,
									name: "VariableDeclaration",
									src: "1249:22:0"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										mutability: "mutable",
										name: "amount0",
										overrides: null,
										scope: 134,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 127,
											name: "ElementaryTypeName",
											src: "1273:4:0"
										}
									],
									id: 128,
									name: "VariableDeclaration",
									src: "1273:12:0"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										mutability: "mutable",
										name: "amount1",
										overrides: null,
										scope: 134,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 129,
											name: "ElementaryTypeName",
											src: "1287:4:0"
										}
									],
									id: 130,
									name: "VariableDeclaration",
									src: "1287:12:0"
								},
								{
									attributes: {
										constant: false,
										indexed: true,
										mutability: "mutable",
										name: "to",
										overrides: null,
										scope: 134,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 131,
											name: "ElementaryTypeName",
											src: "1301:7:0"
										}
									],
									id: 132,
									name: "VariableDeclaration",
									src: "1301:18:0"
								}
							],
							id: 133,
							name: "ParameterList",
							src: "1248:72:0"
						}
					],
					id: 134,
					name: "EventDefinition",
					src: "1238:83:0"
				},
				{
					attributes: {
						anonymous: false,
						documentation: null,
						name: "Swap"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										indexed: true,
										mutability: "mutable",
										name: "sender",
										overrides: null,
										scope: 148,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 135,
											name: "ElementaryTypeName",
											src: "1348:7:0"
										}
									],
									id: 136,
									name: "VariableDeclaration",
									src: "1348:22:0"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										mutability: "mutable",
										name: "amount0In",
										overrides: null,
										scope: 148,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 137,
											name: "ElementaryTypeName",
											src: "1381:4:0"
										}
									],
									id: 138,
									name: "VariableDeclaration",
									src: "1381:14:0"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										mutability: "mutable",
										name: "amount1In",
										overrides: null,
										scope: 148,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 139,
											name: "ElementaryTypeName",
											src: "1406:4:0"
										}
									],
									id: 140,
									name: "VariableDeclaration",
									src: "1406:14:0"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										mutability: "mutable",
										name: "amount0Out",
										overrides: null,
										scope: 148,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 141,
											name: "ElementaryTypeName",
											src: "1431:4:0"
										}
									],
									id: 142,
									name: "VariableDeclaration",
									src: "1431:15:0"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										mutability: "mutable",
										name: "amount1Out",
										overrides: null,
										scope: 148,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 143,
											name: "ElementaryTypeName",
											src: "1457:4:0"
										}
									],
									id: 144,
									name: "VariableDeclaration",
									src: "1457:15:0"
								},
								{
									attributes: {
										constant: false,
										indexed: true,
										mutability: "mutable",
										name: "to",
										overrides: null,
										scope: 148,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 145,
											name: "ElementaryTypeName",
											src: "1483:7:0"
										}
									],
									id: 146,
									name: "VariableDeclaration",
									src: "1483:18:0"
								}
							],
							id: 147,
							name: "ParameterList",
							src: "1337:171:0"
						}
					],
					id: 148,
					name: "EventDefinition",
					src: "1327:182:0"
				},
				{
					attributes: {
						anonymous: false,
						documentation: null,
						name: "Sync"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										indexed: false,
										mutability: "mutable",
										name: "reserve0",
										overrides: null,
										scope: 154,
										stateVariable: false,
										storageLocation: "default",
										type: "uint112",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint112",
												type: "uint112"
											},
											id: 149,
											name: "ElementaryTypeName",
											src: "1526:7:0"
										}
									],
									id: 150,
									name: "VariableDeclaration",
									src: "1526:16:0"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										mutability: "mutable",
										name: "reserve1",
										overrides: null,
										scope: 154,
										stateVariable: false,
										storageLocation: "default",
										type: "uint112",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint112",
												type: "uint112"
											},
											id: 151,
											name: "ElementaryTypeName",
											src: "1544:7:0"
										}
									],
									id: 152,
									name: "VariableDeclaration",
									src: "1544:16:0"
								}
							],
							id: 153,
							name: "ParameterList",
							src: "1525:36:0"
						}
					],
					id: 154,
					name: "EventDefinition",
					src: "1515:47:0"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "ba9a7a56",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "MINIMUM_LIQUIDITY",
						overrides: null,
						scope: 241,
						stateMutability: "pure",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 155,
							name: "ParameterList",
							src: "1596:2:0"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 159,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 156,
											name: "ElementaryTypeName",
											src: "1622:4:0"
										}
									],
									id: 157,
									name: "VariableDeclaration",
									src: "1622:4:0"
								}
							],
							id: 158,
							name: "ParameterList",
							src: "1621:6:0"
						}
					],
					id: 159,
					name: "FunctionDefinition",
					src: "1570:58:0"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "c45a0155",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "factory",
						overrides: null,
						scope: 241,
						stateMutability: "view",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 160,
							name: "ParameterList",
							src: "1650:2:0"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 164,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 161,
											name: "ElementaryTypeName",
											src: "1676:7:0"
										}
									],
									id: 162,
									name: "VariableDeclaration",
									src: "1676:7:0"
								}
							],
							id: 163,
							name: "ParameterList",
							src: "1675:9:0"
						}
					],
					id: 164,
					name: "FunctionDefinition",
					src: "1634:51:0"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "0dfe1681",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "token0",
						overrides: null,
						scope: 241,
						stateMutability: "view",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 165,
							name: "ParameterList",
							src: "1706:2:0"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 169,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 166,
											name: "ElementaryTypeName",
											src: "1732:7:0"
										}
									],
									id: 167,
									name: "VariableDeclaration",
									src: "1732:7:0"
								}
							],
							id: 168,
							name: "ParameterList",
							src: "1731:9:0"
						}
					],
					id: 169,
					name: "FunctionDefinition",
					src: "1691:50:0"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "d21220a7",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "token1",
						overrides: null,
						scope: 241,
						stateMutability: "view",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 170,
							name: "ParameterList",
							src: "1762:2:0"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 174,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 171,
											name: "ElementaryTypeName",
											src: "1788:7:0"
										}
									],
									id: 172,
									name: "VariableDeclaration",
									src: "1788:7:0"
								}
							],
							id: 173,
							name: "ParameterList",
							src: "1787:9:0"
						}
					],
					id: 174,
					name: "FunctionDefinition",
					src: "1747:50:0"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "0902f1ac",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "getReserves",
						overrides: null,
						scope: 241,
						stateMutability: "view",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 175,
							name: "ParameterList",
							src: "1823:2:0"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "reserve0",
										overrides: null,
										scope: 183,
										stateVariable: false,
										storageLocation: "default",
										type: "uint112",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint112",
												type: "uint112"
											},
											id: 176,
											name: "ElementaryTypeName",
											src: "1849:7:0"
										}
									],
									id: 177,
									name: "VariableDeclaration",
									src: "1849:16:0"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "reserve1",
										overrides: null,
										scope: 183,
										stateVariable: false,
										storageLocation: "default",
										type: "uint112",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint112",
												type: "uint112"
											},
											id: 178,
											name: "ElementaryTypeName",
											src: "1867:7:0"
										}
									],
									id: 179,
									name: "VariableDeclaration",
									src: "1867:16:0"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "blockTimestampLast",
										overrides: null,
										scope: 183,
										stateVariable: false,
										storageLocation: "default",
										type: "uint32",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint32",
												type: "uint32"
											},
											id: 180,
											name: "ElementaryTypeName",
											src: "1885:6:0"
										}
									],
									id: 181,
									name: "VariableDeclaration",
									src: "1885:25:0"
								}
							],
							id: 182,
							name: "ParameterList",
							src: "1848:63:0"
						}
					],
					id: 183,
					name: "FunctionDefinition",
					src: "1803:109:0"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "5909c0d5",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "price0CumulativeLast",
						overrides: null,
						scope: 241,
						stateMutability: "view",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 184,
							name: "ParameterList",
							src: "1947:2:0"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 188,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 185,
											name: "ElementaryTypeName",
											src: "1973:4:0"
										}
									],
									id: 186,
									name: "VariableDeclaration",
									src: "1973:4:0"
								}
							],
							id: 187,
							name: "ParameterList",
							src: "1972:6:0"
						}
					],
					id: 188,
					name: "FunctionDefinition",
					src: "1918:61:0"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "5a3d5493",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "price1CumulativeLast",
						overrides: null,
						scope: 241,
						stateMutability: "view",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 189,
							name: "ParameterList",
							src: "2014:2:0"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 193,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 190,
											name: "ElementaryTypeName",
											src: "2040:4:0"
										}
									],
									id: 191,
									name: "VariableDeclaration",
									src: "2040:4:0"
								}
							],
							id: 192,
							name: "ParameterList",
							src: "2039:6:0"
						}
					],
					id: 193,
					name: "FunctionDefinition",
					src: "1985:61:0"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "7464fc3d",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "kLast",
						overrides: null,
						scope: 241,
						stateMutability: "view",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 194,
							name: "ParameterList",
							src: "2066:2:0"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 198,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 195,
											name: "ElementaryTypeName",
											src: "2092:4:0"
										}
									],
									id: 196,
									name: "VariableDeclaration",
									src: "2092:4:0"
								}
							],
							id: 197,
							name: "ParameterList",
							src: "2091:6:0"
						}
					],
					id: 198,
					name: "FunctionDefinition",
					src: "2052:46:0"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "6a627842",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "mint",
						overrides: null,
						scope: 241,
						stateMutability: "nonpayable",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "to",
										overrides: null,
										scope: 205,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 199,
											name: "ElementaryTypeName",
											src: "2120:7:0"
										}
									],
									id: 200,
									name: "VariableDeclaration",
									src: "2120:10:0"
								}
							],
							id: 201,
							name: "ParameterList",
							src: "2119:12:0"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "liquidity",
										overrides: null,
										scope: 205,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 202,
											name: "ElementaryTypeName",
											src: "2150:4:0"
										}
									],
									id: 203,
									name: "VariableDeclaration",
									src: "2150:14:0"
								}
							],
							id: 204,
							name: "ParameterList",
							src: "2149:16:0"
						}
					],
					id: 205,
					name: "FunctionDefinition",
					src: "2106:60:0"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "89afcb44",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "burn",
						overrides: null,
						scope: 241,
						stateMutability: "nonpayable",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "to",
										overrides: null,
										scope: 214,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 206,
											name: "ElementaryTypeName",
											src: "2186:7:0"
										}
									],
									id: 207,
									name: "VariableDeclaration",
									src: "2186:10:0"
								}
							],
							id: 208,
							name: "ParameterList",
							src: "2185:12:0"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "amount0",
										overrides: null,
										scope: 214,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 209,
											name: "ElementaryTypeName",
											src: "2216:4:0"
										}
									],
									id: 210,
									name: "VariableDeclaration",
									src: "2216:12:0"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "amount1",
										overrides: null,
										scope: 214,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 211,
											name: "ElementaryTypeName",
											src: "2230:4:0"
										}
									],
									id: 212,
									name: "VariableDeclaration",
									src: "2230:12:0"
								}
							],
							id: 213,
							name: "ParameterList",
							src: "2215:28:0"
						}
					],
					id: 214,
					name: "FunctionDefinition",
					src: "2172:72:0"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "022c0d9f",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "swap",
						overrides: null,
						scope: 241,
						stateMutability: "nonpayable",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "amount0Out",
										overrides: null,
										scope: 225,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 215,
											name: "ElementaryTypeName",
											src: "2264:4:0"
										}
									],
									id: 216,
									name: "VariableDeclaration",
									src: "2264:15:0"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "amount1Out",
										overrides: null,
										scope: 225,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 217,
											name: "ElementaryTypeName",
											src: "2281:4:0"
										}
									],
									id: 218,
									name: "VariableDeclaration",
									src: "2281:15:0"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "to",
										overrides: null,
										scope: 225,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 219,
											name: "ElementaryTypeName",
											src: "2298:7:0"
										}
									],
									id: 220,
									name: "VariableDeclaration",
									src: "2298:10:0"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "data",
										overrides: null,
										scope: 225,
										stateVariable: false,
										storageLocation: "calldata",
										type: "bytes",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bytes",
												type: "bytes"
											},
											id: 221,
											name: "ElementaryTypeName",
											src: "2310:5:0"
										}
									],
									id: 222,
									name: "VariableDeclaration",
									src: "2310:19:0"
								}
							],
							id: 223,
							name: "ParameterList",
							src: "2263:67:0"
						},
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 224,
							name: "ParameterList",
							src: "2339:0:0"
						}
					],
					id: 225,
					name: "FunctionDefinition",
					src: "2250:90:0"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "bc25cf77",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "skim",
						overrides: null,
						scope: 241,
						stateMutability: "nonpayable",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "to",
										overrides: null,
										scope: 230,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 226,
											name: "ElementaryTypeName",
											src: "2360:7:0"
										}
									],
									id: 227,
									name: "VariableDeclaration",
									src: "2360:10:0"
								}
							],
							id: 228,
							name: "ParameterList",
							src: "2359:12:0"
						},
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 229,
							name: "ParameterList",
							src: "2380:0:0"
						}
					],
					id: 230,
					name: "FunctionDefinition",
					src: "2346:35:0"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "fff6cae9",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "sync",
						overrides: null,
						scope: 241,
						stateMutability: "nonpayable",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 231,
							name: "ParameterList",
							src: "2400:2:0"
						},
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 232,
							name: "ParameterList",
							src: "2411:0:0"
						}
					],
					id: 233,
					name: "FunctionDefinition",
					src: "2387:25:0"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "485cc955",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "initialize",
						overrides: null,
						scope: 241,
						stateMutability: "nonpayable",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 240,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 234,
											name: "ElementaryTypeName",
											src: "2440:7:0"
										}
									],
									id: 235,
									name: "VariableDeclaration",
									src: "2440:7:0"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 240,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 236,
											name: "ElementaryTypeName",
											src: "2449:7:0"
										}
									],
									id: 237,
									name: "VariableDeclaration",
									src: "2449:7:0"
								}
							],
							id: 238,
							name: "ParameterList",
							src: "2439:18:0"
						},
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 239,
							name: "ParameterList",
							src: "2466:0:0"
						}
					],
					id: 240,
					name: "FunctionDefinition",
					src: "2420:47:0"
				}
			],
			id: 241,
			name: "ContractDefinition",
			src: "28:2442:0"
		}
	],
	id: 242,
	name: "SourceUnit",
	src: "0:2470:0"
};
var compiler = {
	name: "solc",
	version: "0.6.6+commit.6c089d02.Emscripten.clang"
};
var networks = {
};
var schemaVersion = "3.4.0";
var updatedAt = "2021-07-15T13:07:48.663Z";
var devdoc = {
	methods: {
	}
};
var userdoc = {
	methods: {
	}
};
var AnnexAbi = {
	contractName: contractName,
	abi: abi,
	metadata: metadata,
	bytecode: bytecode,
	deployedBytecode: deployedBytecode,
	immutableReferences: immutableReferences,
	sourceMap: sourceMap,
	deployedSourceMap: deployedSourceMap,
	source: source,
	sourcePath: sourcePath,
	ast: ast,
	legacyAST: legacyAST,
	compiler: compiler,
	networks: networks,
	schemaVersion: schemaVersion,
	updatedAt: updatedAt,
	devdoc: devdoc,
	userdoc: userdoc
};

var ERC20 = [
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				name: "",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	}
];

var _TOKEN_DECIMALS_CACHE;
var TOKEN_DECIMALS_CACHE = (_TOKEN_DECIMALS_CACHE = {}, _TOKEN_DECIMALS_CACHE[exports.ChainId.MAINNET] = {
  '0xE0B7927c4aF23765Cb51314A0E0521A9645F0E2A': 9 // DGD

}, _TOKEN_DECIMALS_CACHE);
/**
 * Contains methods for constructing instances of pairs and tokens from on-chain data.
 */

var Fetcher = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function Fetcher() {}
  /**
   * Fetch information for a given token on the given chain, using the given ethers provider.
   * @param chainId chain of the token
   * @param address address of the token on the chain
   * @param provider provider used to fetch the token
   * @param symbol optional symbol of the token
   * @param name optional name of the token
   */


  Fetcher.fetchTokenData = function fetchTokenData(chainId, address, provider, symbol, name) {
    try {
      var _TOKEN_DECIMALS_CACHE2, _TOKEN_DECIMALS_CACHE3;

      var _temp3 = function _temp3(parsedDecimals) {
        return new Token(chainId, address, parsedDecimals, symbol, name);
      };

      if (provider === undefined) provider = providers.getDefaultProvider(networks$1.getNetwork(chainId));

      var _temp4 = typeof ((_TOKEN_DECIMALS_CACHE2 = TOKEN_DECIMALS_CACHE) === null || _TOKEN_DECIMALS_CACHE2 === void 0 ? void 0 : (_TOKEN_DECIMALS_CACHE3 = _TOKEN_DECIMALS_CACHE2[chainId]) === null || _TOKEN_DECIMALS_CACHE3 === void 0 ? void 0 : _TOKEN_DECIMALS_CACHE3[address]) === 'number';

      return Promise.resolve(_temp4 ? _temp3(TOKEN_DECIMALS_CACHE[chainId][address]) : Promise.resolve(new contracts.Contract(address, ERC20, provider).decimals().then(function (decimals) {
        var _TOKEN_DECIMALS_CACHE4, _extends2, _extends3;

        TOKEN_DECIMALS_CACHE = _extends({}, TOKEN_DECIMALS_CACHE, (_extends3 = {}, _extends3[chainId] = _extends({}, (_TOKEN_DECIMALS_CACHE4 = TOKEN_DECIMALS_CACHE) === null || _TOKEN_DECIMALS_CACHE4 === void 0 ? void 0 : _TOKEN_DECIMALS_CACHE4[chainId], (_extends2 = {}, _extends2[address] = decimals, _extends2)), _extends3));
        return decimals;
      })).then(_temp3));
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Fetches information about a pair and constructs a pair from the given two tokens.
   * @param tokenA first token
   * @param tokenB second token
   * @param provider the provider to use to fetch the data
   */
  ;

  Fetcher.fetchPairData = function fetchPairData(tokenA, tokenB, provider) {
    try {
      if (provider === undefined) provider = providers.getDefaultProvider(networks$1.getNetwork(tokenA.chainId));
      !(tokenA.chainId === tokenB.chainId) ? "development" !== "production" ? invariant(false, 'CHAIN_ID') : invariant(false) : void 0;
      var address = Pair.getAddress(tokenA, tokenB); // @ts-ignore

      return Promise.resolve(new contracts.Contract(address, AnnexAbi.abi, provider).getReserves()).then(function (_ref) {
        var reserves0 = _ref[0],
            reserves1 = _ref[1];
        var balances = tokenA.sortsBefore(tokenB) ? [reserves0, reserves1] : [reserves1, reserves0];
        return new Pair(new TokenAmount(tokenA, balances[0]), new TokenAmount(tokenB, balances[1]));
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return Fetcher;
}();

exports.JSBI = JSBI;
exports.Currency = Currency;
exports.CurrencyAmount = CurrencyAmount;
exports.ETHER = ETHER;
exports.ETHERS = ETHERS;
exports.FACTORY_ADDRESS = FACTORY_ADDRESS;
exports.Fetcher = Fetcher;
exports.Fraction = Fraction;
exports.INIT_CODE_HASH = INIT_CODE_HASH;
exports.InsufficientInputAmountError = InsufficientInputAmountError;
exports.InsufficientReservesError = InsufficientReservesError;
exports.MINIMUM_LIQUIDITY = MINIMUM_LIQUIDITY;
exports.Pair = Pair;
exports.Percent = Percent;
exports.Price = Price;
exports.Route = Route;
exports.Router = Router;
exports.Token = Token;
exports.TokenAmount = TokenAmount;
exports.Trade = Trade;
exports.WETH = WETH;
exports.currencyEquals = currencyEquals;
exports.inputOutputComparator = inputOutputComparator;
exports.tradeComparator = tradeComparator;
//# sourceMappingURL=sdk.cjs.development.js.map
