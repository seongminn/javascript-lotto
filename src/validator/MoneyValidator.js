const { ERROR_MESSAGE } = require('../constant');
const NumberValidator = require('./NumberValidator');

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

module.exports = MoneyValidator;