// shapes.js
const { JSDOM } = require('jsdom');

class Shape {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    render() {
        const dom = new JSDOM();
        const document = dom.window.document;
        const div = document.createElement('div');
        div.style.width = `${this.width}px`;
        div.style.height = `${this.height}px`;
        div.style.position = 'absolute';
        return div;
    }
}

class Square extends Shape {
    constructor(size, color, x, y) {
        super(size, size);
        this.color = color;
        this.x = x;
        this.y = y;
    }

    render() {
        const div = super.render();
        div.style.backgroundColor = this.color;
        div.style.left = `${this.x}px`;
        div.style.top = `${this.y}px`;
        return div;
    }
}

class Circle extends Shape {
    constructor(radius, color, x, y) {
        super(radius * 2, radius * 2);
        this.color = color;
        this.x = x;
        this.y = y;
    }

    render() {
        const div = super.render();
        div.style.backgroundColor = this.color;
        div.style.borderRadius = '50%';
        div.style.left = `${this.x}px`;
        div.style.top = `${this.y}px`;
        return div;
    }
}

class Line {
    constructor(x1, y1, x2, y2, color, width) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.color = color;
        this.width = width;
    }

    render() {
        const dom = new JSDOM();
        const document = dom.window.document;
        const line = document.createElement('div');
        const length = Math.sqrt(Math.pow(this.x2 - this.x1, 2) + Math.pow(this.y2 - this.y1, 2));
        const angle = Math.atan2(this.y2 - this.y1, this.x2 - this.x1) * 180 / Math.PI;

        line.style.width = `${length}px`;
        line.style.height = `${this.width}px`;
        line.style.backgroundColor = this.color;
        line.style.position = 'absolute';
        line.style.transformOrigin = '0 0';
        line.style.transform = `rotate(${angle}deg)`;
        line.style.left = `${this.x1}px`;
        line.style.top = `${this.y1}px`;

        return line;
    }
}

module.exports = { Shape, Square, Circle, Line };
