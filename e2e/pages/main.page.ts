import { type Page, type Locator } from "@playwright/test";
import BasePage from "./base.page";

export default class HomePage extends BasePage {
  readonly path: string;
  readonly depositHistoryTable: Locator;
  readonly depositTokenError: Locator;
  readonly getMoreTokensText: Locator;
  readonly inputAddress: Locator;
  readonly instructionText: Locator;
  readonly metaMaskConnector: Locator;
  readonly pageContent: Locator;

  constructor(page: Page) {
    super(page);
    this.path = "/";
    this.depositHistoryTable = page.getByTestId(
      "DepositHistory__Table__history"
    );
    this.depositTokenError = page.getByTestId("DepositToken__Div__error");
    this.getMoreTokensText = page.getByTestId(
      "TokenBalance__Div__getMoreExampleTokensAction"
    );
    this.inputAddress = page.getByTestId(
      "InputAddress__Span__exampleTokenLink"
    );
    this.instructionText = page.getByText(
      " Enter the address of the ERC20 token"
    );
    this.metaMaskConnector = page.getByTestId(
      "MetaMaskConnector__Div__connect"
    );
    this.pageContent = page.getByTestId("AppPage__Div__content");
  }

  async navigate(): Promise<void> {
    await super.navigate(this.path);
  }

  async getWalletNotConnectedText(): Promise<string> {
    const text = (await this.metaMaskConnector.textContent()) as string;
    return text;
  }
}
