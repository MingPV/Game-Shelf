import { Given, When, Then, world } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ICustomWorld } from "../../utils/custom_world";

let customWorld: ICustomWorld = world;

Given("I visit the login page", async () => {
  const page = customWorld.page;
  expect(page).not.toBeNull();

  if (page) {
    await page.goto("/sign-in");
    await page.waitForLoadState("domcontentloaded");
  }
});

When(
  "I input login email {string} and password {string}",
  async (email, password) => {
    const page = customWorld.page;

    if (page) {
      await page.fill("input[name='email']", email);
      await page.fill("input[name='password']", password);
    }
  }
);

When("I click on the login button", async () => {
  const page = customWorld.page;

  if (page) {
    await page.click("button[type='submit']");
  }
});

Then(
  "I should see an error message containing {string} on the login form",
  async (message: string) => {
    const page = customWorld.page;

    if (page) {
      const errorElement = page.getByText(message, { exact: false });
      await expect(errorElement).toBeVisible({ timeout: 10000 });
    }
  }
);

Then("the login form should be invalid", async () => {
  const page = customWorld.page;

  if (page) {
    const isValid = await page.$eval("form", (form) => form.checkValidity());
    expect(isValid).toBe(false);
  }
});
