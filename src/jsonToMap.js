import { Sector, LineDef, Vertex } from './objects'

const JsonToMap = (map) => {
    let sectors = [];
    for(let sector of map){
        let linedefs = [];
        for(let linedef of sector.linedefs){
            let currentLinedef = null;
            for(let l of window.linedefs){
                if(l.id == linedef.id){
                    currentLinedef = l;
                }
            }
            if(!currentLinedef){
                let startVertex = new Vertex(linedef.startVertex.x, linedef.startVertex.y, linedef.startVertex.id);
                let endVertex = new Vertex(linedef.endVertex.x, linedef.endVertex.y, linedef.endVertex.id);
                currentLinedef = new LineDef([startVertex, endVertex], linedef.leftSidedef, linedef.rightSidedef, linedef.id);
            }
            linedefs.push(currentLinedef);
        }
        let currentSector = new Sector(linedefs, sector.floorHeight, sector.ceilingHeight, sector.id)
        sectors.push(currentSector);
    }
    return sectors;
}

export default JsonToMap;