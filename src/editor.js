import { LineDef, Vertex, Sector } from './editorObjects'

class Editor {
    constructor(){
        this.grid = document.createElement('canvas');
        this.gridContext = this.grid.getContext('2d');;
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.hitCanvas = document.createElement('canvas');
        this.hitContext = this.hitCanvas.getContext('2d'); 
        this.grid.width = '2000';
        this.grid.height = '2000';
        this.canvas.width = '2000';
        this.canvas.height = '2000';
        this.hitCanvas.width = '2000';
        this.hitCanvas.height = '2000';
        this.grid.style.position = 'absolute';
        this.canvas.style.position = 'relative';
        this.canvas.style.zIndex = '2';
        this.gridSize = 16;
        this.gridScale = 2;
        this._tool = 'select';
        this.snap = false;
        this.sectors = [];
        this.selectedSector = null;
        this.hoverPoint = null;
        this.dragging = null;
        this.startDrag = {
            x: 0,
            y: 0
        }
        this.verticesToAdd = [];
        this.hoveredVertex = null;
        this._selectedObject = null;
        this.ui = {
            edit: document.getElementById('edit'),
            editButton: document.getElementById('edit-button')
        }

        document.getElementsByClassName('editor-container')[0].appendChild(this.grid);
        document.getElementsByClassName('editor-container')[0].appendChild(this.canvas);
        document.getElementById('select').checked = 'true';

        this.drawGrid();
        this.bindMouse();
        this.update();
        this.updateUI();
    }

    get tool(){
        return this._tool;
    }

    set tool(value){
        if(this._tool != value){
            this._tool = value;
            this.selectedObject = null;
            this.updateUI();
        }
    }

    get selectedObject(){
        return this._selectedObject;
    }

    set selectedObject(value){
        if(this._selectedObject != value){
            this._selectedObject = value;
            this.updateUI();
        }
    }

    bindMouse(){
        this.canvas.onclick = (event) => {
            if(this.tool == 'wall'){
                this.drawWall(event);
            }
            else if(this.tool == 'select'){
                this.selectObject(event);
            }
        }
        this.canvas.onmousedown = (event) => {
            if(this.tool == 'select'){
                this.dragObject(event);
            }
        }
        this.canvas.onmouseup = () => {
            this.dragging = null;
        }
        this.canvas.onmousemove = (event) => {
            let x = event.offsetX / this.gridScale;
            let y = event.offsetY / this.gridScale;

            if(this.snap){
                x = Math.round(x/this.gridSize) * this.gridSize;
                y = Math.round(y/this.gridSize) * this.gridSize;
            }

            if(this.tool == 'wall'){
                this.hoveredVertex = null;
                for(let sector of this.sectors){
                    for(let linedef of sector.linedefs){
                        let vertices = [linedef.startVertex, linedef.endVertex];
                        for(let vertex of vertices){
                            if(x < vertex.x + this.gridSize && x > vertex.x - this.gridSize && y < vertex.y + this.gridSize && y > vertex.y - this.gridSize){
                                x = vertex.x;
                                y = vertex.y;
                                this.hoveredVertex = vertex;
                            }
                        }
                    }
                }

                this.hoverPoint = {x, y}
            }
            else if(this.tool == 'select'){
                if(this.dragging){
                    if(this.dragging.type() == 'vertex'){
                        this.dragging.x = x;
                        this.dragging.y = y;
                    }
                }
            }
        }
        this.canvas.onmouseleave = (event) => {
            this.hoverPoint = null;
        }
    }

    selectObject(event){
        let x = event.offsetX / this.gridScale;
        let y = event.offsetY / this.gridScale;
        let hitObject = null;

        for(let sector of this.sectors){
            for(let linedef of sector.linedefs){
                this.hitContext.clearRect(0, 0, this.hitCanvas.width, this.hitCanvas.height);
                this.hitContext.beginPath();
                this.hitContext.strokeStyle = 'blue';
                this.hitContext.moveTo(linedef.startVertex.x * this.gridScale, linedef.startVertex.y * this.gridScale);
                this.hitContext.lineTo(linedef.endVertex.x * this.gridScale, linedef.endVertex.y * this.gridScale);
                this.hitContext.lineWidth = 12;
                this.hitContext.stroke();
                this.hitContext.closePath();
                this.hitContext.clearRect((linedef.startVertex.x * this.gridScale)-4, (linedef.startVertex.y * this.gridScale)-4, 8, 8);
                this.hitContext.clearRect((linedef.endVertex.x * this.gridScale)-4, (linedef.endVertex.y * this.gridScale)-4, 8, 8);
                let hitData = this.hitContext.getImageData(x * this.gridScale, y * this.gridScale, 1, 1).data;
                if(hitData[0] != 0 || hitData[1] != 0 || hitData[2] != 0 || hitData[3] != 0){
                    hitObject = linedef;
                    break;
                }
            }
            if(!hitObject){
                this.hitContext.beginPath();
                for(let i=0; i<sector.linedefs.length; i++){
                    let linedef = sector.linedefs[i];

                    if(i==0){
                        this.hitContext.moveTo(linedef.startVertex.x * this.gridScale, linedef.startVertex.y * this.gridScale);
                        this.hitContext.lineTo(linedef.endVertex.x * this.gridScale, linedef.endVertex.y * this.gridScale);
                    }
                    else {
                        this.hitContext.lineTo(linedef.endVertex.x * this.gridScale, linedef.endVertex.y * this.gridScale);
                    }
                }
                this.hitContext.fill();
                for(let i=0; i<sector.linedefs.length; i++){
                    let linedef = sector.linedefs[i];
                    this.hitContext.clearRect((linedef.startVertex.x * this.gridScale)-4, (linedef.startVertex.y * this.gridScale)-4, 8, 8);
                    this.hitContext.clearRect((linedef.endVertex.x * this.gridScale)-4, (linedef.endVertex.y * this.gridScale)-4, 8, 8);
                }
                let hitData = this.hitContext.getImageData(x * this.gridScale, y * this.gridScale, 1, 1).data;
                if(hitData[0] != 0 || hitData[1] != 0 || hitData[2] != 0 || hitData[3] != 0){
                    hitObject = sector;
                    break;
                }
                this.hitContext.closePath();
            }
        }

        this.selectedObject = hitObject;
    }

    dragObject(event){
        let x = event.offsetX / this.gridScale;
        let y = event.offsetY / this.gridScale;
        let hitObject = null;

        for(let sector of this.sectors){
            for(let linedef of sector.linedefs){
                this.hitContext.clearRect(0, 0, this.hitCanvas.width, this.hitCanvas.height);
                this.hitContext.beginPath();
                this.hitContext.rect((linedef.startVertex.x * this.gridScale) - 4, (linedef.startVertex.y * this.gridScale) - 4, 8, 8);
                if(this.hitContext.isPointInPath(x * this.gridScale, y * this.gridScale)){
                    hitObject = linedef.startVertex;
                    break;
                }
                this.hitContext.closePath();

                this.hitContext.beginPath();
                this.hitContext.rect((linedef.endVertex.x * this.gridScale) - 4, (linedef.endVertex.y * this.gridScale) - 4, 8, 8);
                if(this.hitContext.isPointInPath(x * this.gridScale, y * this.gridScale)){
                    hitObject = linedef.endVertex;
                    break;
                }
                this.hitContext.closePath();
            }
        }

        if(hitObject){
            this.dragging = hitObject;
            this.startDrag.x = x;
            this.startDrag.y = y;
        }
        else {
            this.startDrag = {
                x: 0,
                y: 0
            }
        }
    }

    drawWall(event){
        let x = this.hoverPoint.x;
        let y = this.hoverPoint.y;

        if(!this.selectedSector){
            let sector = new Sector;
            this.selectedSector = sector;
            this.sectors.push(sector);
        }

        let addVertex = true;
        let vertex = null;

        for(let linedef of this.selectedSector.linedefs){
            let startVertex = linedef.startVertex;
            let endVertex = linedef.endVertex;

            if(x < startVertex.x + this.gridSize && x > startVertex.x - this.gridSize && y < startVertex.y + this.gridSize && y > startVertex.y -this.gridSize){
                addVertex = false;
                vertex = startVertex;
            }
            else if(x < endVertex.x + this.gridSize && x > endVertex.x - this.gridSize && y < endVertex.y + this.gridSize && y > endVertex.y -this.gridSize){
                addVertex = false;
                vertex = endVertex;
            }
        }

        let foundLineDef = false;
        if(this.verticesToAdd.length>1){
            let lastVertex = this.verticesToAdd[this.verticesToAdd.length-1];
            for(let linedef of window.linedefs){
                let match = linedef.checkMatch({x,y}, lastVertex);
                if(match){
                    foundLineDef = true;
                    this.selectedSector.add(linedef);
                    vertex = match;
                    this.verticesToAdd.push(match);
                    addVertex = false;
                    break;
                }
            }
        }

        if(!foundLineDef){
            if(addVertex){
                let foundVertex = false;
                for(let v of window.vertices){
                    if(v.x == x && v.y == y){
                        foundVertex = v;
                    }
                }
                if(foundVertex){
                    vertex = foundVertex;
                }
                else {
                    vertex = new Vertex(x, y);
                }
            }

            this.verticesToAdd.push(vertex);

            if(this.verticesToAdd.length>1){
                let lastVertex = this.verticesToAdd[this.verticesToAdd.length-2];
                let linedef = new LineDef(lastVertex, vertex);
                this.selectedSector.add(linedef);
            }
        }

        if(x == this.verticesToAdd[0].x && y == this.verticesToAdd[0].y && this.verticesToAdd.length > 1){
            this.selectedSector.closed = true;
            this.verticesToAdd = [];
            this.selectedSector = null;
        }
    }

    drawGrid(){
        let gridSize = this.gridSize * this.gridScale;
        this.gridContext.strokeStyle = '#2c3e50';
        
        this.gridContext.clearRect(0, 0, this.grid.width, this.grid.height);
        let columns = this.grid.width / gridSize;
        let rows = this.grid.height / gridSize;
        this.gridContext.beginPath();
        for(let i=0; i<columns; i++){
            this.gridContext.moveTo(i * gridSize, 0)
            this.gridContext.lineTo(i * gridSize, this.grid.height);
        }
        for(let i=0; i<rows; i++){
            this.gridContext.moveTo(0, i * gridSize)
            this.gridContext.lineTo(this.grid.width, i * gridSize);
        }
        this.gridContext.stroke();
        this.gridContext.closePath();
    }

    changeTool(tool){
        this.tool = tool;
    }

    toggleSnap(event){
        this.snap = event.target.checked;
    }

    clear(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawSectors(){
        for(let sector of this.sectors){
            
            if(sector.closed){
                this.context.beginPath();
                for(let i=0; i<sector.linedefs.length; i++){
                    let linedef = sector.linedefs[i];
                    if(i == 0){
                        this.context.moveTo(linedef.startVertex.x * this.gridScale, linedef.startVertex.y * this.gridScale);
                        this.context.lineTo(linedef.endVertex.x * this.gridScale, linedef.endVertex.y * this.gridScale);
                    }
                    else {
                        this.context.lineTo(linedef.endVertex.x * this.gridScale, linedef.endVertex.y * this.gridScale);
                    }
                }
                this.context.fillStyle = 'rgba(0,0,0,0.2)';
                this.context.fill();
                this.context.closePath();

                for(let i=0; i<sector.linedefs.length; i++){
                    this.context.beginPath();
                    let linedef = sector.linedefs[i];
                    this.context.fillStyle = '#51F5EA';
                    if(linedef.parents.length == 1){
                        this.context.strokeStyle = '#fff';
                        this.context.lineWidth = 2;
                    }
                    else {
                        this.context.lineWidth = 1;
                        this.context.strokeStyle = 'rgba(255,255,255,0.2)';
                    }
                    this.context.moveTo(linedef.startVertex.x * this.gridScale, linedef.startVertex.y * this.gridScale);
                    this.context.lineTo(linedef.endVertex.x * this.gridScale, linedef.endVertex.y * this.gridScale);
                    this.context.stroke();
                    this.context.fillRect((linedef.startVertex.x * this.gridScale) - 6, (linedef.startVertex.y * this.gridScale) - 6, 12, 12);
                    this.context.fillRect((linedef.endVertex.x * this.gridScale) - 6, (linedef.endVertex.y * this.gridScale) - 6, 12, 12);
                    this.context.closePath();
                }
            }
            else {
                this.context.beginPath();
                this.context.strokeStyle = '#f39c12';
                this.context.fillStyle = '#f39c12';
                this.context.lineWidth = 2;
                for(let vertex of this.verticesToAdd){
                    this.context.lineTo(vertex.x * this.gridScale, vertex.y * this.gridScale);
                    this.context.fillRect((vertex.x * this.gridScale) - 4, (vertex.y * this.gridScale) - 4, 8, 8);
                }
                this.context.stroke();
                this.context.closePath();
            }            
        }
    }

    save(){
        let json = {
            hello: 'world',
            something: 'else'
        }
        let file = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(json));
        let filename = prompt("Enter Filename", "level1");
        if(filename){
            let downloadAnchor = document.getElementById('download');
            downloadAnchor.setAttribute('href', file);
            downloadAnchor.setAttribute('download', `${filename}.json`);
            downloadAnchor.click();
        }
    }

    drawTools(){
        if(this.hoverPoint){
            this.context.fillStyle = '#fff';
            this.context.fillRect((this.hoverPoint.x * this.gridScale)-4, (this.hoverPoint.y * this.gridScale)-4, 8, 8);
        }
    }

    edit(){
        let editType = this.selectedObject ? this.selectedObject.type() : null;

        console.log(editType);
    }

    drawSelections(){
        if(this.selectedObject){
            switch(this.selectedObject.type()){
                case 'linedef':
                    this.context.fillStyle = '#FFCF4B';
                    this.context.beginPath();
                    this.context.strokeStyle = '#FFCF4B';
                    this.context.lineWidth = 4;
                    this.context.moveTo(this.selectedObject.startVertex.x * this.gridScale, this.selectedObject.startVertex.y * this.gridScale);
                    this.context.lineTo(this.selectedObject.endVertex.x * this.gridScale, this.selectedObject.endVertex.y * this.gridScale);
                    this.context.stroke();
                    this.context.closePath();
                    this.context.fillRect((this.selectedObject.startVertex.x * this.gridScale)-6, (this.selectedObject.startVertex.y * this.gridScale)-6, 12, 12);
                    this.context.fillRect((this.selectedObject.endVertex.x * this.gridScale)-6, (this.selectedObject.endVertex.y * this.gridScale)-6, 12, 12);
                    break;
                case 'sector':
                    this.context.beginPath();
                    this.context.strokeStyle = '#FFCF4B';
                    this.context.lineWidth = 4;
                    for(let i=0; i<this.selectedObject.linedefs.length; i++){
                        let linedef = this.selectedObject.linedefs[i];
                        
                        if(i==0){
                            this.context.moveTo(linedef.startVertex.x * this.gridScale, linedef.startVertex.y * this.gridScale);
                            this.context.lineTo(linedef.endVertex.x * this.gridScale, linedef.endVertex.y * this.gridScale);
                        }
                        else {
                            this.context.lineTo(linedef.startVertex.x * this.gridScale, linedef.startVertex.y * this.gridScale);
                            this.context.lineTo(linedef.endVertex.x * this.gridScale, linedef.endVertex.y * this.gridScale);
                        }
                        this.context.fillStyle = '#FFCF4B';
                        this.context.fillRect((linedef.startVertex.x * this.gridScale)-6, (linedef.startVertex.y * this.gridScale)-6, 12, 12);
                        this.context.fillRect((linedef.endVertex.x * this.gridScale)-6, (linedef.endVertex.y * this.gridScale)-6, 12, 12);
                    }
                    this.context.fillStyle = 'rgba(255, 207, 75, 0.2)';
                    this.context.stroke();
                    this.context.fill();
                    this.context.closePath();
                    break;
            }
        }
    }

    update(){
        this.clear();
        this.drawSectors();
        this.drawTools();
        this.drawSelections();

        window.requestAnimationFrame(() => this.update());
    }

    updateUI(){
        console.log('updated ui');
        this.ui.edit.style.display = this.selectedObject ? '' : 'none';
        this.ui.editButton.style.display = this.selectedObject ? '' : 'none';
        this.ui.editButton.innerHTML = `Edit ${this.selectedObject ? this.selectedObject.toString() : ''}`;

    }

}

window.Editor = Editor;