const { ERROR_MESSAGE } = require('../constant');

const RangeMixin = (superclass) =>
  class extends superclass {
    static isValidRange(input) {
      const validity = [...input].every(
        (number) => number >= 1 && number <= 45
      );

      if (!validity) {
        throw new Error(ERROR_MESSAGE.RANGE);
      }
    }
  };

class NumberValidator {
  static isValidNumber(input) {
    if ([...input].some((number) => isNaN(number)))
      throw new Error(ERROR_MESSAGE.TYPE);
  }
}

class MoneyValidator extends NumberValidator {
  constructor() {
    super();
  }

  static validate(input) {
    this.isValidMoney(input);
    this.isValidNumber(input);
  }

  static isValidMoney(input) {
    if (input % 1000) throw new Error(ERROR_MESSAGE.CURRENCY_UNIT);
  }
}

class LottoValidator extends RangeMixin(NumberValidator) {
  constructor() {
    super();
  }

  static validate(input) {
    this.isValidNumber(input);
    this.isValidRange(input);
    this.isValidLength(input);
    this.isNoneDuplication(input);
  }

  static isValidLength(input) {
    if (input.length !== 6) throw new Error(ERROR_MESSAGE.LENGTH);
  }

  static isNoneDuplication(input) {
    if ([...new Set(input)].length !== 6)
      throw new Error(ERROR_MESSAGE.DUPLICATION);
  }
}

class BonusValidator extends RangeMixin(NumberValidator) {
  constructor() {
    super();
  }

  static validate(lotto, input) {
    this.isValidNumber(input);
    this.isValidRange(input);
    this.isValidBonusNumber(lotto, input);
  }

  static isValidBonusNumber(lotto, input) {
    if (lotto.includes(input)) throw new Error(ERROR_MESSAGE.DUPLICATION);
  }
}

module.exports = {
  NumberValidator,
  MoneyValidator,
  LottoValidator,
  BonusValidator,
};
