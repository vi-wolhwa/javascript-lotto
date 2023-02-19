const { ERROR_MESSAGE } = require('../../constant/message');
const { LOTTO } = require('../../constant/setting');

const isOutOfRange = (lottoNumber) =>
  lottoNumber < LOTTO.MIN_NUMBER_RANGE || lottoNumber > LOTTO.MAX_NUMBER_RANGE;

const validateLottoNumber = (lottoNumber) => {
  if (isOutOfRange(lottoNumber)) {
    throw new Error(ERROR_MESSAGE.OUT_OF_RANGE);
  }
};

module.exports = validateLottoNumber;