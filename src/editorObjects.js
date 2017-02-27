let nodeId = 0;
let sectorId = 0;

export class Node {
    constructor(x, y){
        this.id = nodeId++;
        this.x = x;
        this.y = y;
    }

    type(){
        return 'node';
    }
}

export class Sector {
    constructor(nodes = []){
        this.id = sectorId++;
        this.nodes = nodes;
        this.closed = false;
    }

    type(){
        return 'sector';
    }

    add(node){
        this.nodes.push(node);
    }
}