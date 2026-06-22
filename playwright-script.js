const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true
  });

  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'welcome-screen.png' });

  await page.goto('http://localhost:3000/dashboard');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'dashboard-screen.png' });

  console.log("Screenshots taken.");
  await browser.close();
})();
