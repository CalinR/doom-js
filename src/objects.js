let sectorId = 0;
let lineDefId = 0;
let vertexId = 0;
let vertex3Id = 0;

window.sectors = [];
window.linedefs = [];
window.vertices = [];

export class Sector {
    constructor(linedefs, floorHeight = 0, ceilingHeight = 10, id = sectorId++){
        this.id = id;
        this.linedefs = linedefs;
        this.floorHeight = floorHeight;
        this.ceilingHeight = ceilingHeight;
        window.sectors.push(this);
    }
}

export class LineDef {
    constructor(vectors, leftSidedef = '#ccc', rightSidedef = '#ccc', id = lineDefId++){
        this.id = id;
        this.vertices = vectors;
        this.leftSidedef = leftSidedef;
        this.rightSidedef = rightSidedef;
        window.linedefs.push(this);
    }

    length(){
        let xDiff = this.vertices[0].x - this.vertices[1].x;
        let yDiff = this.vertices[0].y - this.vertices[1].y;

        return Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
    }
}

export class Vertex {
    constructor(x, y, id = vertexId++){
        this.id = id;
        this.x = x;
        this.y = y;
        window.vertices.push(this);
    }
}