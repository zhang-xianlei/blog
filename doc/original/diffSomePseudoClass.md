#### only-child  
> :only-child 伪类选择的元素是父元素只有一个同类的元素，并且只有一个元素；  

例如：  
html:

    <div>
        <p>this is the first paragrap!</p>
        <p>this is the second paragrap!</p>
    </div> 
    <div>
        <p>this is the first paragrap!</p>
    </div> 

css:  
        
    p{
        color: #fff;
        font-size: 14px;
        background: grey;
    }
    p:only-child{
        background: purple;
    }

效果：  
![img](./asserts/diff-some-pseudo-class-01.png)  
only-of-type

