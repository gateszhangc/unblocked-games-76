const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const screenshotsDir = path.join(process.cwd(), 'screenshots');

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    javaScriptEnabled: false
  });

  // Capture original site
  console.log('Capturing original site...');
  const page1 = await context.newPage();
  await page1.goto('https://poki.ee', { waitUntil: 'networkidle' });
  await page1.screenshot({ 
    path: path.join(screenshotsDir, 'original.png'),
    fullPage: true 
  });
  await page1.close();

  // Capture clone
  console.log('Capturing clone...');
  const page2 = await context.newPage();
  await page2.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page2.screenshot({ 
    path: path.join(screenshotsDir, 'clone.png'),
    fullPage: true 
  });
  await page2.close();

  await browser.close();
  console.log('✓ Screenshots captured');
})();
