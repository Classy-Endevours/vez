const Square = require('./Square');
const Circle = require('./Circle');
const Line = require('./Line');

function importShapes(jsonData) {
    const shapes = JSON.parse(jsonData);
    return shapes.map(shapeData => {
        switch (shapeData.type) {
            case 'Square':
                return new Square(shapeData.size, shapeData.color, shapeData.x, shapeData.y);
            case 'Circle':
                return new Circle(shapeData.radius, shapeData.color, shapeData.x, shapeData.y);
            case 'Line':
                return new Line(shapeData.x1, shapeData.y1, shapeData.x2, shapeData.y2, shapeData.color, shapeData.width);
            default:
                throw new Error('Unknown shape type');
        }
    });
}

function exportShapes(shapes) {
    return JSON.stringify(shapes.map(shape => {
        if (shape instanceof Square) {
            return {
                type: 'Square',
                size: shape.width,
                color: shape.color,
                x: shape.x,
                y: shape.y
            };
        } else if (shape instanceof Circle) {
            return {
                type: 'Circle',
                radius: shape.radius,
                color: shape.color,
                x: shape.x,
                y: shape.y
            };
        } else if (shape instanceof Line) {
            return {
                type: 'Line',
                x1: shape.x1,
                y1: shape.y1,
                x2: shape.x2,
                y2: shape.y2,
                color: shape.color,
                width: shape.width
            };
        } else {
            throw new Error('Unknown shape type');
        }
    }));
}

module.exports = { importShapes, exportShapes };
