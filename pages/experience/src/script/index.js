import css from '../style/index.scss'

function addDiv() {
    let div = document.createElement('div');
    div.innerHTML = "hello you web";
    document.body.appendChild(div);
}

addDiv();
