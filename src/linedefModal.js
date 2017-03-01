import Modal from './modal'

export default class LinedefModal extends Modal {
    constructor(){
        super('Edit Linedef');
        this.linedef = null;
    }

    changeLinedef(linedef){
        this.linedef = linedef;
        this.templateInner = `<div class="input-row">
            <label for="left_sidedef">Left Sidedef</label>
            <input type="text" name="left_sidedef" class="left-sidedef" id="left_sidedef" value="${this.linedef.leftSidedef}" />
        </div>`;

        if(this.linedef.parents.length > 1){
            this.templateInner += `<div class="input-row">
                <label for="right_sidedef">Right Sidedef</label>
                <input type="text" name="right_sidedef" class="right-sidedef" id="right_sidedef" value="${this.linedef.rightSidedef}" />
            </div>`;
        }
        this.visible = true;
    }

    save(){
        this.linedef.leftSidedef = this.domElement.getElementsByClassName('left-sidedef')[0].value;
        if(this.linedef.parents.length > 1){
            this.linedef.rightSidedef = this.domElement.getElementsByClassName('right-sidedef')[0].value;
        }
        else {
            this.linedef.rightSidedef = null;
        }
        super.save();
    }
}