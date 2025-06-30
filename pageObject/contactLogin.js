import { expect } from "@playwright/test";

export class LoginFunction {
  constructor(page) {
    this.page = page;
    this.email = page.locator('//input[@id="email"]');
    this.password = page.locator('//input[@id="password"]');
    this.signinbutton = page.locator('//button[@id="submit"]');
    this.addContactButton = page.locator('//button[@id="add-contact"]');
  }

  async login(useremail, userpassword) {
    await this.page.goto("https://thinking-tester-contact-list.herokuapp.com/");
    await expect(this.email).toBeVisible();
    await this.email.fill(useremail);

    await expect(this.password).toBeVisible();
    await this.password.fill(userpassword);

    await expect(this.signinbutton).toBeVisible();
    await this.signinbutton.click();
  }

  async verifyLogin() {
    await expect(this.page.locator("h1")).toHaveText("Contact List");

    console.log("✅ Login successful");
  }

  async goToAddContact() {
    await expect(this.addContactButton).toBeVisible();
    await this.addContactButton.click();
  }
}
