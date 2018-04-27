ES modules: A cartoon deep-dive  
通过漫画 ，深入了解 ES 模块

By Lin Clark Posted on March 28, 2018 in Code Cartoons, Featured 
Article, and JavaScript Share This ES modules bring an official,
standardized module system to JavaScript. It took a while to get
here, though — nearly 10 years of standardization work.  
ES 模块是的 js 官方的 、标准化的模块规范 ，模块规范的标准化历经了将近10年之久 。  
But the wait is almost over. With the release of Firefox 60 in May
(currently in beta), all major browsers will support ES modules, 
and the Node modules working group is currently working on adding
ES module support to Node.js. And ES module integration for
WebAssembly is underway as well.  
不过 ，这个等待即将结束 。伴随着5月份火狐浏览器 60 版本的发布 ，主流的浏览器都将
支持 ES 模块 ，并且 Node 模块工作组 ，目前正在增加 ES 模块的支持 。
WebAssembly 集成 ES 模块的工作也在进行中 。  
Many JavaScript developers know that ES modules have been
 controversial. But few actually understand how ES modules work.  
大多数 js 开发者知道 ES 模块是有争议的 。但是很少能够真正的明白 ES 模块是如何
工作的 。  
Let’s take a look at what problem ES modules solve and how they 
are different from modules in other module systems.  
让我们看一下 ES 模块解决哪些问题 ，以及它们与其他模块规范的模块有何不同 。  
What problem do modules solve?  
解决什么问题  
When you think about it, coding in JavaScript is all about managing 
variables. It’s all about assigning values to variables, or adding
numbers to variables, or combining two variables together and putting 
them into another variable.  
当仔细想下 ，使用 JS 编码都是与处理变量相关 。为变量赋值 ，或者为变量增加数值 ，
再或者 ，合并两个变量并将两者赋值给其他的变量 。  
Because so much of your code is just about changing variables, how 
you organize these variables is going to have a big impact on how
well you can code… and how well you can maintain that code.  
因为你大部分的代码就只是在处理变量 ，所以如何组织这些变量将会在你如何更好的编码 ，
以及如何更好的组织代码有很大的影响 。  
Having just a few variables to think about at one time makes things 
easier. JavaScript has a way of helping you do this, called scope. 
Because of how scopes work in JavaScript, functions can’t access 
variables that are defined in other functions.  
只有少量的变量需要同时去考虑能够让编码变得简单 。 Js 的作用域是一个解决办法 。
也是因为作用域的工作机理 ，导致了方法之间不能获取到定义在其他方法的变量 。  
This is good. It means that when you’re working on one function, you 
can just think about that one function. You don’t have to worry about 
what other functions might be doing to your variables.  
这样处理的好处是 ，当你编写当前方法时 ，不需要担心其他的方法对你的变量有影响 。  
It also has a downside, though. It does make it hard to share 
variables between different functions.  
当然 ，也有不利的一面 。这样使得不同方法之间共享变量变得很难 。  
What if you do want to share your variable outside of a scope? A 
common way to handle this is to put it on a scope above you… for 
example, on the global scope.  
如果想暴露出当前作用域的变量 ，一般的处理方式就是在上层作用域定义变量 ，比如在全局
中定义变量 。  
You probably remember this from the jQuery days. Before you could 
load any jQuery plug-ins, you had to make sure that jQuery was in 
the global scope.  
你应该还记得 jQuery 时代的实现方式 ，在你加载 jQuery 插件之前 ，你都要先确认 
jQuery 在全局中引用 。  
This works, but they are some annoying problems that result.  
这样做是行得通的 ，但是它们会带来很多麻烦 。  
First, all of your script tags need to be in the right order. Then 
you have to be careful to make sure that no one messes up that order.
第一 ， 必须将所有的 script 标签正确的排序 ，然后你还必须小心翼翼的确保没有一个搞
混顺序 。  
If you do mess up that order, then in the middle of running, your app 
will throw an error. When the function goes looking for jQuery where 
it expects it — on the global — and doesn’t find it, it will throw 
an error and stop executing.  
如果搞混了顺序 ，在应用运行过程中 ，会报错 。当一个方法在它期望的地方想要查找 
jQuery （例如全局） ，但是没有找到 ，它就会报错 ，并停止执行 。  
This makes maintaining code tricky. It makes removing old code or 
script tags a game of roulette. You don’t know what might break. 
The dependencies between these different parts of your code are 
implicit. Any function can grab anything on the global, so you 
don’t know which functions depend on which scripts.  
这样的后果 ，就是在处理代码时要谨小慎微 。使得删除老代码或者 script 标签就像是在
玩轮盘赌 。你不知道什么会崩溃 。不同代码之间的相互依赖含糊不清 。任意方法都能获取
到全局中的任何对象 ，所以你搞不清方法依赖哪个脚本 。  
A second problem is that because these variables are on the global 
scope, every part of the code that’s inside of that global scope 
can change the variable. Malicious code can change that variable 
on purpose to make your code do something you didn’t mean for it 
to, or non-malicious code could just accidentally clobber your 
variable.  
第二个问题是因为这些变量都是暴露在全局 ，所以全局下的各个部分的代码都可以改变变量
的值 。恶意代码会有目的的改变你的代码使之不按预定的目标执行 ，或者非恶意的代码很
可能会重新定义你的变量 。  
How do modules help?  
模块能做什么 ？  
Modules give you a better way to organize these variables and 
functions. With modules, you group the variables and functions 
that make sense to go together.  
模块可以让你更好的组织这些变量和方法 。使用模块 ，你可以把具有一定意义的对象和方
法组织在一起 。  
This puts these functions and variables into a module scope. The 
module scope can be used to share variables between the functions 
in the module.  
将方法和对象放到一个模块里 ，模块里的方法可以共享这个模块作用域的变量 。  
But unlike function scopes, module scopes have a way of making their 
variables available to other modules as well. They can say explicitly 
which of the variables, classes, or functions in the module should 
be available.  
但与方法的作用域不同 ，模块的作用域有一种方式能够使它的变量能够在其他的模块中使用 ，
并且能够精确地暴露出变量 、类或者方法 。  
When something is made available to other modules, it’s called an 
export. Once you have an export, other modules can explicitly say 
that they depend on that variable, class or function.  
使当前模块的对象能够在其他模块中使用 ，这种处理方式称为 export 。一旦模块有一个输
出 ，其他的模块可以清晰的说明它们依赖输出中的对象 、类或者方法 。  
Because this is an explicit relationship, you can tell which modules 
will break if you remove another one.  
因为这种明确的依赖关系，所以当你删除某个模块时能够明确的知道哪些模块会崩溃。  
Once you have the ability to export and import variables between 
modules, it makes it a lot easier to break up your code into small 
chunks that can work independently of each other. Then you can 
combine and recombine these chunks, kind of like Lego blocks, to 
create all different kinds of applications from the same set of 
modules.  
一旦 ，能够在不同的模块之间输出 、引用变量，将代码拆分成能够独立运行的小块会变得轻
而易举 。那时你就可以使代码像乐高积木一样 ，任意的组织这些模块 ，去实现不同功能的
应用。  
Since modules are so useful, there have been multiple attempts to 
add module functionality to JavaScript. Today there are two module 
systems that are actively being used. CommonJS (CJS) is what Node.js 
has used historically. ESM (EcmaScript modules) is a newer system 
which has been added to the JavaScript specification. Browsers 
already support ES modules, and Node is  adding support.  
因为模块很有用 ，曾经有多种尝试给 JS 添加模块规范 。目前比较常用的模块规范有两种 ，
CommonJS 是 Node.js 曾经的模块规范 。ESM 是一种新的规范被添加到 JavaScript 
语言规范中 。 浏览器都已经支持 ES 模块规范了 ，并且 Node 正在支持这种规范。  
Let’s take an in-depth look at how this new module system works.  
让我们深入了解这种规范是如何工作的 。  
How ES modules work ES  
模块规范如何使用  
When you’re developing with modules, you build up a graph of 
dependencies. The connections between different dependencies come 
from any import statements that you use.  
当你使用模块进行开发时 ，将会构建一个依赖的图标 。不同依赖之间的联系都依赖于你使用
的依赖说明 。  
