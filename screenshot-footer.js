const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('file:///c:/Cursor%20apps/dad%20pro%20web/index.html');
  await page.waitForTimeout(800);
  const footer = await page.$('.footer-bar');
  await footer.screenshot({ path: 'C:/Users/user/AppData/Local/Temp/footer-zoom.png' });
  await browser.close();
  console.log('done');
})();
