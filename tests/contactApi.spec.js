// import { test, expect } from "@playwright/test";
// import { ContactPage } from "../pageObject/contact.po.js";
// import {
//   authenticateUser,
//   createEntity,
//   getEntity,
//   deleteEntity,
//   validateEntity,
// } from "../utils/helper.spec.js";

// test.describe("Contact Form Tests", () => {
//   test("Contact Edit Test (Login + API + UI) - Select First Row with Wait", async ({
//     page,
//     request,
//   }) => {
//     const testData = {
//       firstName: "JohnTest123",
//       lastName: "DoeTest123",
//       birthdate: "1990-05-15",
//       email: "johntest123@example.com",
//       phone: "1234567890",
//       street1: "123 Test St",
//       street2: "Suite 100",
//       city: "Testville",
//       stateProvince: "TS",
//       postalCode: "T3S7T1",
//       country: "Testland",
//     };

//     const username = "atulmzn1@gmail.com";
//     const password = "AEK829e4jeqPf@";

//     console.log("🟢 Logging in via UI...");
//     await page.goto("https://thinking-tester-contact-list.herokuapp.com/");
//     await page.locator("#email").fill(username);
//     await page.locator("#password").fill(password);
//     await page.locator("#submit").click();

//     await expect(page).toHaveURL(
//       "https://thinking-tester-contact-list.herokuapp.com/contactList"
//     );
//     console.log("🟢 Successfully logged in and on contactList page");

//     console.log("🟢 Authenticating user via API...");
//     const token = await authenticateUser(username, password, { request });
//     console.log("Token:", token);

//     console.log("🟢 Creating contact via API...");
//     const contactResponse = await createEntity(testData, token, "/contacts", {
//       request,
//     });
//     const contactId = contactResponse._id;
//     console.log(`Created contact with ID: ${contactId}`);

//     console.log("🟢 Navigating to contact list page...");
//     await page.waitForTimeout(1000); // Optional: wait for a second before navigating
//     await page.goto(
//       "https://thinking-tester-contact-list.herokuapp.com/contactList"
//     );

//     // Wait for a specific element that indicates the page has loaded
//     await expect(page.locator("h1")).toHaveText("Contact List");
//     console.log("🟢 Contact List page loaded successfully.");

//     // Reload the page to ensure the latest data is fetched
//     await page.reload();

//     console.log("🟢 Waiting for contacts table rows to appear...");
//     try {
//       await page.waitForSelector("table tbody tr", { timeout: 30000 });
//       console.log("🟢 Contacts table rows are visible.");
//     } catch (error) {
//       console.error("🛑 Error: Contacts table rows did not appear in time.");
//       throw error; // Rethrow the error to fail the test
//     }

//     const rowsCount = await page.locator("table tbody tr").count();
//     console.log(`Contact rows count on page: ${rowsCount}`);

//     if (rowsCount === 0) {
//       console.error(
//         "No contacts found in the table. Check if the contact was created successfully."
//       );
//       return; // Exit the test if no contacts are found
//     }

//     const contactPage = new ContactPage(page);

//     const firstNameText = await contactPage.firstContactRow.textContent();
//     console.log("First contact first name text:", firstNameText);

//     console.log("🟢 Selecting the first contact row directly...");
//     await contactPage.firstContactRow.click();

//     await page.waitForURL("**/contactDetails");
//     console.log("🟢 Navigated to contactDetails page for first contact");

//     console.log("🟢 Editing contact via UI...");
//     await contactPage.contactEdit("JohnHero");

//     console.log("🟢 Verifying updated name via API...");
//     const updatedContact = await getEntity(
//       token,
//       "/contacts",
//       contactId,
//       "200",
//       { request }
//     );
//     expect(updatedContact.firstName).toBe("JohnHero");

//     console.log("🟢 Cleaning up contact...");
//     await deleteEntity(token, "/contacts", contactId, { request });
//     await validateEntity(token, `/contacts/${id}`, "404", { request });
//   });
//   test("Contact Add test", async ({ page, request }) => {
//     const contact = new ContactPage(page);
//     await contact.contactAdd(
//       contactTestData.contact.firstName,
//       contactTestData.contact.lastName,
//       contactTestData.contact.birthdate,
//       contactTestData.contact.email,
//       contactTestData.contact.phone,
//       contactTestData.contact.street1,
//       contactTestData.contact.street2,
//       contactTestData.contact.city,
//       contactTestData.contact.stateProvince,
//       contactTestData.contact.postalCode,
//       contactTestData.contact.country
//     );
//     await contact.viewContact();
//     await contact.validateCOntactCrated(
//       contactTestData.contact.firstName,
//       contactTestData.contact.lastName,
//       contactTestData.contact.birthdate,
//       contactTestData.contact.email,
//       contactTestData.contact.phone,
//       contactTestData.contact.street1,
//       contactTestData.contact.street2,
//       contactTestData.contact.city,
//       contactTestData.contact.stateProvince,
//       contactTestData.contact.postalCode,
//       contactTestData.contact.country
//     );
// const token = await authenticateUser("atulmzn1@gmail.com", "AEK829e4jeqPf@", {
//   request,
// });
// const id = await getEntity(
//   token,
//   "/contacts",
//   contactTestData.contact.firstName,
//   "200",
//   { request }
// );
// await deleteEntity(token, "/contacts", id._id, { request });
// await validateEntity(token, `/contacts/${id._id}`, "404", { request });
//   });
// });
import { test } from "@playwright/test";
import { TestPage } from "../pageObject/contact.po";
const { authenticateUser, createEntity } = require("../utils/helper.spec");

let accessToken;

test.describe.configure({ timeout: 60000 }); // 60 sec timeout

test.beforeEach(async ({ page }) => {
  await page.goto("https://thinking-tester-contact-list.herokuapp.com/login", {
    waitUntil: "domcontentloaded",
  });
  const username = "atulmzn1@gmail.com";
  const password = "AEK829e4jeqPf@";
  const testPage = new TestPage(page);
  await testPage.login(username, password);
  await testPage.verifyValidLogin();
});

test.describe("Contact test cases", () => {
  test("Add contact", async ({ page }) => {
    const testPage = new TestPage(page);
    await testPage.addNewContact(
      "username",
      "username",
      "1111-11-11",
      "abc@abc.com",
      "1111111111",
      "username",
      "username",
      "username",
      "username",
      "44600",
      "username"
    );
    await testPage.validateContactCreated(
      "username",
      "username",
      "1111-11-11",
      "abc@abc.com",
      "1111111111",
      "username",
      "username",
      "username",
      "username",
      "44600",
      "username"
    );
  });

  test("Manual - Edit contact", async ({ page }) => {
    const testPage = new TestPage(page);
    await testPage.addNewContact(
      "username11",
      "username1",
      "1111-11-11",
      "abc11@abc.com",
      "1111111111",
      "username1",
      "username1",
      "username1",
      "username1",
      "44600",
      "username1"
    );
    await testPage.validateContactCreated(
      "username11",
      "username1",
      "1111-11-11",
      "abc11@abc.com",
      "1111111111",
      "username1",
      "username1",
      "username1",
      "username1",
      "44600",
      "username1"
    );
    await testPage.editContact(
      "abc11@abc.com",
      "johneditedusername1",
      "editedusername1",
      "1111-11-11",
      "editedabc1@abc.com",
      "1111111111",
      "username1",
      "editedusername1",
      "username1",
      "username1",
      "44600",
      "editedusername1"
    );
    await testPage.validateContactCreated(
      "johneditedusername1",
      "editedusername1",
      "1111-11-11",
      "editedabc1@abc.com",
      "1111111111",
      "username1",
      "editedusername1",
      "username1",
      "username1",
      "44600",
      "editedusername1"
    );
  });

  test.only("API - Contact Edit test", async ({ page, request }) => {
    const data = {
      firstName: "testJohn",
      lastName: "testJohnDoe",
      birthdate: "1990-01-20",
      email: "testJohnjohndoe@gmail.com",
      phone: "98123345678",
      strret1: "Address1",
      city: "City1",
      stateProvince: "State1",
      postalCode: "12345",
      country: "Nepal",
    };

    const testPage = new TestPage(page);
    accessToken = await authenticateUser(
      "atulmzn1@gmail.com",
      "AEK829e4jeqPf@",
      { request }
    );
    await createEntity(data, accessToken, "/contacts", { request });

    await page.reload();
    await testPage.editContact(
      "testJohnjohndoe@gmail.com",
      "johneditedusername1",
      "editedusername1",
      "1111-11-11",
      "editedabc1@abc.com",
      "1111111111",
      "username1",
      "editedusername1",
      "username1",
      "username1",
      "44600",
      "editedusername1"
    );
    await testPage.validateContactCreated(
      "johneditedusername1",
      "editedusername1",
      "1111-11-11",
      "editedabc1@abc.com",
      "1111111111",
      "username1",
      "editedusername1",
      "username1",
      "username1",
      "44600",
      "editedusername1"
    );
  });
});
