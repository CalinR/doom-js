import Modal from './modal'

export default class SectorModal extends Modal {
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