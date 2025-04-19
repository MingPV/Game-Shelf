import { test, expect } from '@playwright/test';

test('TC2-1: user exist and correct password', async ({ page }) => {
    await page.goto('https://boardgame-shelf.vercel.app/sign-in'); // adjust path to your login page

    await page.fill('input[name="email"]', 'player888@gmail.com');
    await page.fill('input[name="password"]', '12345678');

    const isValid = await page.$eval('form', (form) => form.checkValidity());
    expect(isValid).toBe(true);

    page.click('button[type="submit"]');

    await expect(page).toHaveURL('https://boardgame-shelf.vercel.app/home'); //valid
});

test('TC2-2: user not exist', async ({ page }) => {
    await page.goto('https://boardgame-shelf.vercel.app/sign-in'); // adjust path to your login page

    await page.fill('input[name="email"]', 'player123@gmail.com');
    await page.fill('input[name="password"]', '12345678');

    const isValid = await page.$eval('form', (form) => form.checkValidity());
    expect(isValid).toBe(true);

    page.click('button[type="submit"]');
    
    await expect(page.getByText('Incorrect password or email')).toBeVisible(); //invalid
});

test('TC2-3: empty email', async ({ page }) => {
    await page.goto('https://boardgame-shelf.vercel.app/sign-in');

    await page.fill('input[name="email"]', '');
    await page.fill('input[name="password"]', '12345678');

    const isValid = await page.$eval('form', (form) => form.checkValidity());
    expect(isValid).toBe(false); //invalid, can't click sign-in button
});

test('TC2-4: incorrect password', async ({ page }) => {
    await page.goto('https://boardgame-shelf.vercel.app/sign-in');

    await page.fill('input[name="email"]', 'player888@gmail.com');
    await page.fill('input[name="password"]', 'wrong1234');

    const isValid = await page.$eval('form', (form) => form.checkValidity());
    expect(isValid).toBe(true);

    page.click('button[type="submit"]');

    await expect(page.getByText('Incorrect password or email')).toBeVisible(); //invalid
});

test('TC2-4: empty password', async ({ page }) => {
    await page.goto('https://boardgame-shelf.vercel.app/sign-in');

    await page.fill('input[name="email"]', 'player888@gmail.com');
    await page.fill('input[name="password"]', '');

    const isValid = await page.$eval('form', (form) => form.checkValidity());
    expect(isValid).toBe(false); //invalid, can't click sign-in button
});