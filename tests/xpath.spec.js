import { test, expect } from "@playwright/test";

test("DemoQA Form - Full Automation using XPath Axes", async ({ page }) => {
  test.setTimeout(60000);

  // Step 1: Navigate to the form
  await page.goto("https://demoqa.com/automation-practice-form");

  // Remove ads/footers
  await page.evaluate(() => {
    document.querySelectorAll('#fixedban, footer').forEach(el => el.remove());
  });

  // Step 2: Fill Basic Info
  await page.locator('//input[@id="firstName"]').fill("John");
  await page.locator('//input[@id="lastName"]').fill("Doe");
  await page.locator('//label[text()="Male"]/preceding::input[@type="email"]').fill("john.doe@example.com");

  // Step 3: Gender selection
  await page.locator('//label[text()="Male"]').click();

  // Step 4: Mobile number using following axis
  await page.locator('//input[@id="userEmail"]/following::input[@id="userNumber"]').fill("9876543210");

  // Step 5: Date of Birth using child and descendant axes
  await page.locator('//input[@id="dateOfBirthInput"]').click();
  await page.locator('//div[@class="react-datepicker__month-container"]/child::div/select[contains(@class,"month-select")]').selectOption("5");
  await page.locator('//div[@class="react-datepicker__month-container"]//descendant::select[@class="react-datepicker__year-select"]').selectOption("1995");
  await page.locator('//div[contains(@class,"react-datepicker__day--010")]').click();

  // Step 6: Subjects input
  await page.locator('//input[@id="subjectsInput"]').fill("Maths");
  await page.keyboard.press("Enter");

  // Step 7: Hobbies
  await page.locator('//label[text()="Reading"]').click();
  await page.locator('//label[text()="Music"]').click();

  // Step 8: Upload file (uses Playwright test file path)
  await page.setInputFiles('//input[@id="uploadPicture"]', 'tests/test-files/sample.jpg');

  // Step 9: Address
  await page.locator('//textarea[@id="currentAddress"]').fill("123 Main St, City, Country");

  // Step 10: Select State and City using following-sibling axis
  await page.locator('//div[text()="Select State"]/following-sibling::div').click();
  await page.locator('//div[text()="NCR"]').click();

  await page.locator('//div[text()="Select City"]/following-sibling::div').click();
  await page.locator('//div[text()="Delhi"]').click();

  // Step 11: Submit the form
  await page.locator('//button[text()="Submit"]').scrollIntoViewIfNeeded();
  await page.locator('//button[text()="Submit"]').click();

  // Step 12: Validate modal popup using ancestor
  const modalTitle = page.locator('//div[text()="Thanks for submitting the form"]/ancestor::div[contains(@class,"modal-content")]');
  await expect(modalTitle).toBeVisible();

  // Step 13: Close the modal
  await page.locator('//button[text()="Close"]').click();
});
