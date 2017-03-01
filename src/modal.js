let modalId = 0;

export class Modal {
    constructor(title = 'Heading', templateInner = '<h2>Content</h2>'){
        this.id = modalId++;
        this.title = title;
        this._templateInner = templateInner;
        this._template = `<div class="modal-container">
            <div class="modal-background"></div>
            <div class="modal">
                <div class="modal-header">${ this.title }</div>
                <div class="modal-body">${ this.templateInner }</div>
                <div class="modal-footer"><button class="modal-cancel btn">Cancel</button><button class="modal-okay btn">Okay</button></div>
            </div>
        </div>`;
        this._visible = false;
        this.domElement = document.createElement('div');
        this.domElement.setAttribute('id', `modal-${this.id}`);
        document.body.appendChild(this.domElement);
        this.html = null;
        this.generateHTML();
        this.render();
    }

    closeModal(){
        this.visible = false;
    }

    set visible(value){
        this._visible = value; 
        this.render();
    }

    get visible(){
        return this._visible;
    }

    set templateInner(value){
        this._templateInner = value;
        this.generateHTML();
    }

    get templateInner(){
        return this._templateInner;
    }

    set template(value){
        this._template = value;
        this.generateHTML();
    }

    get template(){
        return this._template;
    }

    generateHTML(){
        this.domElement.innerHTML = `<div class="modal-container">
            <div class="modal-background"></div>
            <div class="modal">
                <div class="modal-header">${ this.title }</div>
                <div class="modal-body">${ this.templateInner }</div>
                <div class="modal-footer"><button class="modal-cancel btn">Cancel</button><button class="modal-okay btn">Okay</button></div>
            </div>
        </div>`;
        this.bindActions();
    }

    bindActions(){
        this.domElement.getElementsByClassName('modal-cancel')[0].onclick = (event) => {
            this.visible = false;
        }
        this.domElement.getElementsByClassName('modal-okay')[0].onclick = (event) => {
            this.save();
        }
    }

    save(){
        this.visible = false;
    }

    render(){
        this.domElement.style.display = this.visible ? '' : 'none';
    }
}

export class SectorModal extends Modal {
    constructor(){
        super('Edit Sector');
        this.sector = null;
    }

    changeSector(sector){
        this.sector = sector;
        this.templateInner = `<div class="input-row">
            <label for="floor">Floor Height</label>
            <input type="text" name="floor_height" class="floor-height" id="floor" value="${this.sector.floorHeight}" />
        </div>
        <div class="input-row">
            <label for="ceiling">Ceiling Height</label>
            <input type="text" name="ceiling_height" class="ceiling-height" id="ceiling" value="${this.sector.ceilingHeight}" />
        </div>`;
        this.visible = true;
    }

    save(){
        this.sector.floorHeight = this.domElement.getElementsByClassName('floor-height')[0].value;
        this.sector.ceilingHeight = this.domElement.getElementsByClassName('ceiling-height')[0].value;
        super.save();
    }
}