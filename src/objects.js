let sectorId = 0;
let lineDefId = 0;
let vertexId = 0;
let vertex3Id = 0;

export class Sector {
    constructor(linedefs, floorHeight = 0, ceilingHeight = 10, id = sectorId++){
        this.id = id;
        this.linedefs = linedefs;
        this.floorHeight = floorHeight;
        this.ceilingHeight = ceilingHeight;
    }
}

export class LineDef {
    constructor(vectors, id = lineDefId++){
        this.id = id;
        this.vertices = vectors;
    }
}

export class Vertex {
    constructor(x, y, id = vertexId++){
        this.id = id;
        this.x = x;
        this.y = y;
    }
}