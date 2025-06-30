import { test, expect } from "@playwright/test";

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="txtUserName"]');
    this.passwordInput = page.locator('input[name="txtPassword"]');
    this.signInButton = page.locator('input[name="btnSignIn"]');
    this.errorMessage = page.locator("text=Invalid Username or Password");
    this.alertMessage = page.locator('div[class="alert alert-danger"]');
  }
  async logintoEMIS(username, password) {
    await this.page.goto("http://110.44.113.165:85/EMISPortal/Login.aspx");

    await expect(this.usernameInput).toBeVisible();
    await this.usernameInput.fill(username);

    await expect(this.passwordInput).toBeVisible();
    await this.passwordInput.fill(password);

    await expect(this.signInButton).toBeVisible();
    await this.signInButton.click();
  }

  async verifyValidLogin() {
    const logoImage = this.page.locator("//html/body/form/header/div/a/img");

    // Optional: wait explicitly
    await this.page.waitForTimeout(2000);

    // Debug info
    const count = await logoImage.count();
    console.log(`Logo element count: ${count}`);

    // Optional: take screenshot for visual debug
    await this.page.screenshot({ path: "login-page.png", fullPage: true });

    // Assertion
    await expect(logoImage).toBeVisible({ timeout: 5000 });
    console.log("Login successful, logo is visible.");
  }
  async verifyInvalidLogin() {
    await expect(this.page).toHaveURL(
      "http://110.44.113.165:85/EMISPortal/Login.aspx"
    );
    console.log("Login failed, user remained on the login page.");
  }
};
