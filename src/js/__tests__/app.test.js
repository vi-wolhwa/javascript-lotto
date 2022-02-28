import Lotto from "../model/Lotto.js";
import LottoGame from "../model/LottoGame.js";
import { isValidAmountUnit, isValidMinimumAmount } from "../utils/validation.js";

describe("로또 게임 테스트", () => {
  test("6개 숫자를 가지는 로또 인스턴스를 생성할 수 있다.", () => {
    const lotto = new Lotto();
    lotto.generateRandomNumber();
    expect(lotto.numbers.length).toBe(6);
  });

  test("구입한 개수 만큼 로또 객체가 만들어 진다.", () => {
    const lottoCount = 5;
    const lottoGame = new LottoGame();
    lottoGame.generateLottoTicket(lottoCount);
    expect(lottoGame.getLottoCount()).toBe(lottoCount);
  });

  test("구입할 금액은 1000원 이상이여야 한다.", () => {
    const amount = 500;
    expect(isValidMinimumAmount(amount)).toBe(false);
  });

  test("구입할 금액 단위는 1000원 이어야 한다.", () => {
    const amount = 2200;
    expect(isValidAmountUnit(amount)).toBe(false);
  });
});