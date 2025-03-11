import { type Page, type Locator } from "@playwright/test";

export default class BalancePage {
  readonly page: Page;
  readonly divSelectedToken: Locator;
  readonly divBalanceInfo: Locator;
  readonly tableDepositHistory: Locator;
  readonly balanceTokens: Locator;
  readonly divDepositError: Locator;
  readonly btnDeposit: Locator;
  readonly inputDepositAmount: Locator;
  readonly btnMintTokens: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators
    this.divSelectedToken = this.page.getByText("Selected token: ");
    this.divBalanceInfo = this.page.getByTestId(
      "TokenBalance__Div__balanceInfo"
    );
    this.tableDepositHistory = this.page.getByTestId(
      "DepositHistory__Table__history"
    );
    this.balanceTokens = this.page.getByTestId(
      "TokenBalance__Div__balanceAmount"
    );
    this.divDepositError = this.page.getByTestId("DepositToken__Div__error");
    this.btnDeposit = this.page.getByTestId("DepositToken__Button__deposit");
    this.inputDepositAmount = this.page.getByTestId(
      "DepositToken__Input__depositAmount"
    );
    this.btnMintTokens = this.page.getByTestId(
      "TokenBalance__Div__getMoreExampleTokensAction"
    );
  }

  async getSelectedTokenAddress(): Promise<string> {
    const text = (await this.divSelectedToken.textContent()) as string;
    const match = text.match(/0x[a-fA-F0-9]{40}/);
    let tokenAddress: string = "";
    if (match) {
      tokenAddress = match[0];
    } else {
      console.log("No Ethereum address found in the string.");
    }
    return tokenAddress;
  }

  async getTokenBalance(): Promise<number> {
    const amountString = (await this.balanceTokens.textContent()) as string;
    return Number(amountString);
  }

  async mintExampleToken(): Promise<void> {
    await this.btnMintTokens.click();
  }

  async depositToken({ amount }: { amount: number }): Promise<void> {
    await this.inputDepositAmount.fill(amount.toString());
    await this.btnDeposit.click();
  }
}
