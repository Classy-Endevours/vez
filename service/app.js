const express = require('express');
const puppeteer = require('puppeteer');
const { JSDOM } = require('jsdom');
const { Square, Circle, Line, Oval } = require('./shapes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/generate-image', async (req, res) => {
    try {
        const schema = req.body;

    const dom = new JSDOM(`<!DOCTYPE html><html><head><style>
    body { margin: 0; position: relative; width: 100vw; height: 100vh; }
    </style></head><body></body></html>`);
    const document = dom.window.document;

    const elements = {};

        // Create shapes
        schema.shapes.forEach(shape => {
            let element;
            if (shape.type === 'Square') {
                element = new Square(shape.width, shape.color, shape.x, shape.y, shape.id, shape.text, shape.textColor).render();
            } else if (shape.type === 'Circle') {
                element = new Circle(shape.width, shape.color, shape.x, shape.y, shape.id, shape.text, shape.textColor).render();
            } else if (shape.type === 'Oval') {
                element = new Oval(shape.width, shape.height, shape.color, shape.x, shape.y, shape.id, shape.text).render();
            } else {
                throw new Error('Invalid shape type');
            }
            document.body.appendChild(element);
            elements[shape.id] = {
                element,
                x: shape.x,
                y: shape.y,
                width: shape.width,
                height: shape.height || shape.width  // assuming height is same as width for circles
            };
        });

        // Create lines
        schema.lines.forEach(line => {
            const fromElement = elements[line.fromId];
            const toElement = elements[line.toId];

            if (!fromElement || !toElement) {
                throw new Error('Invalid shape IDs provided for Line.');
            }

            const lineElement = new Line(
                fromElement.x, fromElement.y, fromElement.width, fromElement.height,
                toElement.x, toElement.y, toElement.width, toElement.height,
                line.color
            ).render(document);

            document.body.appendChild(lineElement);
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

app.get('/', (req, res) => res.json({ message: 'express server running' }))

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
