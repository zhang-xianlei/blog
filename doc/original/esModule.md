## 初尝 MODULE  

#### 输出  

###### 1、 export  

    // testA.js 输出 function sum
    export const sum = () => {}

    // testB.js 引入 sum 
    import {sum} from './testA'

###### 2、 export default  

    // testA.js 输出 function add
    const add = () => {}
    export default{
        add
    }

    // testB.js 引用 add
    imoport add from './testA'
