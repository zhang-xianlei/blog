import gui from '@share/style/gui.scss'
import css from '../style/index.scss'
import {findIndex} from '@share/script/global.js'
function addDiv() {
    let div = document.createElement('div');
    div.innerHTML = "hello webpack!";
    document.body.appendChild(div);
}

addDiv();
