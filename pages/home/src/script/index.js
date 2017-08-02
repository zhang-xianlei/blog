import gui from '@share/style/gui.css'
import css from '../style/index.css'
import {findIndex} from '@share/script/global.js'
function addDiv() {
    let div = document.createElement('div');
    div.innerHTML = "hello webpack!";
    document.body.appendChild(div);
    console.log(findIndex);
}

addDiv();
