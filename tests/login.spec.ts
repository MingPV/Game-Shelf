import { test, expect } from '@playwright/test';
import fs from 'fs';

test('TC2-1: user exist and correct password', async ({ page }) => {
    await page.goto('http://localhost:3000/sign-in'); // adjust path to your login page

    await page.fill('input[name="email"]', 'player888@gmail.com');
    await page.fill('input[name="password"]', '12345678');

    const isValid = await page.$eval('form', (form) => form.checkValidity());
    expect(isValid).toBe(true);

    page.click('button[type="submit"]');

    await expect(page).toHaveURL('http://localhost:3000/home'); //valid
});

test('TC2-2: user not exist', async ({ page }) => {
    await page.goto('http://localhost:3000/sign-in'); // adjust path to your login page

    await page.fill('input[name="email"]', 'player123@gmail.com');
    await page.fill('input[name="password"]', '12345678');

    const isValid = await page.$eval('form', (form) => form.checkValidity());
    expect(isValid).toBe(true);

    page.click('button[type="submit"]');
    
    await expect(page.getByText('Incorrect password or email')).toBeVisible(); //invalid
});

test('TC2-3: empty email', async ({ page }) => {
    await page.goto('http://localhost:3000/sign-in');

    await page.fill('input[name="email"]', '');
    await page.fill('input[name="password"]', '12345678');

    const isValid = await page.$eval('form', (form) => form.checkValidity());
    expect(isValid).toBe(false); //invalid, can't click sign-in button
});

test('TC2-4: incorrect password', async ({ page }) => {
    await page.goto('http://localhost:3000/sign-in');

    await page.fill('input[name="email"]', 'player888@gmail.com');
    await page.fill('input[name="password"]', 'wrong1234');

    const isValid = await page.$eval('form', (form) => form.checkValidity());
    expect(isValid).toBe(true);

    page.click('button[type="submit"]');

    await expect(page.getByText('Incorrect password or email')).toBeVisible(); //invalid
});

test('TC2-5: empty password', async ({ page }) => {
    await page.goto('http://localhost:3000/sign-in');

    await page.fill('input[name="email"]', 'player888@gmail.com');
    await page.fill('input[name="password"]', '');

    const isValid = await page.$eval('form', (form) => form.checkValidity());
    expect(isValid).toBe(false); //invalid, can't click sign-in button
});

// test('💡 Collect frontend coverage after tests', async ({ page }) => {
//   await page.goto('http://localhost:3000'); // or /sign-in

//   const coverage = await page.evaluate(() => (window as any).__coverage__);

//   if (coverage) {
//     fs.mkdirSync('./.nyc_output', { recursive: true });
//     fs.writeFileSync('./.nyc_output/out.json', JSON.stringify(coverage));
//     console.log('✅ Coverage written to .nyc_output/out.json');
//   } else {
//     console.warn('⚠️ No coverage found. Check instrumentation.');
//   }
// });