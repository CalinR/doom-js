import { Node, Sector } from './editorObjects'

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
        this.tool = 'select';
        this.snap = false;
        this.sectors = [];
        this.selectedSector = null;
        this.hoverPoint = null;
        this.dragging = null;
        this.startDrag = {
            x: 0,
            y: 0
        }

        document.getElementsByClassName('editor-container')[0].appendChild(this.grid);
        document.getElementsByClassName('editor-container')[0].appendChild(this.canvas);
        document.getElementById('select').checked = 'true';

        this.drawGrid();
        this.bindMouse();
        this.update();
    }

    bindMouse(){
        this.canvas.onclick = (event) => {
            if(this.tool == 'wall'){
                this.drawWall(event);
            }
        }
        this.canvas.onmousedown = (event) => {
            if(this.tool == 'select'){
                this.selectObject(event);
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
                if(this.selectedSector){
                    for(let n of this.selectedSector.nodes){
                        if(x < n.x + this.gridSize && x > n.x - this.gridSize && y < n.y + this.gridSize && y > n.y -this.gridSize){
                            x = n.x;
                            y = n.y;
                        }
                    }
                }

                this.hoverPoint = {
                    x: x,
                    y: y
                }
            }
            else if(this.tool == 'select'){
                if(this.dragging){
                    if(this.dragging.type() == 'node'){
                        this.dragging.x = x;
                        this.dragging.y = y;
                    }
                    else if(this.dragging.type() == 'sector') {
                        let xOffset = x - this.startDrag.x;
                        let yOffset = y - this.startDrag.y;

                        for(let node of this.dragging.nodes){
                            node.x += xOffset;
                            node.y += yOffset;
                        }
                        this.startDrag.x = x;
                        this.startDrag.y = y;
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
            for(let node of sector.nodes){
                this.hitContext.clearRect(0, 0, this.hitCanvas.width, this.hitCanvas.height);
                this.hitContext.beginPath();
                this.hitContext.rect((node.x * this.gridScale) - 4, (node.y * this.gridScale) - 4, 8, 8);
                if(this.hitContext.isPointInPath(x * this.gridScale, y * this.gridScale)){
                    hitObject = node;
                    break;
                }
                this.hitContext.closePath();
            }

            if(!hitObject){
                this.hitContext.clearRect(0, 0, this.hitCanvas.width, this.hitCanvas.height);
                this.hitContext.beginPath();
                for(let node of sector.nodes){
                    this.hitContext.lineTo(node.x * this.gridScale, node.y * this.gridScale);
                }
                if(this.hitContext.isPointInPath(x * this.gridScale, y * this.gridScale)){
                    hitObject = sector;
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
        console.log(hitObject);
    }

    drawWall(event){
        let x = event.offsetX / this.gridScale;
        let y = event.offsetY / this.gridScale;

        if(!this.selectedSector){
            let sector = new Sector;
            this.selectedSector = sector;
            this.sectors.push(sector); 
        }

        let addNode = true;
        if(this.snap){
            x = Math.round(x/this.gridSize) * this.gridSize;
            y = Math.round(y/this.gridSize) * this.gridSize;
        }

        for(let n of this.selectedSector.nodes){
            if(x < n.x + this.gridSize && x > n.x - this.gridSize && y < n.y + this.gridSize && y > n.y -this.gridSize){
                this.selectedSector.closed = true;
                this.selectedSector = null;
                addNode = false;
            }
        }

        if(addNode){
            let node = new Node(x, y);
            this.selectedSector.add(node);
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
            this.context.beginPath();
            if(sector.closed){
                this.context.strokeStyle = '#eee';
                this.context.fillStyle = '#51F5EA';
            }
            else {
                this.context.strokeStyle = '#f39c12';
                this.context.fillStyle = '#f39c12';
            }
            for(let node of sector.nodes){
                this.context.lineTo(node.x * this.gridScale, node.y * this.gridScale);
                this.context.fillRect((node.x * this.gridScale)-4, (node.y * this.gridScale)-4, 8, 8);
            }
            if(sector.closed){
                this.context.lineTo(sector.nodes[0].x * this.gridScale, sector.nodes[0].y * this.gridScale);
                this.context.fillStyle = 'rgba(0,0,0,0.2)';
                this.context.fill();
            }
            this.context.stroke();
            this.context.closePath();
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

    update(){
        this.clear();
        this.drawSectors();
        this.drawTools();

        window.requestAnimationFrame(() => this.update());
    }

}

window.Editor = Editor;