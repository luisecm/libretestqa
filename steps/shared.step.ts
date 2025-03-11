import { Given, When } from "@cucumber/cucumber";
import MainPage from "../pages/main.page";
import { BrowserContext, Page, test as baseTest } from "@playwright/test";
import dappwright, { Dappwright, MetaMaskWallet } from "@tenkeylabs/dappwright";

export const test = baseTest.extend<{
  context: BrowserContext;
  wallet: Dappwright;
}>({
  context: async ({}, use) => {
    // Launch context with extension
    const [wallet, _, context] = await dappwright.bootstrap("", {
      wallet: "metamask",
      version: MetaMaskWallet.recommendedVersion,
      seed: process.env.SEED_PHRASE,
      headless: false,
    });
    await use(context);
  },

  wallet: async ({ context }, use) => {
    const metamask = await dappwright.getWallet("metamask", context);
    await use(metamask);
  },
});

Given(
  /^A user with metamask installed connected to sepolia network$/,
  { timeout: 20 * 1000 },
  async function ({ wallet }) {
    await wallet.switchNetwork("Sepolia");
  }
);

Given(
  /^A user with metamask installed connected to Mainnet network$/,
  { timeout: 20 * 1000 },
  async function ({ wallet }) {
    await wallet.switchNetwork("MainNet");
  }
);

When(/^the user accesses the app page$/, async function (page) {
  const mainPage = new MainPage(page);
  await mainPage.navigate();
});

When(
  /^the user enters the address {string} in the input address field$/,
  async function (page: Page) {
    const mainPage = new MainPage(page);
    await mainPage.inputAddress.fill("0x9982f9A3bA28c");
  }
);

When(/^the user clicks the Submit button$/, async function (page: Page) {
  const mainPage = new MainPage(page);
  await mainPage.btnSubmitAddress.click();
});

When(/^the user clicks the example token link$/, async function (page: Page) {
  const mainPage = new MainPage(page);
  await mainPage.spanExampleTokenLink.click();
});
