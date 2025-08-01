import { test, expect } from "../fixtures/pomFixture";


test.describe("Dapp Demo Tests", () => {
  test.beforeEach(async ({ mainPage }) => {
    await mainPage.navigate();
    await mainPage.connectWallet();
  });

  test("Connecting Wallet to the application is successful", async ({
    mainPage,
  }) => {
    const connectedWalletAddress = await mainPage.getConnectedWalletAddress();
    await expect(connectedWalletAddress).
    /*const connectedAddressMetamask = await metamask.getWalletAddress();
    expect(connectedAddressMetamask).toEqual(connectedWalletAddress);
    await expect(mainPage.btnConnect).not.toBeVisible();
    await expect(mainPage.textWalletNotConnected).not.toBeVisible();
    await expect(mainPage.btnAddCitizenHeader).toBeVisible();
    expect(await mainPage.getAddCitizenHeaderButtonText()).toEqual(
      mainPage.addCitizenButtonTextExpected
    );
    expect(await mainPage.getTotalRecordsCount()).not.toEqual(0);
    await expect(mainPage.tableCitizens).toBeVisible();*/
  });
});
