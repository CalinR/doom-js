window.things = [];

export default class Thing {
    constructor(x, y, sprite = null, type, hex, id = window.things.length){
        this.id = id;
        this.x = x;
        this.y = y;
        this.hex = hex;
        this.sprite = sprite;
        this.thingType = type;
        window.things.push(this)
    }

    type(){
        return 'thing';
    }
}