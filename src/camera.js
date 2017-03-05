/**
 * STANDARD CAMERA
 * above view camera
 */
export class Camera {
    constructor(width=100, height=100){
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = width;
        this.canvas.height = height;

        document.body.appendChild(this.canvas);
    }

    clear(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render(map){
        this.clear();
        for(let sector of map.sectors){
            for(let linedef of sector.linedefs){
                this.context.beginPath();
                this.context.moveTo(linedef.vertices[0].x, linedef.vertices[0].y);
                this.context.lineTo(linedef.vertices[1].x, linedef.vertices[1].y);
                this.context.stroke();
                this.context.closePath();
            }
        }
    }
}


/**
 * FOLLOWCAMERA
 * above view camera that follows player position
 */
export class FollowCamera extends Camera {
    constructor(width, height, x = 0, y = 0, rotation = 0){
        super(width, height);
        this.x = x;
        this.y = y;
        this.rotation = rotation;
    }

    get radians(){
        return this.rotation * Math.PI / 180;
    }

    set radians(radians){
        this.rotation = radians * 180 / Math.PI;
    }

    transformVertex(point){
        let originX = this.canvas.width / 2;
        let originY = this.canvas.height / 2;
        let px = point.x - this.x;
        let py = point.y - this.y;

        let ty = px * Math.cos(this.radians) + py * Math.sin(this.radians);
        let tx = px * Math.sin(this.radians) - py * Math.cos(this.radians);

        return {
            x: originX - tx,
            y: originY - ty
        }
    }

    render(map){
        this.clear();
        let originX = this.canvas.width/2;
        let originY = this.canvas.height/2;

        for(let sector of map.sectors){
            for(let linedef of sector.linedefs){
                this.context.beginPath();
                let vertex1 = this.transformVertex(linedef.vertices[0]);
                let vertex2 = this.transformVertex(linedef.vertices[1]);

                if(vertex1.y < originY || vertex2.y < originY){
                    if(vertex1.y>originY){
                        let xDiff = vertex1.x - vertex2.x;
                        let yDiff = vertex1.y - vertex2.y;
                        let slope = xDiff / yDiff;
                        let clipY = originY - vertex2.y;
                        vertex1.y = originY;
                        vertex1.x = vertex2.x + clipY * slope;
                    }
                    if(vertex2.y>originY){
                        let xDiff = vertex2.x - vertex1.x;
                        let yDiff = vertex2.y - vertex1.y;
                        let slope = xDiff / yDiff;
                        let clipY = originY - vertex1.y;
                        vertex2.y = originY;
                        vertex2.x = vertex1.x + clipY * slope;
                    }

                    this.context.moveTo(vertex1.x, vertex1.y);
                    this.context.lineTo(vertex2.x, vertex2.y);
                    this.context.stroke();
                    this.context.closePath();
                }
            }
        }
    }
}

/**
 * PERSPECTIVE CAMERA
 * camera that shows player's perspective in 3d
 */
export class PerspectiveCamera extends Camera {
    constructor(width, height, x = 0, z = 0, rotation = 0){
        super(width, height);
        this.x = x;
        this.z = z;
        this.rotation = rotation;
        this.aspect = (width / height);
        this.nearPlane = height / (2 / this.aspect); // This is some crappy math to always force a 90 degree FOV
        this.drawCache = [];
    }

    get radians(){
        return this.rotation * Math.PI / 180;
    }

    set radians(radians){
        this.rotation = radians * 180 / Math.PI;
    }

    transformVertex(point){
        let originX = this.canvas.width / 2;
        let originY = this.canvas.height / 2;
        let px = point.x - this.x;
        let py = point.y - this.y;

        let ty = px * Math.cos(this.radians) + py * Math.sin(this.radians);
        let tx = px * Math.sin(this.radians) - py * Math.cos(this.radians);

        return {
            x: tx,
            y: ty
        }
    }

    projectVertex(vertex, height){
        let originX = this.canvas.width / 2;
        let originY = this.canvas.height / 2;
        let r = this.nearPlane / vertex.y;

        return {
            x: -(vertex.x * r) + originX,
            y: -((height-10)  * r) + originY,
            z: vertex.y
        }
    }

    render(map){
        let originX = this.canvas.width / 2;
        let originY = this.canvas.height / 2;
        this.drawCache = [];

        this.clear();

        this.drawSector(map, 0);
    }

    clipVertex(vertex1, vertex2){
        if(vertex1.x < 0){
            const xDiff = vertex1.x - vertex2.x;
            const yDiff = vertex1.y - vertex2.y;
            const slope = xDiff / yDiff;
            const xOffset = -vertex1.x;

            vertex1.y += xOffset / slope;
            vertex1.x = 0;
        }
        else if(vertex1.x > this.canvas.width){
            const xDiff = vertex2.x - vertex1.x;
            const yDiff = vertex2.y - vertex1.y;
            const slope = xDiff / yDiff;
            const xOffset = vertex1.x - this.canvas.width;

            vertex1.y -= xOffset / slope;
            vertex1.x = this.canvas.width;
        }

        return vertex1;
    }

    drawSector(map, index){
        let originX = this.canvas.width / 2;
        let originY = this.canvas.height / 2;

        let sector = map.sectors[index];

        if(sector){
            const floorHeight = sector.floorHeight;
            const ceilingHeight = sector.ceilingHeight;
            for(let linedef of sector.linedefs){
                if(linedef.leftSidedef){
                    let point1 = this.transformVertex(linedef.vertices[0]);
                    let point2 = this.transformVertex(linedef.vertices[1]);
                    let color = linedef.leftSidedef;

                    let p1Angle = Math.atan2(originX - point1.x, originY - point1.y) * 180 / Math.PI;
                    let p2Angle = Math.atan2(originX - point2.x, originY - point2.y) * 180 / Math.PI;

                    if(p1Angle > 45 || p2Angle > 45){
                    // if(point1.y > 0 || point2.y > 0){
                        if(point1.y<1){
                            const xDiff = point1.x - point2.x;
                            const yDiff = point1.y - point2.y;
                            const slope = xDiff / yDiff;
                            point1.y = 1;
                            point1.x = point2.x - point2.y * slope;
                        }
                        if(point2.y<1){
                            const xDiff = point1.x - point2.x;
                            const yDiff = point1.y - point2.y;
                            const slope = xDiff / yDiff;
                            point2.y = 1;
                            point2.x = point1.x - point1.y * slope;
                        }

                        if(point1.y == 1 && point2.y == 1){
                        }
                        else {
                            // console.log(point1, point2, color, point1.y == 1 && point2.y ==1);

                            // this.context.beginPath();
                            // this.context.strokeStyle = color;
                            // this.context.moveTo(originX - point1.x, originY - point1.y);
                            // this.context.lineTo(originX - point2.x, originY - point2.y);
                            // this.context.stroke();
                            // this.context.closePath();

                            let vertex1 = this.projectVertex(point1, floorHeight);
                            let vertex2 = this.projectVertex(point2, floorHeight);
                            let vertex3 = this.projectVertex(point2, ceilingHeight);
                            let vertex4 = this.projectVertex(point1, ceilingHeight);

                            if((vertex1.x > 0 || vertex2.x > 0) && (vertex1.x < this.canvas.width || vertex2.x < this.canvas.width)){

                                let xDiff = point1.x - point2.x;
                                let yDiff = point1.y - point2.y;
                                let leftX = vertex1.x < vertex2.x ? vertex1.x : vertex2.x;
                                let length = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
                                let textureOffset = leftX < 0 ? linedef.length() - length : 0;
                                // console.log(linedef.length(), length, textureOffset);


                                let left = 0;
                                let right = 0;
                                let startHeight = 0;
                                let endHeight = 0;
                                let startY = 0;
                                const columnWidth = 2;

                                // Clip vertices to edge of viewport to prevent unnecessary drawing
                                // This needs to be optimized and be part of the projectedVertex method. Clip linedefs where they interesect with the players fov
                                // vertex1 = this.clipVertex(vertex1, vertex2);
                                // vertex2 = this.clipVertex(vertex2, vertex1);
                                // vertex3 = this.clipVertex(vertex3, vertex4);
                                // vertex4 = this.clipVertex(vertex4, vertex3);

                                if(vertex1.x < vertex2.x){
                                    left = Math.floor(vertex1.x);
                                    right = Math.ceil(vertex2.x);
                                    
                                    startHeight = vertex1.y - vertex4.y;
                                    endHeight = vertex2.y - vertex3.y;

                                    startY = vertex4.y;
                                }
                                else {
                                    left = Math.floor(vertex2.x);
                                    right = Math.ceil(vertex1.x);
                                    startHeight = vertex2.y - vertex3.y;
                                    endHeight = vertex1.y - vertex4.y;
            
                                    startY = vertex3.y;
                                }

                                let columns = (right - left) / columnWidth;
                                let heightDiff = (startHeight - endHeight) / columns;
        
                                this.context.fillStyle = color;

                                for(let i=0; i<columns; i++){
                                    let c = i * columnWidth;
                                    if(left+c >= 0 && left+c <= this.canvas.width){
                                        let yDecrease = heightDiff * i;
                                        this.context.fillRect(left+c, startY + (yDecrease/2), columnWidth, startHeight - yDecrease);
                                        if(window.wallTexture){
                                            this.context.drawImage(window.wallTexture, i * columnWidth, 0, columnWidth, window.wallTexture.height, left+c, startY + (yDecrease/2), columnWidth, startHeight - yDecrease);
                                        }
                                        // this.context.fillRect(left+c, startY + (yDecrease/2), columnWidth, startHeight - yDecrease);
                                    }
                                }                       

                                // this.context.beginPath();
                                // this.context.strokeStyle = '#000';
                                // this.context.moveTo(vertex1.x, vertex1.y);
                                // this.context.lineTo(vertex2.x, vertex2.y);
                                // this.context.lineTo(vertex3.x, vertex3.y);
                                // this.context.lineTo(vertex4.x, vertex4.y);
                                // this.context.lineTo(vertex1.x, vertex1.y);
                                // this.context.stroke();
                                // this.context.closePath();
                            }
                        }
                    }
                }
                // break;
            }

            let newIndex = index + 1;
            this.drawSector(map, newIndex);

            // console.log(this.drawCache);

            // setTimeout(() => {
            //     let newIndex = index + 1;
            //     this.drawSector(map, newIndex);
            // }, 1000)
        }
    }
}