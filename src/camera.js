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
        for(let sector of map){
            for(let linedef of sector.linedefs){
                this.context.beginPath();
                let vertex1 = this.transformVertex(linedef.vertices[0]);
                let vertex2 = this.transformVertex(linedef.vertices[1]);
                this.context.moveTo(vertex1.x, vertex1.y);
                this.context.lineTo(vertex2.x, vertex2.y);
                this.context.stroke();
                this.context.closePath();
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
        this.nearPlane = height / 2;
    }

    get radians(){
        return this.rotation * Math.PI / 180;
    }

    set radians(radians){
        this.rotation = radians * 180 / Math.PI;
    }

    transformVertex(point, height){
        let originX = this.canvas.width / 2;
        let originY = this.canvas.height / 2;
        let px = point.x - this.x;
        let pz = point.y - this.y;
        let tz = px * Math.cos(this.radians) + pz * Math.sin(this.radians);
        let tx = px * Math.sin(this.radians) - pz * Math.cos(this.radians);
        let r = this.nearPlane / tz;

        return {
            x: -(tx * r) + originX,
            y: ((height - 10) * r) + originY
        }
    }

    render(map){
        this.clear();
        for(let sector of map){
            let floorHeight = sector.floorHeight;
            let ceilingHeight = sector.ceilingHeight;
            for(let linedef of sector.linedefs){
                this.context.beginPath();
                let vertex1 = this.transformVertex(linedef.vertices[0], floorHeight);
                let vertex2 = this.transformVertex(linedef.vertices[1], floorHeight);
                let vertex3 = this.transformVertex(linedef.vertices[1], ceilingHeight);
                let vertex4 = this.transformVertex(linedef.vertices[0], ceilingHeight);
                this.context.moveTo(vertex1.x, vertex1.y);
                this.context.lineTo(vertex2.x, vertex2.y);
                this.context.lineTo(vertex3.x, vertex3.y);
                this.context.lineTo(vertex4.x, vertex4.y);
                this.context.lineTo(vertex1.x, vertex1.y);
                this.context.stroke();
                this.context.closePath();
            }
        }
    }
}