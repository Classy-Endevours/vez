const express = require('express');
const { JSDOM } = require('jsdom');
const puppeteer = require('puppeteer');
const { Square, Circle, Line } = require('./shapes');

const app = express();
const PORT = 3000;

app.get('/generate-image', async (req, res) => {
    try {
        // Create shapes
        const square = new Square(100, 'blue', 50, 50);
        const circle = new Circle(50, 'red', 200, 200);
        const line = new Line(100, 100, 250, 250, 'green', 5);

        // Render shapes to HTML
        const dom = new JSDOM();
        const document = dom.window.document;

        document.body.appendChild(square.render());
        document.body.appendChild(circle.render());
        document.body.appendChild(line.render());

        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Test Image</title>
            <style>
                body {
                    margin: 0;
                    position: relative;
                    width: 100vw;
                    height: 100vh;
                }
            </style>
        </head>
        <body>
            ${document.body.innerHTML}
        </body>
        </html>
        `;

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

        const screenshotBuffer = await page.screenshot({ fullPage: true });

        await browser.close();

        res.setHeader('Content-Type', 'image/png');
        res.send(screenshotBuffer);
    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
