window.sectors = [];
window.linedefs = [];
window.vertices = [];

// let vertexId = window.vertices.length;
// let sectorId = window.sectors.length;
// let linedefId = window.linedefs.length;

window.sharedLineDefs = () => {
    let shared = [];
    for(let linedef of window.linedefs){
        if(linedef.parents.length > 1){
            shared.push(linedef);
        }
    }

    return shared;
}

export const ClearMap = () => {
    // vertexId = 0;
    // sectorId = 0;
    // linedefId = 0;
    for(let vertex of window.vertices){
        vertex.parents = [];
    }
    window.vertices = [];
    for(let linedef of window.linedefs){
        linedef.parents = [];
        linedef.startVertex = null;
        linedef.endVertex = null;
    }
    window.linedefs = [];
    for(let sector of window.sectors){
        sector.linedefs = [];
    }
    window.sectors = [];
}

export class Vertex {
    constructor(x, y, id = window.vertices.length){
        this.id = id;
        this.parents = [];
        this.x = x;
        this.y = y;
        window.vertices.push(this);
    }

    type(){
        return 'vertex';
    }

    toString(){
        return 'Vertex';
    }
}

export class LineDef {
    constructor(startVertex, endVertex, leftSidedef = '#cccccc', rightSidedef = '#cccccc', id = window.linedefs.length){
        this.id = id;
        this.parents = [];
        startVertex.parents.push(this);
        endVertex.parents.push(this);
        this.startVertex = startVertex;
        this.endVertex = endVertex;
        this.leftSidedef = leftSidedef;
        this.rightSidedef = rightSidedef;
        window.linedefs.push(this);
    }

    get twoSided(){
        return this.parents.length > 1;
    }

    checkMatch(match1, match2){
        let found_match = false;
        if((this.startVertex.x == match1.x && this.startVertex.y == match1.y) || (this.endVertex.x == match1.x && this.endVertex.y == match1.y)){
            found_match = true;
        }
        if((this.startVertex.x == match2.x && this.startVertex.y == match2.y) || (this.endVertex.x == match2.x && this.endVertex.y == match2.y)) {
            if(found_match){
                if(this.startVertex.x == match1.x && this.startVertex.y == match1.y){
                    return this.startVertex;
                }
                else {
                    return this.endVertex;
                }
            }
        }

        return false;
    }

    type(){
        return 'linedef';
    }

    toString(){
        return 'Linedef';
    }
}

export class Sector {
    constructor(linedefs = [], closed = false, floorHeight = 0, ceilingHeight = 20, id = window.sectors.length){
        this.id = id;
        this.linedefs = linedefs;
        this.closed = closed;
        this.floorHeight = floorHeight;
        this.ceilingHeight = ceilingHeight;
        for(let linedef of linedefs){
            linedef.parents.push(this);
        }
        window.sectors.push(this);
    }

    type(){
        return 'sector';
    }

    add(linedef){
        linedef.parents.push(this);
        this.linedefs.push(linedef);
    }

    toString(){
        return 'Sector';
    }
}