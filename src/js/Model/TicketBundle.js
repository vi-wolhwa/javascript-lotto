import messenger from "../Messenger.js";
import {
  ELEMENT,
  ERROR_MESSAGE,
  MESSAGE,
  STANDARD_NUMBER,
} from "../Util/constants.js";
import { $$ } from "../Util/querySelector.js";
import { isValidNumbers } from "../Util/validator.js";

class TicketBundle {
  constructor() {
    this.init();
    this.addMessageListeners();
  }

  init() {
    this.ticketBundle = [];
  }

  addMessageListeners() {
    messenger.addMessageListener(
      MESSAGE.AUTO_NUMBER_PURCHASE_BUTTON_CLICKED,
      this.addRandomNumbers.bind(this)
    );

    messenger.addMessageListener(
      MESSAGE.MANUAL_NUMBER_PURCHASE_BUTTON_CLICKED,
      this.addManualNumbers.bind(this)
    );

    messenger.addMessageListener(
      MESSAGE.PURCHASE_PAYMENT_BUTTON_CLICKED,
      this.addRandomNumbersAsBalance.bind(this)
    );

    messenger.addMessageListener(
      MESSAGE.WINNING_NUMBER_SET,
      this.passTicketBundle.bind(this)
    );

    messenger.addMessageListener(
      MESSAGE.RESTART_BUTTON_CLICKED,
      this.init.bind(this)
    );
  }

  passTicketBundle() {
    messenger.dispatchMessage(MESSAGE.TICKET_BUNDLE_PASSED, {
      ticketBundle: this.ticketBundle,
    });
  }

  addRandomNumbersAsBalance({ balance }) {
    [...Array(balance)].forEach(() => this.addRandomNumbers());

    messenger.dispatchMessage(MESSAGE.TICKET_ADDED_AS_BALANCE, {
      tickets: this.ticketBundle,
    });
  }

  addRandomNumbers() {
    this.ticketBundle.push(this.generateRandomNumbers());
  }

  addManualNumbers() {
    try {
      const manualNumbers = this.generateManualNumbers();

      this.ticketBundle.push(manualNumbers);
      messenger.dispatchMessage(MESSAGE.MANUAL_NUMBERS_CREATED);
    } catch (error) {
      console.log(error);
      messenger.dispatchMessage(MESSAGE.MANUAL_NUMBERS_NOT_CREATED);
    }
  }

  generateRandomNumbers() {
    const numbers = Array.from(
      { length: STANDARD_NUMBER.LOTTO_MAX_NUMBER },
      (_, i) => i + 1
    );

    numbers.sort(() => Math.random() - Math.random());

    return numbers
      .slice(0, STANDARD_NUMBER.TICKET_NUMBER_LENGTH)
      .sort((a, b) => a - b);
  }

  generateManualNumbers() {
    const manualNumbers = Array.from($$(ELEMENT.MANUAL_NUMBER)).map(
      (number) => number.value
    );

    if (!isValidNumbers(manualNumbers))
      throw new Error(ERROR_MESSAGE.INVALID_NUMBER);

    return manualNumbers.map((number) => Number(number));
  }
}

export default TicketBundle;