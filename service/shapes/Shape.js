
class Shape {
    constructor(width, height, x = 0, y = 0) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }

    render(document) {
        const div = document.createElement('div');
        div.style.width = `${this.width}px`;
        div.style.height = `${this.height}px`;
        div.style.position = 'absolute';
        div.style.left = `${this.x}px`;
        div.style.top = `${this.y}px`;
        return div;
    }
}

module.exports = Shape;
