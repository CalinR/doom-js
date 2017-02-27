let vertexId = 0;
let sectorId = 0;
let linedefId = 0;

window.sectors = [];
window.linedefs = [];
window.vertices = [];

window.sharedLineDefs = () => {
    let shared = [];
    for(let linedef of window.linedefs){
        if(linedef.parents.length > 1){
            shared.push(linedef);
        }
    }

    return shared;
}

export class Vertex {
    constructor(x, y, id = vertexId++){
        this.id = id;
        this.parents = [];
        this.x = x;
        this.y = y;
        window.vertices.push(this);
    }

    type(){
        return 'vertex';
    }
}

export class LineDef {
    constructor(startVertex, endVertex, id = linedefId++){
        this.id = id;
        this.parents = [];
        startVertex.parents.push(this);
        endVertex.parents.push(this);
        this.startVertex = startVertex;
        this.endVertex = endVertex;
        window.linedefs.push(this);
    }

    get twoSided(){
        return this.parents.length > 1;
    }

    type(){
        return 'linedef';
    }
}

export class Sector {
    constructor(linedefs = [], closed = false, id = sectorId++){
        this.id = id;
        this.linedefs = linedefs;
        this.closed = closed;
        window.sectors.push(this);
    }

    type(){
        return 'sector';
    }

    add(linedef){
        linedef.parents.push(this);
        this.linedefs.push(linedef);
    }
}