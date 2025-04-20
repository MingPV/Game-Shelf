import { Given, Then, When, world } from "@cucumber/cucumber";
import { ICustomWorld } from "../../utils/custom_world";
import { expect } from "@playwright/test";

let customWorld: ICustomWorld = world;

Given(
    "I visit the register page", 
    async () => {
        const page = customWorld.page;
        expect(page).not.toBeNull();

        if (page) {
            await page.goto("/sign-up");
            await page.waitForLoadState("domcontentloaded");
        }
    }
);

// CSS selector for the login button
// REF: https://www.w3schools.com/cssref/css_selectors.php
When(
  "I input email {string} and password {string}",
  async (username, password) => {
    const page = customWorld.page;

    if (page) {
      const emailInputField = page.locator("input[type='email']");
      await emailInputField?.fill(username);

      const passwordInputField = page.locator("input[type='password']");
      await passwordInputField?.fill(password);
    }
  }
);

When(
  "I input username {string}", async (username) => {
    const page = customWorld.page;

    if (page) {
      const usernameInputField = page.locator("input[type='text']");
        await usernameInputField?.fill(username);   
    }
}
);
  

When(
    "I input role {string}",
    async (role) => {
      const page = customWorld.page;

      if (page) {
        const roleButton = page.getByRole("button", {
            name: role,
        });
        await roleButton?.click();
      }
    }
)

When("I click on the register button", async () => {
  const page = customWorld.page;

  if (page) {
    const registerButton = page.getByRole("button", {
      name: "Create Account",
    });
    await registerButton?.click();
  }
});

Then("I should navigate to {string}", async (path: string) => {
  const page = customWorld.page;
  if (page) {
    await expect(page).toHaveURL(path, { ignoreCase: true, timeout: 5000 });
  }
});

Then(
  "I should see an error message containing {string} on the register form",
  async (message: string) => {
    const page = customWorld.page;
    if (page) {
        await expect(page.getByText(message)).toBeVisible({ timeout: 10000 });
    }
  }
);
