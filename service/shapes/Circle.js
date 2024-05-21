const Shape = require('./Shape');

class Circle extends Shape {
    constructor(radius, color, x, y) {
        super(radius * 2, radius * 2, x, y);
        this.radius = radius;
        this.color = color;
    }

    render(document) {
        const div = super.render(document);
        div.style.borderRadius = '50%';
        div.style.backgroundColor = this.color;
        return div;
    }
}

module.exports = Circle;
