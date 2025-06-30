import { test, expect } from "@playwright/test";

test("Facebook - Create New Account form auto-click and fill", async ({ page }) => {
  test.setTimeout(60000); // Extend timeout for slower page load

  await page.goto("https://www.facebook.com/");

  // Auto-click "Create New Account"
  const createBtn = page.getByRole("button", { name: "Create new account" });
  await createBtn.click();

  // Wait for the signup modal to appear
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Sign Up" })).toBeVisible();

  // Fill form fields
  await page.getByPlaceholder("First name").fill("John");
  await page.getByPlaceholder("Surname").fill("Doe");

  await page.locator('input[name="reg_email__"]').fill("john.doe123@example.com");
  await page.locator('input[name="reg_email_confirmation__"]').fill("john.doe123@example.com");

  await page.locator('input[name="reg_passwd__"]').fill("TestPass123");

  await page.locator('select[name="birthday_day"]').selectOption("10");
  await page.locator('select[name="birthday_month"]').selectOption("6");
  await page.locator('select[name="birthday_year"]').selectOption("1995");

  await page.locator('input[value="2"]').check(); // Male
});
