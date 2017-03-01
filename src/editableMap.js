import { Sector, LineDef, Vertex } from './editorObjects'

export default class EditableMap {

    static fromJSON(json){
        let sectors = [];
        for(let sector of json){
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
                    currentLinedef = new LineDef(startVertex, endVertex, linedef.id);
                }

                linedefs.push(currentLinedef);
            }
            let currentSector = new Sector(linedefs, true, sector.id);
            sectors.push(currentSector);
        }

        return sectors;
    }

    static toJSON(map){
        let json = [];
        
        for(let sector of map){
            let linedefs = [];
            for(let linedef of sector.linedefs){
                let currentLinedef = {
                    id: linedef.id,
                    startVertex: {
                        id: linedef.startVertex.id,
                        x: linedef.startVertex.x,
                        y: linedef.startVertex.y   
                    },
                    endVertex: {
                        id: linedef.endVertex.id,
                        x: linedef.endVertex.x,
                        y: linedef.endVertex.y
                    },
                    leftSidedef: linedef.leftSidedef != '' ? linedef.leftSidedef : null,
                    rightSidedef: linedef.rightSidedef != '' ? linedef.rightSidedef : null
                }
                linedefs.push(currentLinedef)
            }

            let currentSector = {
                id: sector.id,
                linedefs: linedefs,
                floorHeight: sector.floorHeight,
                ceilingHeight: sector.ceilingHeight
            };
            json.push(currentSector);
        }

        return json;
    }
}