
const Shape = require('./Shape');

class Line {
    constructor(x1, y1, x2, y2, color = 'black', width = 2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.color = color;
        this.width = width;
    }

    render(document) {
        const line = document.createElement('div');
        const length = Math.sqrt((this.x2 - this.x1) ** 2 + (this.y2 - this.y1) ** 2);
        const angle = Math.atan2(this.y2 - this.y1, this.x2 - this.x1) * (180 / Math.PI);

        line.style.position = 'absolute';
        line.style.width = `${length}px`;
        line.style.height = `${this.width}px`;
        line.style.backgroundColor = this.color;
        line.style.transformOrigin = '0 0';
        line.style.transform = `rotate(${angle}deg)`;
        line.style.left = `${this.x1}px`;
        line.style.top = `${this.y1}px`;

        return line;
    }
}

module.exports = Line;
