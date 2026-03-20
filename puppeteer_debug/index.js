const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({headless: "new"});
  const page = await browser.newPage();
  try {
    await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0' });
    const content = await page.content();
    console.log(content.substring(0, 1000));
    const overlay = await page.evaluate(() => {
      const viteOverlay = document.querySelector('vite-error-overlay');
      return viteOverlay ? viteOverlay.shadowRoot.innerHTML : 'No Vite Overlay';
    });
    console.log("VITE OVERLAY:", overlay.substring(0, 1000));
  } catch (e) {
    console.error('GOTO ERROR:', e.message);
  }
  await browser.close();
})();
