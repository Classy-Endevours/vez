const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const { JSDOM } = require('jsdom');

const Square = require('./shapes/Square')
const Circle = require('./shapes/Circle')
const Line = require('./shapes/Line')
const { importShapes, exportShapes } = require('./shapes/import')

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/generate-image', async (req, res) => {
    try {
        const shapes = [
            new Square(100, 'blue', 50, 50),
            new Circle(50, 'red', 200, 200),
            new Line(50, 50, 200, 200, 'green', 5)
        ];

        const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
        const document = dom.window.document;
        shapes.forEach(shape => {
            document.body.appendChild(shape.render(document));
        });

        const htmlContent = dom.serialize();

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

app.post('/import-shapes', async (req, res) => {
    try {
        const jsonData = req.body.jsonData;
        const shapes = importShapes(jsonData);
        res.json({ message: 'Shapes imported successfully', shapes: exportShapes(shapes) });
    } catch (error) {
        console.error('Error importing shapes:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/export-shapes', (req, res) => {
    try {
        const shapes = [
            new Square(100, 'blue', 50, 50),
            new Circle(50, 'red', 200, 200),
            new Line(50, 50, 200, 200, 'green', 5)
        ];
        res.json(exportShapes(shapes));
    } catch (error) {
        console.error('Error exporting shapes:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
