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

    toString(){
        return 'Vertex';
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
        this.leftSidedef = '#cccccc';
        this.rightSidedef = '#cccccc';
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
    constructor(linedefs = [], closed = false, id = sectorId++){
        this.id = id;
        this.linedefs = linedefs;
        this.closed = closed;
        this.floorHeight = 0;
        this.ceilingHeight = 10;
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