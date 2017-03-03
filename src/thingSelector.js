import things from './things.json'

export default class ThingSelector {
    constructor(selector){
        this.selector = selector;
        this.selection = null;

        this.prepareOptions();
        this.bindEvents();
    }

    prepareOptions(){
        for(let thing of things){
            let option = document.createElement('option');
            option.value = thing.hex;
            option.text = thing.name;
            option.setAttribute('data-sprite', thing.sprite);
            option.setAttribute('data-type', thing.type);

            this.selector.appendChild(option);
        }
    }

    bindEvents(){
        this.selector.onchange = (event) => {
            let selector = event.target;
            let option = selector.options[selector.selectedIndex];
            this.selection = {
                hex: selector.value,
                sprite: option.getAttribute('data-sprite'),
                type: option.getAttribute('data-type')
            }
        }
    }
}