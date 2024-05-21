const Shape = require('./Shape');

class Square extends Shape {
    constructor(size, color, x, y) {
        super(size, size, x, y);
        this.color = color;
    }

    render(document) {
        const div = super.render(document);
        div.style.backgroundColor = this.color;
        return div;
    }
}
module.exports = Square