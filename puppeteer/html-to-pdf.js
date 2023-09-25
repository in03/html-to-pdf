const path = require('path');
const process = require('process');
const puppeteer = require('puppeteer');

(async () => {

if (process.argv.length === 2) {
    console.error('%cExpected input file!', 'color: red');
    process.exit(1);
    }

  // Create a browser instance
  console.info("%cLoading file", 'color: magenta')
  const browser = await puppeteer.launch({
      headless: "new",
      executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
    });
    
    // Create a new page
    const page = await browser.newPage();
    await page.goto("file:///" + process.argv[2]);
    
    
    // Download the PDF
    console.info("%cConverting...", 'color: magenta')
    const pdf = await page.pdf({
        path: path.parse(process.argv[2]).name + ".pdf",
        margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
        printBackground: true,
        format: 'A4',
    });
    
    // Close the browser instance
    await browser.close();
    console.info("%cConversion completed.", 'color: green')
})();