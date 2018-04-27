ES modules: A cartoon deep-dive  
通过漫画 ，深入了解 ES 模块  
本文引自 [Lin Clark](https://code-cartoons.com/) 的 [ES modules: A cartoon deep-dive](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more)  
This ES modules bring an official,
standardized module system to JavaScript. It took a while to get
here, though — nearly 10 years of standardization work.  
<u>'ES 模块是的 js 官方的 、标准化的模块规范 ，模块规范的标准化历经了将近10年之久 。'</u>  
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
当仔细想下 ，使用 JS 编码都是与处理变量相关 。为变量执行 ，或者为变量增加数值 ，
再或者 ，合并两个变量并将两者执行给其他的变量 。  
![img](https://hacks.mozilla.org/files/2018/03/01_variables-768x273.png)  
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
![img](https://hacks.mozilla.org/files/2018/03/02_module_scope_01-768x448.png)  
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
![img](https://hacks.mozilla.org/files/2018/03/02_module_scope_02-768x691.png)  
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
![img](https://hacks.mozilla.org/files/2018/03/02_module_scope_03-768x691.png)  
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
![img](https://hacks.mozilla.org/files/2018/03/02_module_scope_04-768x691.png)  
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
How ES modules work   
ES 模块规范如何使用  
When you’re developing with modules, you build up a graph of 
dependencies. The connections between different dependencies come 
from any import statements that you use.  
当你使用模块进行开发时 ，将会构建一个依赖的图谱 。不同依赖之间的联系都依赖于你使用
的依赖说明 。  
These import statements are how the browser or Node knows exactly 
what code it needs to load. You give it a file to use as an entry 
point to the graph. From there it just follows any of the import 
statements to find the rest of the code.  
这些依赖声明使得浏览器或者 Node 准确的加载资源 。 你可以建一个文件作为依赖图谱的
入口 ，通过跟踪入口文件的任何一个引入声明找到相关的代码 。  
![img](https://hacks.mozilla.org/files/2018/03/04_import_graph-768x447.png)  
But files themselves aren’t something that the browser can use. It 
needs to parse all of these files to turn them into data structures 
called Module Records. That way, it actually knows what’s going on 
in the file.  
浏览器并不能直接使用这些文件 ，需要解析所有的文件生成一个称为模块记录的数据结构 。
通过这种方式 ，浏览器才能知道文件的功能。 
![img](https://hacks.mozilla.org/files/2018/03/05_module_record-768x441.png)  
After that, the module record needs to be turned into a module 
instance. An instance combines two things: the code and state.  
除此之外 ， 模块记录需要转变成一个模块实例 。一个实例由两种事物组成 ： 代码和状态 。  
The code is basically a set of instructions. It’s like a recipe for 
how to make something. But by itself, you can’t use the code to do 
anything. You need raw materials to use with those instructions.  
代码基本上就是一组的指令 ，就像是一个处理事情的规则 。但是仅凭借单独的代码，你不能
完成任何事情 ，只是以这些指令为原生代码 。  
What is state? State gives you those raw materials. State is the 
actual values of the variables at any point in time. Of course, 
these variables are just nicknames for the boxes in memory that hold 
the values.  
什么是状态 ？状态给你一些原生代码 ，状态是任意时间点变量的值 。当然 ，提到的变量就是
存储在内存盒子中值的相应昵称 。  
So the module instance combines the code (the list of instructions) 
with the state (all the variables’ values).  
所以得出 ，模块实例是代码（一些列的指令）和状态（所有变量的值）的组合 。 
![img](https://hacks.mozilla.org/files/2018/03/06_module_instance-768x572.png)  
What we need is a module instance for each module. The process of 
module loading is going from this entry point file to having a full 
graph of module instances 。  
我们需要的就是每个模块的实例 。模块加载的过程就是依据入口文件去加载整个依赖图表的模
块的实例。  
For ES modules, this happens in three steps.  
对于 ES 模块规范来说 ，实现加载分为三个步骤 。  
Construction — find, download, and parse all of the files into module 
records. Instantiation —find boxes in memory to place all of the 
exported values in (but don’t fill them in with values yet). Then 
make both exports and imports point to those boxes in memory. This is 
called linking. Evaluation —run the code to fill in the boxes with 
the variables’ actual values.  
结构化—查找、下载和解析所有模块记录的文件 。  
实例化—找到内存中的盒子用输出的值去占位（但是并不赋 值）。然后将输出和引入只想内存中
的盒子，这个过程称为连结 。  
执行 —执行代码，用真实的值填充到相应的盒子 。  
![img](https://hacks.mozilla.org/files/2018/03/07_3_phases-768x282.png)  
People talk about ES modules being asynchronous. You can think about 
it as asynchronous because the work is split into these three 
different phases — loading, instantiating, and evaluating — and 
those phases can be done separately.  
大家认为 ES 模块规范是个异步的过程 。你可以这么认为 ，因为它是分三步实现的—加载、
实例化和执行—并且这三步可以单独完成 。  
This means the spec does introduce a kind of asynchrony that wasn’t 
there in CommonJS. I’ll explain more later, but in CJS a module and 
the dependencies below it are loaded, instantiated, and evaluated all 
at once, without any breaks in between.  
这只能说明 CommonJS 的文档中没有提及到异步实现的过程 。这个稍后解释。不过在 CJS 
中 ，模块自身以及依赖的模块的加载、实例化以及执行过程是连续的，中间没有断开。  
However, the steps themselves are not necessarily asynchronous. They 
can be done in a synchronous way. It depends on what’s doing the 
loading. That’s because not everything is controlled by the ES 
module spec. There are actually two halves of the work, which are 
covered by different specs.   
但是 ，这些步骤本没有必要异步执行 ，可以采用同步实现的方式完成 。主要取决于加载的时
候做什么 ，并不是所有的事情都是 ES 模块规范文档左右的 。其实两种实现是一样的 ，只是
规范文档不同 。  
The ES module spec says how you should parse files into module records, 
and how you should instantiate and evaluate that module. However, it 
doesn’t say how to get the files in the first place.  
ES 模块规范文档里介绍了如何解析文件到模块记录中，如何实例化和执行模块 。然而 ，并没
有介绍首先如何获取文件 。  
It’s the loader that fetches the files. And the loader is specified 
in a different specification. For browsers, that spec is the HTML spec. 
But you can have different loaders based on what platform you are using.  
是加载器读取文件 ，加载器是按照不同的规范严格执行的 。对于浏览器来说 ，它们的规范就
是 HTML 规范规定的 。根据平台的不同加载器也各不相同 。  
![img](https://hacks.mozilla.org/files/2018/03/07_loader_vs_es-768x439.png)  
The loader also controls exactly how the modules are loaded. It calls 
the ES module methods — ParseModule, Module.Instantiate, and Module.
Evaluate. It’s kind of like a puppeteer controlling the JS engine’s 
strings.   
加载器严格控制着模块如何加载 。称之为 ES 模块规范方法 — 模块的解析 、实例化和执行 。
就像是木偶剧的演员用绳子操作木偶一样操控着 JS 引擎 。  
![img](https://hacks.mozilla.org/files/2018/03/08_loader_as_puppeteer-768x507.png)  
Now let’s walk through each step in more detail.  
现在让我们对每个步骤进行更深入的了解 。  
#### Construction  
#### 结构化  
Three things happen for each module during the Construction phase.  
Figure out where to download the file containing the module from 
(aka module resolution) Fetch the file (by downloading it from a URL
 or loading it from the file system) Parse the file into a module 
 record.  
每个模块的结构化要经历三个步骤 。 分析包含的模块的下载地址（又称之为模块解析）。 
下载文件（从具体的网址下载或者从文件系统中下载）。 分析文件并加到模块记录中 。  
Finding the file and fetching it  
找到文件并且获取它  
The loader will take care of finding the file and downloading it. 
First it needs to find the entry point file. In HTML, you tell the 
loader where to find it by using a script tag.  
记载器会仔细的找到文件并且下载 。首先 ，需要找到入口文件 。 在HTML 文件中 ，加载器
会通过 script 标签找到入口 。  
![img](https://hacks.mozilla.org/files/2018/03/08_script_entry-768x288.png)  
But how does it find the next bunch of modules — the modules that 
main.js directly depends on?  
但是它怎么找到入口文件依赖的其他的模块 。  
This is where import statements come in. One part of the import 
statement is called the module specifier. It tells the loader where 
it can find each next module.  
这就是引用声明语句的来由 。引用声明的一部分称之为模块说明符 。它告诉加载器去哪里找
到依赖的模块 。  
![img](https://hacks.mozilla.org/files/2018/03/09_module_specifier-768x161.png)  
One thing to note about module specifiers: they sometimes need to be 
handled differently between browsers and Node. Each host has its own 
way of interpreting the module specifier strings. To do this, it uses 
something called a module resolution algorithm, which differs between 
platforms. Currently, some module specifiers that work in Node won’t 
work in the browser, but there is ongoing work to fix this.  
关于模块说明符有一点要强调下 ：有时候浏览器 和 Node 的处理方式不同 。每个终端解
析模块说明符有自己方式 。 为了解析模块 ，会用到称之为模块解析算法的东西 ，不同的
平台算法是不一样的 。目前 有些模块说明符在 Node 中可以正常运行，但是在浏览器中会
挂掉 ，但是这个问题正在修复 。  
Until that’s fixed, browsers only accept URLs as module specifiers. 
They will load the module file from that URL. But that doesn’t 
happen for the whole graph at the same time. You don’t know what 
dependencies the module needs you to fetch until you’ve parsed 
the file… and you can’t parse the file until you fetched it.  
修复之前，浏览器只能接受 URL 作为模块说明符。它们通过 URL 加载模块文件 。但是
整个依赖图谱并不能在同一时间加载 。因为你在解析文件之前 ，并不知道依赖哪些模块…况
且在你获取文件之前是不能解析它的 。  
This means that we have to go through the tree layer-by-layer, 
parsing one file, then figuring out its dependencies, and then 
finding and loading those dependencies.  
这就意味着 ，我们需要一层一层地 ，解析一个文件 ，然后分析出它的依赖 ，然后找到并
下载这些依赖 。  
![img](https://hacks.mozilla.org/files/2018/03/10_construction-768x464.png)  
If the main thread were to wait for each of these files to download, 
a lot of other tasks would pile up in its queue.  
如果主线程在等待下载这些文件 ，那么堆栈中的其他任务将会被挂起 。  
That’s because when you’re working in a browser, the downloading 
part takes a long time.  
这就是你在使用浏览器时 ，下载会占用很长的时间 。   
![img](https://hacks.mozilla.org/files/2018/03/11_latency-768x415.png)  
Based on this chart. Blocking the main thread like this would make 
an app that uses modules too slow to use. This is one of the reasons 
that the ES module spec splits the algorithm into multiple phases. 
Splitting out construction into its own phase allows browsers to 
fetch files and build up their understanding of the module graph 
before getting down to the synchronous work of instantiating.  
像这样阻塞主线程会使得应用在使用模块时变得很慢以至于不能正常工作 。这是 ES 模块
规范将模块解析算法分成多个步骤完成的原因之一 。结构化分离成单独的一部分 ，允许浏览
器在实例化之前提取文件并构建出它们能解析的模块图谱 。  
This approach—having the algorithm split up into phases—is one of 
the key differences between ES modules and CommonJS modules.  
将模块解析算法分成多个部分的方法是 ES 模块规范和 CJS 模块规范的一个重要区别 。  
CommonJS can do things differently because loading files from the 
filesystem takes much less time than downloading across the Internet. 
This means Node can block the main thread while it loads the file. 
And since the file is already loaded, it makes sense to just 
instantiate and evaluate (which aren’t separate phases in CommonJS). 
This also means that you’re walking down the whole tree, loading, 
instantiating, and evaluating any dependencies before you return 
the module instance.  
CJS 模块规范之所以能够以不同的方式实现以上几步 ，是因为从文件系统中加载文件比
从网上加载文件快很多 。这意味着 ，Node 在加载文件时可以阻塞主线程 。加载完模块之
后可以直接进行实例化 和执行操作（而不需要分多步完成）。同时意味着 ，在返回模
块实例之前 ，是依次完成加载、实例化和执行操作 。  
![img](https://hacks.mozilla.org/files/2018/03/12_cjs_require-768x457.png)  
The CommonJS approach has a few implications, and I will explain 
more about those later. But one thing that it means is that in Node 
with CommonJS modules, you can use variables in your module specifier. 
You are executing all of the code in this module (up to the require 
statement) before you look for the next module. That means the 
variable will have a value when you go to do module resolution.  
CJS 规范的实现方式有一些影响 ，我将稍后解释 。它的实现方式也就意味着，你可以在模块
说明符中使用变量 。在查找下一个模块之前 ，你可以执行当前模块所有的代码（由 require 
声明决定）。  
But with ES modules, you’re building up this whole module graph 
beforehand… before you do any evaluation. This means you can’t have 
variables in your module specifiers, because those variables don’t 
have values yet.  
但是在使用 ES 模块规范时 ，在做任何执行之前，你要构建出整个模块图表 。这就意
味着 ，在模块说明符里还没有变量，因为那些变量都还没有值 。
![img](https://hacks.mozilla.org/files/2018/03/13_static_import-768x225.png)  
But sometimes it is really useful to use variables for module 
paths. For example, you might want to switch which module you 
load depending on what the code is doing or what environment it i
s running in.  
但是有时候在模块路径中使用变量确实很实用 ，例如 ，可以依据代码的功能或者运行的
环境切换依赖的模块 。  
To make this possible for ES modules, there’s a proposal called 
dynamic import. With it, you can use an import statement like 
import(${path}/foo.js).  
ES 模块规范现在有个动态引用的提议，去实现以上功能 。有了它 ，就可以像这样  
import(${path}/foo.js)使用引用声明了 。  
The way this works is that any file loaded using import() is 
handled as the entry point to a separate graph. The dynamically 
imported module starts a new graph, which is processed separately.  
动态引用的实现就是使用 import ( ) 加载任意文件时 ，将其作为一个单独图表的
入口点 。动态引用的模块生成一个单独的图表 ，这个过程时分开的 。  
![img](https://hacks.mozilla.org/files/2018/03/14dynamic_import_graph-768x597.png)  
One thing to note, though — any module that is in both of these 
graphs is going to share a module instance. This is because the 
loader caches module instances. For each module in a particular 
global scope, there will only be one module instance.  
有一点要注意 ，即使任意模块会出现在两个图谱中 ，但其实他们只是共享了一个模块 。这是
因为加载器对这些模块都有缓存 。对于每个模块来时 ，他们会存在一个特殊的全局范围 ，
但其实还是只有一个实体 。  
This means less work for the engine. For example, it means that the 
module file will only be fetched once even if multiple modules 
depend on it. (That’s one reason to cache modules. We’ll see 
another in the evaluation section.)  
这也就意味着减轻引擎的工作 。例如 ，这意味着 ，即使多个模块依赖一个模块 ，被依赖的
模块也只需要获取一次 。（这是缓存模块的一个原因 ，到下面执行的部分 ，我们会讲到另
一个原因）。  
The loader manages this cache using something called a module map. 
Each global keeps track of its modules in a separate module map.  
加载器使用称之为模块地图的东西去管理模块的缓存 。每一个全局作用域会使用单独的模块
地图去记录它的模块 。  
When the loader goes to fetch a URL, it puts that URL in the module 
map and makes a note that it’s currently fetching the file. Then it 
will send out the request and move on to start fetching the next file.  
当加载器想要获取一个 URL 时 ，就把这个 URL 放到模块地图里并做个标记 ，标注这个 
URL 是正在获取的文件 。然后就发出请求 ，同时继续查找下一个依赖文件 。  
![img](https://hacks.mozilla.org/files/2018/03/15_module_map-768x261.png)  
What happens if another module depends on the same file? The loader 
will look up each URL in the module map. If it sees fetching in 
there, it will just move on to the next URL.  
当其他的模块也依赖这个文件会发生什么呢 ？加载器会在模块地图中查询 ，如果发现有相
同的 URL 被标记成正在接受状态 ，加载器会继续查找下一个文件 。  
But the module map doesn’t just keep track of what files are being 
fetched. The module map also serves as a cache for the modules, as 
we’ll see next.  
但是模块地图不仅仅是对已加载的文件做跟踪记录 。其实 ，模块地图对相应的模块也做了
缓存 ，下文我们将看到 。 
#### Parsing 
#### 解析  
Now that we have fetched this file, we need to parse it into a 
module record. This helps the browser understand what the different 
parts of the module are.  
现在我们已经获取到这个模块了 ，我们需要解析它生成模块记录 。这有助于浏览器明白模块
的不同的部分具体是什么 。  
![img](https://hacks.mozilla.org/files/2018/03/25_file_to_module_record-768x306.png)  
Once the module record is created, it is placed in the module map. 
This means that whenever it’s requested from here on out, the loader 
can pull it from that map.  
一旦模块记录创建成功，就被放到模块地图 。这就表明 ，无论何时 ，只要加载器需要这个
模块 ，就可以从地图上取出来 。  
![img](https://hacks.mozilla.org/files/2018/03/25_module_map-768x367.png)  
There is one detail in parsing that may seem trivial, but that 
actually has pretty big implications. All modules are parsed as if 
they had "use strict" at the top. There are also other slight 
differences. For example, the keyword await is reserved in a 
module’s top-level code, and the value of this is undefined.  
解析过程中的这个细节看起来有点多余 ，但其实真的有很大的影响 。所有的模块在解析过程
中都默认为 “严格模式” 。这其实是有些差别的 ：例如 ，关键字 await 在模块的顶层
代码中是保留字(reserved) ，还有 this 的值是 undefined 。  
This different way of parsing is called a “parse goal”. If you parse 
the same file but use different goals, you’ll end up with different 
results. So you want to know before you start parsing what kind of 
file you’re parsing — whether it’s a module or not.  
这种不同的解析方式称为“解析目标”（parse goal）。如果你用不同的解析目标解析同一个
文件 ，你会得到不同的结果 。所以在解析文件之前，加载器要知道解析的文件是什么类型—是
模块还是其他的 。  
In browsers this is pretty easy. You just put type="module" on the 
script tag. This tells the browser that this file should be parsed as 
a module. And since only modules can be imported, the browser knows 
that any imports are modules, too.  
浏览器端要区分文件类型是很简单的 。 你只要在 script 标签内将属性 “type” 设置为 
“module” 就可以告诉浏览器将该文件作为模块去解析 。况且 ，只有模块才能被引入以后 ，
浏览器也能明确知道引入的文件都是模块 。  
![img](https://hacks.mozilla.org/files/2018/03/26_parse_goal-768x477.png)  
But in Node, you don’t use HTML tags, so you don’t have the option 
of using a type attribute. One way the community has tried to solve 
this is by using an .mjs extension. Using that extension tells Node, 
“this file is a module”. You’ll see people talking about this as the 
signal for the parse goal. The discussion is currently ongoing, 
so it’s unclear what signal the Node community will decide to use 
in the end.  
但是在 Node 环境中 ，不能使用 HTML 标签 ，所以你不能使用 type 属性去标注文
件为模块类型 。社区中已经想到了一种解决办法 ，使用 “.mjs” 扩展类型 ，告诉 Node 
该文件是模块 。 在社区中 ，你或许听到过大家讨论过为解析目标设置这种标记 。这样的
讨论现在还在持续 ，所以 Node 社区目前还没有决定使用哪种标记作为解析目标。  
Either way, the loader will determine whether to parse the file as 
a module or not. If it is a module and there are imports, it will 
then start the process over again until all of the files are fetched 
and parsed.  
总之 ，加载器需要去定分析的文件是不是模块 。如果是模块并且模块有很多引用 ，将继续
一遍一遍地执行解析过程直到获取并解析所有的文件 。  
And we’re done! At the end of the loading process, you’ve gone from 
having just an entry point file to having a bunch of module records.  
最终我们完成了解析！在加载过程的最后 ，将得到一个拥有一束模块记录的入口文件。  
![img](https://hacks.mozilla.org/files/2018/03/27_construction-768x624.png)  
The next step is to instantiate this module and link all of the 
instances together.  
下一步的工作就是实例化这个模块并且连结所有的实例 。  
#### Instantiation 
#### 实例化  
Like I mentioned before, an instance combines code with state. 
That state lives in memory, so the instantiation step is all about 
wiring things up to memory.  
就像我前面提到的 ，一个实例包括代码和状态 。而状态是存储在内存中的 ，所以实例化
的过程都是关于连接内存 。  
First, the JS engine creates a module environment record. This 
manages the variables for the module record. Then it finds boxes 
in memory for all of the exports. The module environment record 
will keep track of which box in memory is associated with each export.  
首先，JS 引擎创建一个模块环境记录（module environment record） 。这个环境记录
中控制着模块记录的变量（module record）。接着它会找到内存存放所有输出的盒子 ，并
且跟踪记录内存盒子相关联的输出 。  
These boxes in memory won’t get their values yet. It’s only after 
evaluation that their actual values will be filled in. There is one 
caveat to this rule: any exported function declarations are 
initialized during this phase. This makes things easier for evaluation. 
这些内存中盒子并没有获取到相应的值 。只有到执行（evaluation）完成之后才将它们真正的
值填充进去 。这里有一点值得注意下 ：任何输出的方法声明都是在这个过程中实例化的 。这样做
是让执行变得更简单 。  
To instantiate the module graph, the engine will do what’s called a depth 
first post-order traversal. This means it will go down to the bottom of 
the graph — to the dependencies at the bottom that don’t depend on 
anything else — and set up their exports.  
为了实例化模块图表 ，引擎会执行称之为一次深层次的第一次输出的遍历（a depth first 
post-order traversal） 。这意味着它会沿着图表底层—到达底层的依赖，就是那些没有
依赖其他模块的模块—然后设置它们的输出。  
![img](https://hacks.mozilla.org/files/2018/03/30_live_bindings_01-768x316.png)  
The engine finishes wiring up all of the exports below a module — all 
of the exports that the module depends on. Then it comes back up a 
level to wire up the imports from that module.  
引擎完成与模块所有依赖的连接 ，然后回过来连接依赖该模块的其他模块 。  
Note that both the export and the import point to the same location 
in memory. Wiring up the exports first guarantees that all of the 
imports can be connected to matching exports.  
注意输出和引用的指向是内存中的同一个地址 。先连接输出是确保所有的引用能够连接到相
匹配的输出 。  
![img](https://hacks.mozilla.org/files/2018/03/30_live_bindings_02-768x316.png)  
This is different from CommonJS modules. In CommonJS, the entire 
export object is copied on export. This means that any values (like 
numbers) that are exported are copies.  
这一点是和 CJS 模块规范所不同的 。在 CJS 模块规范中 ，输出的对象输出时都是复制的 。
这也就意味着任何输出的值都是副本 。  
This means that if the exporting module changes that value later, the 
importing module doesn’t see that change.  
也就是说如果改变输出的值 ，引用该值的模块并不能相应的改变 。 
![img](https://hacks.mozilla.org/files/2018/03/31_cjs_variable-768x174.png)  
In contrast, ES modules use something called live bindings. Both 
modules point to the same location in memory. This means that when the 
exporting module changes a value, that change will show up in the 
importing module.  
相反 ，ES 模块规范的绑定称之为实时绑定（live binding）。两个有引用关系的模块
是指向内存中相同的地址 。当输出模块的值改变时 ，引入该值的模块会相应的改变 。  
Modules that export values can change those values at any time, but 
importing modules cannot change the values of their imports. That being 
said, if a module imports an object, it can change property values that 
are on that object.  
输出该值的模块可以随时改变值 ，但是引用该值的模块时不能改变它们引用的值的 。
话虽这么说 ，如果引用的是一个对象 ，也是可以改变对象的属性值的 。 
![img](https://hacks.mozilla.org/files/2018/03/30_live_bindings_04-768x316.png)  
The reason to have live bindings like this is then you can wire up all 
of the modules without running any code. This helps with evaluation 
when you have cyclic dependencies, as I’ll explain below.  
像这样实时绑定的原因是你可以不用运行任何代码就可以打通所有的模块 。这样当有循环的
依赖时有助于执行操作 ，在下文我会解释 。  
So at the end of this step, we have all of the instances and the 
memory locations for the exported/imported variables wired up.  
这一步完成之后 ，就拥有了所有的实例 ，并且打通了内存中相应的输出/引入变量 。  
Now we can start evaluating the code and filling in those memory 
locations with their values.  
现在我们可以执行代码并且用值填充的相应地内存地址中 。  
#### Evaluation  
#### 执行  
The final step is filling in these boxes in memory. The JS engine 
does this by executing the top-level code — the code that is 
outside of functions.  
最后一步是填充内存中的盒子 。JS 引擎通过执行高阶层的代码—方法外面的代码实现的 填充的。  
Besides just filling in these boxes in memory, evaluating the 
code can also trigger side effects. For example, a module might 
make a call to a server.  
除了填充内存中的盒子 ，对执行代码也会触发副作用 。例如 ，模块可以与服务器通信 。  
![img](https://hacks.mozilla.org/files/2018/03/40_top_level_code-768x224.png)  
Because of the potential for side effects, you only want to evaluate 
the module once. As opposed to the linking that happens in 
instantiation, which can be done multiple times with exactly the 
same result, evaluation can have different results depending on 
how many times you do it.  
因为这些副作用 ，你仅仅只想对模块执行一次求值 。与实例化中的连接截然相反 ，
实例化中的连接无论执行多少次 ，结果都绝对相同 。执行代码会因为你执行的次
数不同而导致拥有不同的结果 。  
This is one reason to have the module map. The module map 
caches the module by canonical URL so that there is only one 
module record for each module. That ensures each module is 
only executed once. Just as with instantiation, this is 
done as a depth first post-order traversal.  
这也是生成模块地图(module map)的一个原因 。模块地图是依据规范的
 URL 缓存模块的 ，这样才能保证模块记录中每个模块的唯一性 。那样也确
 保了每个模块只被执行一次 。 就行实例化的过程 ，这是一次深层次的第
 一次输出的遍历 。  
What about those cycles that we talked about before?  
前面我们讨论的循环是什么 ？  
In a cyclic dependency, you end up having a loop in the 
graph. Usually, this is a long loop. But to explain the 
problem, I’m going to use a contrived example with a short loop.  
在互相依赖的模块中 ，图谱中将会以一个循环结束 。通常 ，是一个无限循环 。但为
了解释这个问题 ，我会用一个小的循环的假例子进行解释 。  
![img](https://hacks.mozilla.org/files/2018/03/41_cjs_cycle-768x344.png)  
Let’s look at how this would work with CommonJS modules. First, 
the main module would execute up to the require statement. Then 
it would go to load the counter module.  
让我们看下在 CJS 模块规范中是如何实现的 。首先 ，main 模块将参照需求声
明执行 。然后开始加载 counter 模块 。  
![img](https://hacks.mozilla.org/files/2018/03/41_cyclic_graph-768x432.png)  
The counter module would then try to access message from the 
export object. But since this hasn’t been evaluated in the 
main module yet, this will return undefined. The JS engine 
will allocate space in memory for the local variable and set 
the value to undefined.  
Counter 模块会尝试从输出的对象获取 message 变量 。但是因为代码还未在 
main 模块评价(evaluated) ，这时会返回 undefined 。JS 引擎会在内存
中为本地的变量分配空间并执行为 undefined 。  
![img](https://hacks.mozilla.org/files/2018/03/42_cjs_variable_2-768x174.png)  
Evaluation continues down to the end of the counter module’s 
top level code. We want to see whether we’ll get the correct 
value for message eventually (after main.js is evaluated), 
so we set up a timeout. Then evaluation resumes on main.js.  
执行过程继续沿着 counter 模块的高层次的代码直到末尾 。我们想看看最终能否
得到正确的结果 (在执行 main.js 之后) ，所以我们设添加一个 setTimeout 。
然后代码重新执行到 main.js 。  
![img](https://hacks.mozilla.org/files/2018/03/43_cjs_cycle-768x344.png)  
The message variable will be initialized and added to memory. 
But since there’s no connection between the two, it will stay 
undefined in the required module.  
Message 变量会被初始化并且添加到内存中， 但是在两者没有建立联系之前 ，这
个变量在引入的模块中的状态一直是 undefined 。  
![img](https://hacks.mozilla.org/files/2018/03/44_cjs_variable_2-768x331.png)  
If the export were handled using live bindings, the counter 
module would see the correct value eventually. By the time 
the timeout runs, main.js’s evaluation would have completed 
and filled in the value.  
如果输出是使用实时绑定处理的 ，counter 模块最终会拿到正确的值 。到那时 ，
setTimeout 内的方法会执行 ，main.js 的执行已经结束并在内存中赋值 。  
Supporting these cycles is a big rationale behind the design 
of ES modules. It’s this three-phase design that makes them possible.  
支持这样的循环是 ES 模块规范设计背后的一个重要原理 。是三步骤的设计是这种循环成为可能 。  
What’s the status of ES modules?  
With the release of Firefox 60 in early May, all major browsers 
will support ES modules by default. Node is also adding support, 
with a working groupdedicated to figuring out compatibility 
issues between CommonJS and ES modules.  
随着五月初 Firefox 60 的发布 ，所有主流的浏览器都默认支持 ES 模块规范 。
Node 也正在增加支持 ， 他们的一个工作组正在致力于解决 CJS 和 ES 两种模块规
范的兼容性问题  。  
This means that you’ll be able to use the script tag with 
type=module, and use imports and exports. However, more module 
features are yet to come. The dynamic import proposal is at 
Stage 3 in the specification process, as is import.meta which 
will help support Node.js use cases, and the module resolution 
proposal will also help smooth over differences between browsers 
and Node.js. So you can expect working with modules to get even 
better in the future.  
这就意味着 ，你将能够在 script 标签中使用 “type=module” 属性 ，然后使用 
imports 和 exports 。然而 ，更多的模块特性还没有实现 。动态引入提议还处在
规范的第三阶段 ，和  import.meta 一样 ，这个特性对支持 Node.js 用例 ，
模块解析提议对平滑的在浏览器和 Node.js 之间使用模块很有帮助 。所以 ，你能
够想象出在不久的将来 ，可以更好的使用模块 。  
