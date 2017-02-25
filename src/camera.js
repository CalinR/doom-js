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
        this.context.beginPath();
        for(let i=0; i<map.length; i++){
            let point = map[i];

            if(i==0){
                this.context.moveTo(point.x, point.y);
            }
            else {
                this.context.lineTo(point.x, point.y);
            }
        }
        this.context.stroke();
        this.context.closePath();
    }
}

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
        let px = point.x - this.x;
        let py = point.y - this.y;
        let ty = px * Math.cos(this.radians) + py * Math.sin(this.radians);
        let tx = px * Math.sin(this.radians) - py * Math.cos(this.radians);

        return {
            x: tx,
            y: ty
        }
    }

    render(map){
        let originX = this.canvas.width / 2;
        let originY = this.canvas.height / 2;
        this.clear();
        this.context.beginPath();
        for(let i=0; i<map.length; i++){
            let point = map[i];
            let transformedPoint = this.transformVertex(point);
            if(i==0){
                this.context.moveTo(originX - transformedPoint.x, originY - transformedPoint.y);
            }
            else {
                this.context.lineTo(originX - transformedPoint.x, originY - transformedPoint.y);
            }
        }
        this.context.stroke();
        this.context.closePath();
    }
}