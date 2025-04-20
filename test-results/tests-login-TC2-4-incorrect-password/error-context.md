# Test info

- Name: TC2-4: incorrect password
- Location: /Users/winithraks/Desktop/Game-Shelf/tests/login.spec.ts:42:5

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: getByText('Incorrect password or email')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for getByText('Incorrect password or email')

    at /Users/winithraks/Desktop/Game-Shelf/tests/login.spec.ts:53:65
```

# Page snapshot

```yaml
- main:
  - link "GameShelf":
    - /url: /home
  - list:
    - listitem:
      - link "Home":
        - /url: /home
    - listitem:
      - link "Boardgame":
        - /url: /games
    - listitem:
      - link "Provider":
        - /url: /providers
    - listitem:
      - link "Report":
        - /url: /report-form
    - listitem:
      - link "Contact":
        - /url: /contact
  - button:
    - img
  - list:
    - listitem:
      - group: Wallet
  - link "Sign in":
    - /url: /sign-in
  - link "Sign up":
    - /url: /sign-up
  - img "SignIn Illustration"
  - heading "Welcome" [level=1]
  - paragraph: Welcome back! Sign in to rent, manage your bookings, and discover new board games. Let the fun begin!
  - heading "Sign in" [level=1]
  - paragraph:
    - text: New user?
    - link "Create an account":
      - /url: /sign-up
  - textbox "Email Address": player888@gmail.com
  - textbox "Password": wrong1234
  - link "Forgot Password?":
    - /url: /forgot-password
  - button
  - text: or
  - button "Continue With Google":
    - img
    - text: Continue With Google
  - button "Continue With Facebook":
    - img
    - text: Continue With Facebook
  - button "Continue With Apple":
    - img
    - text: Continue With Apple
- alert
- button "Open Next.js Dev Tools":
  - img
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 | import fs from 'fs';
   3 |
   4 | test('TC2-1: user exist and correct password', async ({ page }) => {
   5 |     await page.goto('http://localhost:3000/sign-in'); // adjust path to your login page
   6 |
   7 |     await page.fill('input[name="email"]', 'player888@gmail.com');
   8 |     await page.fill('input[name="password"]', '12345678');
   9 |
  10 |     const isValid = await page.$eval('form', (form) => form.checkValidity());
  11 |     expect(isValid).toBe(true);
  12 |
  13 |     page.click('button[type="submit"]');
  14 |
  15 |     await expect(page).toHaveURL('http://localhost:3000/home'); //valid
  16 | });
  17 |
  18 | test('TC2-2: user not exist', async ({ page }) => {
  19 |     await page.goto('http://localhost:3000/sign-in'); // adjust path to your login page
  20 |
  21 |     await page.fill('input[name="email"]', 'player123@gmail.com');
  22 |     await page.fill('input[name="password"]', '12345678');
  23 |
  24 |     const isValid = await page.$eval('form', (form) => form.checkValidity());
  25 |     expect(isValid).toBe(true);
  26 |
  27 |     page.click('button[type="submit"]');
  28 |     
  29 |     await expect(page.getByText('Incorrect password or email')).toBeVisible(); //invalid
  30 | });
  31 |
  32 | test('TC2-3: empty email', async ({ page }) => {
  33 |     await page.goto('http://localhost:3000/sign-in');
  34 |
  35 |     await page.fill('input[name="email"]', '');
  36 |     await page.fill('input[name="password"]', '12345678');
  37 |
  38 |     const isValid = await page.$eval('form', (form) => form.checkValidity());
  39 |     expect(isValid).toBe(false); //invalid, can't click sign-in button
  40 | });
  41 |
  42 | test('TC2-4: incorrect password', async ({ page }) => {
  43 |     await page.goto('http://localhost:3000/sign-in');
  44 |
  45 |     await page.fill('input[name="email"]', 'player888@gmail.com');
  46 |     await page.fill('input[name="password"]', 'wrong1234');
  47 |
  48 |     const isValid = await page.$eval('form', (form) => form.checkValidity());
  49 |     expect(isValid).toBe(true);
  50 |
  51 |     page.click('button[type="submit"]');
  52 |
> 53 |     await expect(page.getByText('Incorrect password or email')).toBeVisible(); //invalid
     |                                                                 ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  54 | });
  55 |
  56 | test('TC2-5: empty password', async ({ page }) => {
  57 |     await page.goto('http://localhost:3000/sign-in');
  58 |
  59 |     await page.fill('input[name="email"]', 'player888@gmail.com');
  60 |     await page.fill('input[name="password"]', '');
  61 |
  62 |     const isValid = await page.$eval('form', (form) => form.checkValidity());
  63 |     expect(isValid).toBe(false); //invalid, can't click sign-in button
  64 | });
  65 |
  66 | // test('💡 Collect frontend coverage after tests', async ({ page }) => {
  67 | //   await page.goto('http://localhost:3000'); // or /sign-in
  68 |
  69 | //   const coverage = await page.evaluate(() => (window as any).__coverage__);
  70 |
  71 | //   if (coverage) {
  72 | //     fs.mkdirSync('./.nyc_output', { recursive: true });
  73 | //     fs.writeFileSync('./.nyc_output/out.json', JSON.stringify(coverage));
  74 | //     console.log('✅ Coverage written to .nyc_output/out.json');
  75 | //   } else {
  76 | //     console.warn('⚠️ No coverage found. Check instrumentation.');
  77 | //   }
  78 | // });
```