import { test, expect } from "@playwright/test";
import { ContactPage } from "../pageObject/contact.po";
import { LoginFunction } from "../pageObject/contactLogin.js";
import {
  authenticateUser,
  createEntity,
  contactEdit,
  getEntity,
  deleteEntity,
} from "../utils/helper.spec.js";

const testData = require("../fixtures/contactFixture.json");
const contactData = require("../fixtures/contactFixture.json");
let accessToken;
test.describe("Contact Form Tests", () => {
  test("Login, Add New Contact and Verify", async ({ page }) => {
    const login = new LoginFunction(page);
    const contactPage = new ContactPage(page);

    // Step 1: Login
    await login.login("atulmzn1@gmail.com", "AEK829e4jeqPf@");
    await login.verifyLogin();

    // Step 2: Click on Add a New Contact button
    const addContactButton = page.locator('//button[@id="add-contact"]');
    await expect(addContactButton).toBeVisible();
    await addContactButton.click();

    // Step 3: Fill contact form and submit
    await contactPage.fillContactForm(contactData.validUser);

    // Step 4: Go back to contact list to verify
    await page.waitForTimeout(1000); // wait for redirect or manual nav
    await page.goto(
      "https://thinking-tester-contact-list.herokuapp.com/contactList"
    );
    await expect(page.locator("h1")).toHaveText("Contact List");
    await contactPage.verifyContactAdded(
      contactData.validUser.firstName,
      contactData.validUser.lastName
    );
    await contactPage.goToContactList();
    await contactPage.editContact(contactData.editUser);

    await page.waitForTimeout(1000); // wait for redirect or manual nav
    await page.goto(
      "https://thinking-tester-contact-list.herokuapp.com/contactList"
    );
    await expect(page.locator("h1")).toHaveText("Contact List");
    await contactPage.deleteContact();
  });

  // test.only("Contanct Edit Test", async ({ page, request }) => {
  //   const Data = {
  //     firstName: "Amy",
  //     lastName: "Miller",
  //     birthdate: "1992-02-02",
  //     email: "amiller@fake.com",
  //     phone: "8005554242",
  //     street1: "13 School St.",
  //     street2: "Apt. 5",
  //     city: "Washington",
  //     stateProvince: "QC",
  //     postalCode: "A1A1A1",
  //     country: "Canada",
  //   };
  //   const contact = new ContactPage(page);
  //   accessToken = await authenticateUser(
  //     "atulmzn1@gmail.com",
  //     "AEK829e4jeqPf@",
  //     { request }
  //   );
  //   await createEntity(Data, accessToken, "/contacts", { request });
  //   await page.goto(
  //     "https://thinking-tester-contact-list.herokuapp.com/contactList"
  //   );
  //   await contact.viewContact();
  //   await contact.contactEdit("PukarHero");
  //   const id = await getEntity(accessToken, "/contacts", "200", { request });
  //   await deleteEntity(accessToken, `/contacts/${id}`, id._id, { request });
  // });
});
// import { test, expect } from "@playwright/test";
// import { ContactPage } from "../pageObject/contact.po.js";
// import {
//   authenticateUser,
//   createEntity,
//   getEntity,
//   deleteEntity,
// } from "../utils/helper.spec.js";
// const testData = require("../fixtures/contactFixture.json");
// const contactData = require("../fixtures/contactFixture.json");
// test.describe("Contact Form Tests", () => {
//   test.only("Contact Edit Test (API + UI)", async ({ page, request }) => {
//     const testData = {
//       firstName: "Amy",
//       lastName: "Miller",
//       birthdate: "1992-02-02",
//       email: "amiller@fake.com",
//       phone: "8005554242",
//       street1: "13 School St.",
//       street2: "Apt. 5",
//       city: "Washington",
//       stateProvince: "QC",
//       postalCode: "A1A1A1",
//       country: "Canada",
//     };

//     // Authenticate and create contact
//     const token = await authenticateUser(
//       "atulmzn1@gmail.com",
//       "AEK829e4jeqPf@",
//       { request }
//     );
//     await page.waitForTimeout(5000);

//     // const contactResponse = await createEntity(testData, token, "/contacts", {
//     //   request,
//     // });
//     // const contactId = contactResponse._id;

//     // Go to UI and edit contact
//     await page.goto(
//       "https://thinking-tester-contact-list.herokuapp.com/contactList"
//     );
//     const contactPage = new ContactPage(page);
//     await contactPage.viewContact();
//     await contactPage.fillContactForm(testData);
//     await contactPage.contactEdit("PukarHero");

//     // // Verify via API
//     // const updatedContact = await getEntity(
//     //   token,
//     //   "/contacts",
//     //   contactId,
//     //   "200",
//     //   { request }
//     // );
//     // expect(updatedContact.firstName).toBe("PukarHero");

//     // // Cleanup
//     // await deleteEntity(token, "/contacts", contactId, { request });
//   });
// });
