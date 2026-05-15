import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: 'new',
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
});
const page = await browser.newPage();
await page.setViewport({width: 900, height: 700, deviceScaleFactor: 2});
await page.goto('file:///Users/matsljunggren/Workspace/bz-social/linkedin-posts/post-11-the-system-still-has-a-constraint-card.html');
const card = await page.$('.card');
await card.screenshot({path: '/Users/matsljunggren/Workspace/bz-social/linkedin-posts/post-11-the-system-still-has-a-constraint-card.png'});
await browser.close();
console.log('post-11-the-system-still-has-a-constraint-card.png created');
