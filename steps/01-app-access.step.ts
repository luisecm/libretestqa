import { When, Then } from "@cucumber/cucumber";
import { BrowserContext, Page, test as baseTest } from "@playwright/test";

When(/^the user accepts notifications$/, async function () {});

When(/^the user clicks the switch network button$/, async function () {});

When(/^the user confirms the switch network$/, async function () {});

Then(/^the page shows the account address$/, async function () {});

Then(/^the page shows the input address field$/, async function () {});

Then(/^the page doesn't show a network error message$/, async function () {});

Then(/^the page shows a network error message$/, async function () {});

Then(/^the page shows the switch network button$/, async function () {});

Then(/^the page doesn't show the input address field$/, async function () {});
