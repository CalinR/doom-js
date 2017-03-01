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
        for(let sector of map){
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

        for(let sector of map){
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
        this.nearPlane = height;
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
            y: ((height - 10) * r) + originY,
            z: vertex.y
        }
    }

    render(map){
        let originX = this.canvas.width / 2;
        let originY = this.canvas.height / 2;

        this.clear();
        for(let sector of map){
            let floorHeight = sector.floorHeight;
            let ceilingHeight = sector.ceilingHeight;
            for(let linedef of sector.linedefs){
                if(linedef.leftSidedef){
                    let point1 = this.transformVertex(linedef.vertices[0]);
                    let point2 = this.transformVertex(linedef.vertices[1]);
                    let color = linedef.leftSidedef;

                    if(point1.y > 0 || point2.y > 0){
                        if(point1.y<0){
                            let xDiff = point1.x - point2.x;
                            let yDiff = point1.y - point2.y;
                            let slope = xDiff / yDiff;
                            let clipY = point2.y;
                            point1.y = 1;
                            point1.x = point2.x - point2.y * slope;
                        }
                        if(point2.y<0){
                            let xDiff = point1.x - point2.x;
                            let yDiff = point1.y - point2.y;
                            let slope = xDiff / yDiff;
                            point2.y = 1;
                            point2.x = point1.x - point1.y * slope;
                        }

                        let vertex1 = this.projectVertex(point1, floorHeight);
                        let vertex2 = this.projectVertex(point2, floorHeight);
                        let vertex3 = this.projectVertex(point2, ceilingHeight);
                        let vertex4 = this.projectVertex(point1, ceilingHeight);

                        this.context.beginPath();
                        this.context.strokeStyle = '#000';
                        this.context.fillStyle = color;
                        this.context.moveTo(vertex1.x, vertex1.y);
                        this.context.lineTo(vertex2.x, vertex2.y);
                        this.context.lineTo(vertex3.x, vertex3.y);
                        this.context.lineTo(vertex4.x, vertex4.y);
                        this.context.lineTo(vertex1.x, vertex1.y);
                        this.context.stroke();
                        this.context.fill();
                        this.context.closePath();

                    }
                }
            }
        }
    }
}