/**
 * Created by leo on 2017/5/19.
 */
import _ from 'lodash';
import css from './index.css';
import printMe from './print.js';
function component() {
    let element = document.createElement('div');
    let btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
}
if (module.hot) {

}
document.body.appendChild(component());
