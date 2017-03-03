import { Sector, LineDef, Vertex } from './editorObjects'
import Thing from './thing'

export default class EditableMap {

    static fromJSON(json){
        let object = {
            sectors: [],
            things: []
        };
        for(let sector of json.sectors){
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
                    currentLinedef = new LineDef(startVertex, endVertex, linedef.leftSidedef ? linedef.leftSidedef : '', linedef.rightSidedef ? linedef.rightSidedef : '', linedef.id);
                }

                linedefs.push(currentLinedef);
            }
            let currentSector = new Sector(linedefs, true, sector.floorHeight, sector.ceilingHeight, sector.id);
            object.sectors.push(currentSector);
        }

        for(let thing of json.things){
            object.things.push(new Thing(thing.x, thing.y, thing.sprite, thing.type, thing.hex, thing.id));
        }

        return object;
    }

    static toJSON(map, things){
        let json = {
            sectors: [],
            things: []
        };
        
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
            json.sectors.push(currentSector);
        }

        for(let thing of things){
            json.things.push({
                id: thing.id,
                x: thing.x,
                y: thing.y,
                sprite: thing.sprite,
                type: thing.thingType,
                hex: thing.hex
            })
        }

        console.log(json);

        return json;
    }
}