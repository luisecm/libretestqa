import { type Page, type Locator, expect } from "@playwright/test";

export default class MainPage {
  readonly page: Page;
  readonly divConnectedAddress: Locator;
  readonly divError: Locator;
  readonly btnConnect: Locator;
  readonly inputAddressForm: Locator;
  readonly inputAddress: Locator;
  readonly btnSubmitAddress: Locator;
  readonly spanExampleTokenLink: Locator;
  readonly labelInputAddress: Locator;

  constructor(page: Page) {
    this.page = page;
    this.divConnectedAddress = this.page.getByTestId(
      "MetaMaskConnector__Div__connect"
    );
    this.divError = this.page.getByTestId("MetaMaskConnector__Div__error");
    this.btnConnect = this.page.getByTestId(
      "MetaMaskConnector__Button__connect"
    );
    this.inputAddressForm = this.page.getByTestId(
      "InputAddress__Form__address"
    );
    this.inputAddress = this.page.getByTestId(
      "InputAddress__Input__addressValue"
    );
    this.btnSubmitAddress = this.page.getByTestId(
      "InputAddress__Button__submit"
    );
    this.spanExampleTokenLink = this.page.getByTestId(
      "InputAddress__Span__exampleTokenLink"
    );
    this.labelInputAddress = this.page.getByText(
      "Enter the address of the ERC20 token"
    );
  }

  async navigate(): Promise<void> {
    await this.page.goto("/");
  }

  async connectWallet(): Promise<void> {
    await this.page.reload();
  }

  async getConnectedWalletAddress(): Promise<string> {
    const divText = (await this.divConnectedAddress.textContent()) as string;
    const match = divText.match(/0x[a-fA-F0-9]{40}/);
    let walletAddress: string = "";
    if (match) {
      walletAddress = match[0];
    } else {
      console.log("No Ethereum address found in the string.");
    }
    return walletAddress;
  }

  async getConnectButtonText(): Promise<string> {
    const buttonText = (await this.btnConnect.textContent()) as string;
    return buttonText;
  }

  async validateHomePageLayoutWalletConnected({
    connectedAddressMetamask,
    connectedAddressApp,
  }: {
    connectedAddressMetamask: string;
    connectedAddressApp: string;
  }): Promise<void> {
    expect
      .soft(connectedAddressApp.toLowerCase())
      .toEqual(connectedAddressMetamask.toLowerCase());
    await expect.soft(this.inputAddressForm).toBeVisible();
    await expect.soft(this.inputAddress).toBeVisible();
    await expect.soft(this.btnSubmitAddress).toBeVisible();
    await expect.soft(this.btnSubmitAddress).toBeDisabled();
    await expect.soft(this.labelInputAddress).toBeVisible();
    await expect.soft(this.spanExampleTokenLink).toBeVisible();
  }
}
