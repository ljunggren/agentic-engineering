import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: 'new',
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
});
const page = await browser.newPage();
await page.setViewport({width: 800, height: 600, deviceScaleFactor: 2});
await page.goto('file:///Users/matsljunggren/Workspace/agentic-engineering/post-03-card.html');
const card = await page.$('.card');
await card.screenshot({path: '/Users/matsljunggren/Workspace/agentic-engineering/post-03-card.png'});
await browser.close();
console.log('post-03-card.png created');
