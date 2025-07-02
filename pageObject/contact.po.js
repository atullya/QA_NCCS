// import { expect } from "@playwright/test";

// export class ContactPage {
//   constructor(page) {
//     this.page = page;
//     this.firstName = page.locator("#firstName");
//     this.lastName = page.locator("#lastName");
//     this.dob = page.locator("#birthdate");
//     this.email = page.locator("#email");
//     this.phone = page.locator("#phone");
//     this.address1 = page.locator("#street1");
//     this.address2 = page.locator("#street2");
//     this.city = page.locator("#city");
//     this.province = page.locator("#stateProvince");
//     this.postalCode = page.locator("#postalCode");
//     this.country = page.locator("#country");
//     this.submitButton = page.locator("#submit");

//     this.editButtonClick = page.locator('//button[@id="edit-contact"]');
//     this.deleteButtonClick = page.locator("#delete");
//     this.firstContactRow = page.locator("//table/tbody/tr[1]/td[2]");
//   }

//   async fillContactForm(contact) {
//     const requiredFields = [
//       "firstName",
//       "lastName",
//       "birthdate",
//       "email",
//       "phone",
//       "street1",
//       "street2",
//       "city",
//       "stateProvince",
//       "postalCode",
//       "country",
//     ];

//     for (const field of requiredFields) {
//       if (!contact[field]) {
//         throw new Error(`❌ Missing required contact field: ${field}`);
//       }
//     }

//     await this.firstName.fill(contact.firstName);
//     await this.lastName.fill(contact.lastName);
//     await this.dob.fill(contact.birthdate);
//     await this.email.fill(contact.email);
//     await this.phone.fill(contact.phone);
//     await this.address1.fill(contact.street1);
//     await this.address2.fill(contact.street2);
//     await this.city.fill(contact.city);
//     await this.province.fill(contact.stateProvince);
//     await this.postalCode.fill(contact.postalCode);
//     await this.country.fill(contact.country);
//     await this.submitButton.click();
//   }

//   async contactEdit(newFirstName) {
//     await this.editButtonClick.click();
//     await this.firstName.fill(""); // Clear field
//     await this.firstName.fill(newFirstName);
//     await this.submitButton.click();
//     console.log("✅ Contact edited successfully");
//   }
//   async verifyContactAdded(firstName, lastName) {
//     const contactRow = this.page.locator(
//       `//table/tbody/tr/td[contains(text(),"${firstName}")]`
//     );
//     await expect(contactRow).toBeVisible({ timeout: 10000 });

//     const fullNameLocator = this.page.locator(
//       `//table/tbody/tr/td[contains(text(),"${firstName} ${lastName}")]`
//     );
//     await expect(fullNameLocator).toBeVisible({ timeout: 10000 });

//     console.log(
//       `✅ Contact "${firstName} ${lastName}" is visible in the list.`
//     );
//   }
//   async viewContact() {
//     await expect(this.page.locator("//h1")).toBeVisible();
//   }

//   contactRowByName(name) {
//     return this.page.locator(`//table/tbody/tr/td[contains(text(),"${name}")]`);
//   }

//   async selectContactByName(name) {
//     const contactRow = this.contactRowByName(name);
//     await expect(contactRow).toBeVisible({ timeout: 15000 });
//     await contactRow.click();
//     await this.page.waitForURL("**/contactDetails");
//     console.log(`🟢 Navigated to contactDetails page for "${name}"`);
//   }
//   async contactDelete() {
//     await this.page.waitForTimeout(1000); // wait for redirect or manual
//     this.page.once("dialog", async (dialog) => {
//       console.log("Dialog message:", dialog.message());
//       // delete.dismiss() to cancel in the pop up box
//       await dialog.accept();
//       console.log("Dialog accepted.");
//     });
//     await this.page.locator("#delete").click();
//   }
// }
import { expect } from "@playwright/test";

exports.TestPage = class TestPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = '//input[@id = "email"]';
    this.passwordInput = '//input[@id = "password"]';
    this.loginButton = '//button[@id = "submit"]';

    this.addNewContactButton = '//button[@id = "add-contact"]';

    this.firstName = '//input[@id = "firstName"]';
    this.lastName = '//input[@id = "lastName"]';
    this.birthdate = '//input[@id = "birthdate"]';
    this.email = '//input[@id = "email"]';
    this.phone = '//input[@id = "phone"]';
    this.street1 = '//input[@id = "street1"]';
    this.street2 = '//input[@id = "street2"]';
    this.city = '//input[@id = "city"]';
    this.stateProvince = '//input[@id = "stateProvince"]';
    this.postalCode = '//input[@id = "postalCode"]';
    this.country = '//input[@id = "country"]';
    this.submitButton = '//button[@id = "submit"]';

    this.savedFirstName = '//span[@id = "firstName"]';
    this.savedLastName = '//span[@id = "lastName"]';
    this.savedBirthdate = '//span[@id = "birthdate"]';
    this.savedEmail = '//span[@id = "email"]';
    this.savedPhone = '//span[@id = "phone"]';
    this.savedStreet1 = '//span[@id = "street1"]';
    this.savedStreet2 = '//span[@id = "street2"]';
    this.savedCity = '//span[@id = "city"]';
    this.savedStateProvince = '//span[@id = "stateProvince"]';
    this.savedPostalCode = '//span[@id = "postalCode"]';
    this.savedCountry = '//span[@id = "country"]';

    this.deleteButton = '//button[@id = "delete"]';
    this.editButton = '//button[@id= "edit-contact"]';
    this.saveEditButton = '//button[@id= "submit"]';
  }

  async login(username, password) {
    await this.page.locator(this.usernameInput).fill(username);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.locator(this.loginButton).click();
  }

  async verifyValidLogin() {
    await expect(this.page).toHaveURL("/contactList", { timeout: 10000 });
  }

  async addNewContact(
    firstName,
    lastName,
    birthdate,
    email,
    phone,
    street1,
    street2,
    city,
    stateProvince,
    postalCode,
    country
  ) {
    await this.page.locator(this.addNewContactButton).click();

    await this.page.locator(this.firstName).fill(firstName);
    await this.page.locator(this.lastName).fill(lastName);
    await this.page.locator(this.birthdate).fill(birthdate);
    await this.page.locator(this.email).fill(email);
    await this.page.locator(this.phone).fill(phone);
    await this.page.locator(this.street1).fill(street1);
    await this.page.locator(this.street2).fill(street2);
    await this.page.locator(this.city).fill(city);
    await this.page.locator(this.stateProvince).fill(stateProvince);
    await this.page.locator(this.postalCode).fill(postalCode);
    await this.page.locator(this.country).fill(country);

    await this.page.locator(this.submitButton).click();
    await this.page.waitForTimeout(2000);
    // await expect(this.page).toHaveURL("/contactList");
  }

  async validateContactCreated(
    firstName,
    lastName,
    birthdate,
    email,
    phone,
    street1,
    street2,
    city,
    stateProvince,
    postalCode,
    country
  ) {
    // await this.page.goto('/contactList');
    // await this.page.waitForTimeout(10000);
    // await expect(this.page.locator('body')).toContainText(firstName + " " + lastName);
    // await expect(this.page.locator('body')).toContainText(email);
    // await this.page.locator(`text=${email}`).first().click();

    await expect(this.page.locator(this.savedFirstName)).toHaveText(firstName);
    await expect(this.page.locator(this.savedLastName)).toHaveText(lastName);
    await expect(this.page.locator(this.savedBirthdate)).toHaveText(birthdate);
    await expect(this.page.locator(this.savedEmail)).toHaveText(email);
    await expect(this.page.locator(this.savedPhone)).toHaveText(phone);
    await expect(this.page.locator(this.savedStreet1)).toHaveText(street1);
    await expect(this.page.locator(this.savedStreet2)).toHaveText(street2);
    await expect(this.page.locator(this.savedCity)).toHaveText(city);
    await expect(this.page.locator(this.savedStateProvince)).toHaveText(
      stateProvince
    );
    await expect(this.page.locator(this.savedPostalCode)).toHaveText(
      postalCode
    );
    await expect(this.page.locator(this.savedCountry)).toHaveText(country);
  }

  async deleteContact(firstName, lastName, email) {
    await this.page.goto("/contactList");
    await expect(this.page.locator("body")).toContainText(
      firstName + " " + lastName
    );
    await expect(this.page.locator("body")).toContainText(email);
    await this.page.locator(`text=${email}`).first().click();

    await this.page.locator(this.deleteButton).click();

    // 1. Set up the dialog listener/waiter FIRST
    await this.page.waitForEvent("dialog", async (dialog) => {
      // Assertions for the message and type
      expect(dialog.message()).toBe(
        "Are you sure you want to delete this contact?"
      );
      expect(dialog.type()).toBe("confirm"); // Correct type for a dialog with OK/Cancel
      // Action: Accept the dialog (click OK)
      await dialog.accept();
    });

    // 2. THEN perform the action that triggers the dialog
    await this.page.locator(this.deleteButton).click();

    // await expect(this.page).toHaveURL("/contactList");
  }

  async validateDeleteContact() {}

  async editContact(
    previousEmail,
    firstName,
    lastName,
    birthdate,
    email,
    phone,
    street1,
    street2,
    city,
    stateProvince,
    postalCode,
    country
  ) {
    // await this.page.goto('/contactList');
    await this.page.locator(`text=${previousEmail}`).first().click();

    await this.page.locator(this.editButton).click();

    await this.page.locator(this.firstName).fill(firstName);
    await this.page.locator(this.lastName).fill(lastName);
    await this.page.locator(this.birthdate).fill(birthdate);
    await this.page.locator(this.email).fill(email);
    await this.page.locator(this.phone).fill(phone);
    await this.page.locator(this.street1).fill(street1);
    await this.page.locator(this.street2).fill(street2);
    await this.page.locator(this.city).fill(city);
    await this.page.locator(this.stateProvince).fill(stateProvince);
    await this.page.locator(this.postalCode).fill(postalCode);
    await this.page.locator(this.country).fill(country);

    await this.page.locator(this.saveEditButton).click();
    await this.page.waitForTimeout(2000);
    // await expect(this.page).toHaveURL("/contactDetails");
  }
  async contactDelete() {
    console.log("huhuhu");
    await this.page.waitForTimeout(1000); // wait for redirect or manual
    this.page.once("dialog", async (dialog) => {
      console.log("Dialog message:", dialog.message());
      // delete.dismiss() to cancel in the pop up box
      await dialog.accept();
      console.log("Dialog accepted.");
    });
    await this.page.locator("#delete").click();
  }
};
