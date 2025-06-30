import { test, expect } from "@playwright/test";
import { LoginPage } from "../pageObject/login.po.js";
const testData = require("../fixtures/loginFIxture.json");
test.beforeEach(async ({ page }) => {
  await page.goto("/"); // Navigate to the base URL defined in playwright.config.js
});

test.describe("Login Tests", () => {
  test("Valid Login - EMIS PORTAL", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.logintoEMIS(
      testData.validUser.userName,
      testData.validUser.password
    );
    await loginPage.verifyValidLogin();
    // Add assertions to verify successful login, e.g., check for a specific element on the dashboard
    // await expect(page.getByText("Dashboard")).toBeVisible();
  });

  test("Invalid Login - EMIS PORTAL", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.logintoEMIS(
      testData.invalidUser.userName,
      testData.invalidUser.password
    );
    await loginPage.verifyInvalidLogin();
  });
});
