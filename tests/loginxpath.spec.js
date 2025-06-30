import { test, expect } from "@playwright/test";

test("Login Form Check - EMIS PORTAL", async ({ page }) => {
  await page.goto("http://110.44.113.165:85/EMISPortal/Login.aspx");

  // Login
  await expect(page.locator('input[name="txtUserName"]')).toBeVisible();
  await page.fill('input[name="txtUserName"]', "NCCSCSIT454");
  await expect(page.locator('input[name="txtPassword"]')).toBeVisible();
  await page.fill('input[name="txtPassword"]', "atullya123321");
  await expect(page.locator('input[name="btnSignIn"]')).toBeVisible();
  await page.click('input[name="btnSignIn"]');

  // // Navigate to Academic > Library
  // const academicClick = page.getByText("Academic").first();
  // await expect(academicClick).toBeVisible();
  // await academicClick.click();

  // const libraryclick = page.getByText("Library").first(); // safer disambiguation
  // await expect(libraryclick).toBeVisible();
  // await libraryclick.click();

  // // Click on Study Material
  // const studyMaterialClick = page
  //   .getByText("Study Material", { exact: true })
  //   .first();
  // await expect(studyMaterialClick).toBeVisible();
  // await studyMaterialClick.click();

  // const selectNotes = page.locator(
  //   '//select[@id="ContentPlaceHolder1_ddlSubject"]'
  // );
  // await expect(selectNotes).toBeVisible();
  // await selectNotes.click();

  // const advanceJava = page.locator(
  //   '//option[text()="Advance Java Programming"]'
  // );
  // await expect(advanceJava).toBeVisible();
  // await advanceJava.click();

  await page.waitForTimeout(10000); // Optional, for visual debugging
});
test("Invalid Login - EMIS PORTAL", async ({ page }) => {
  await page.goto("http://110.44.113.165:85/EMISPortal/Login.aspx");

  // Invalid credentials
  await page.fill('input[name="txtUserName"]', "invaliduser");
  await page.fill('input[name="txtPassword"]', "wrongpassword");
  await page.click('input[name="btnSignIn"]');

  // Expect an error message to be visible
  const errorMessage = page.locator("text=Invalid Username or Password"); // Adjust based on actual message
  await expect(errorMessage).toBeVisible();

  await page.waitForTimeout(5000); // Optional
});
