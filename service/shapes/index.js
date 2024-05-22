// shapes.js
const { JSDOM } = require('jsdom');

class Shape {
    constructor(width, height, x, y, id, text, textColor) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.id = id;
        this.text = text;
        this.textColor = textColor;
    }

    render() {
        const dom = new JSDOM();
        const document = dom.window.document;
        const div = document.createElement('div');
        div.style.width = `${this.width}px`;
        div.style.height = `${this.height}px`;
        div.style.position = 'absolute';
        div.style.left = `${this.x}px`;
        div.style.top = `${this.y}px`;
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.justifyContent = 'center';
        div.style.textAlign = 'center';
        div.style.overflow = 'hidden';
        div.style.wordBreak = 'break-word';
        div.id = this.id;

        if (this.text) {
            const textNode = document.createElement('div');
            textNode.style.pointerEvents = 'none';
            textNode.style.padding = '5px';
            textNode.style.color = this.textColor;
            textNode.innerHTML = this.text;
            div.appendChild(textNode);
        }

        return div;
    }
}

class Square extends Shape {
    constructor(size, color, x, y, id, text, textColor) {
        super(size, size, x, y, id, text, textColor);
        this.color = color;
    }

    render() {
        const div = super.render();
        div.style.backgroundColor = this.color;
        return div;
    }
}

class Circle extends Shape {
    constructor(diameter, color, x, y, id, text, textColor) {
        super(diameter, diameter, x, y, id, text, textColor);
        this.color = color;
    }

    render() {
        const div = super.render();
        div.style.backgroundColor = this.color;
        div.style.borderRadius = '50%';
        return div;
    }
}

class Line {
    constructor(fromX, fromY, fromWidth, fromHeight, toX, toY, toWidth, toHeight, color = 'black') {
        this.fromX = fromX;
        this.fromY = fromY;
        this.fromWidth = fromWidth;
        this.fromHeight = fromHeight;
        this.toX = toX;
        this.toY = toY;
        this.toWidth = toWidth;
        this.toHeight = toHeight;
        this.color = color;
    }

    render(document) {
        const line = document.createElement('div');

        const x1 = this.fromX + this.fromWidth / 2;
        const y1 = this.fromY + this.fromHeight / 2;
        const x2 = this.toX + this.toWidth / 2;
        const y2 = this.toY + this.toHeight / 2;

        const length = Math.hypot(x2 - x1, y2 - y1);
        const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

        line.style.position = 'absolute';
        line.style.left = `${x1}px`;
        line.style.top = `${y1}px`;
        line.style.width = `${length}px`;
        line.style.height = '2px';
        line.style.backgroundColor = this.color;
        line.style.transformOrigin = '0 0';
        line.style.transform = `rotate(${angle}deg)`;
        line.style.zIndex = '10';

        return line;
    }
}

module.exports = { Shape, Square, Circle, Line };
