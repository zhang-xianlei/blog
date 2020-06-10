# <center>[一个成功的 Git 分支管理模式](https://nvie.com/posts/a-successful-git-branching-model/)</center>  

这篇博客中介绍的是一年前一些项目中使用的被证明比较成功的开发模式，知道现在，才真正的有时间去总结，把这种模式写出来。我不想讨论项目具体的细节，只是关于分支的策略和发布的处理。  

![img](https://nvie.com/img/git-model@2x.png)

## 为什么是git

读者可以通过[这个页面](http://git.or.cz/gitwiki/GitSvnComparsion)了解 Git 和集中式资源管理系统的详细优缺点对比，这里面有很多讨论。作为一个开发者，在同类似的工具中，我最喜欢 Git。Git 真正地改变了开发者对合并和新建分支的认识。对于一个使用过经典的集中式资源管理系统(Subversion)的开发者来说， 合并和新建分支是一件有点恐怖的事情，并且这些操作还是偶尔执行的。  

但是使用Git，这些操作是极其简单的，被认为是日常工作流程的核心部分。例如，关于 CVS/Subversion 的书籍中，在书后面的章节中才会首次提及新建和合并分支，而关于 Git 的书籍中，一般会用整个第三章介绍新建和合并分支。

因其简单和重复的特点，使得新建和合并分支变得不再恐怖。新建和合并分支认为是对于版本控制工具最有帮助的。

让我们直接通过开发模式，了解这个工具。接下来介绍的模式，对于每个想要控制软件开发孔目的的项目组成员所必须遵循的一系列操作步骤。  

## 分散但又集中  

这种分支模式，我们使用的并且表现很好的代码库设置就是要设置一个中央仓库，记住这个仓库是唯一一个被设置成为中央仓库的(从技术层面来说，Git 作为一个分布式资源管理系统，是没有中央仓库这种设置的)。自从‘origin’被所有的 Git 使用者熟识之后，这个中央库就被称为 ’origin‘。  

![img](https://nvie.com/img/centr-decentr@2x.png)

每个开发人员从 origin 库中拉取和推动代码。但是除了中央库的拉取-推送的关系，每个开发者还需要获取其他开发小组同事的推送。举个例子，在两个以上的开发人员共同开发一个大的功能，再推送到 origin 之前，需要一个过程让这个功能逐渐成熟。上图，这里有三个小组，分别是 Alice 和 Bob，Alice 和 David，以及 Clair 和 David。  

技术上，无非就是 Alice 新建了一个远程库，并命名为 bob，指向 Bob 的代码库，反之亦然。  

## 主分支

这个开发模式在核心部分，受到现有开发模式很大的启发。中央库拥有两个主要的分支并且拥有无限的生命周期：

* master  
* develop  

![img](https://nvie.com/img/main-branches@2x.png)

origin 上的主分支 master 应该为所有 Git 用户熟知，与其并行的分支称之为 develop。  

一般会把 origin/master 作为主分支，并且该分支的源码的 HEAD 一直反映即将打包上线的状态。

一般会把 origin/develop 作为源码的 HEAD 一直反映为下个版本最后提交的功能状态的主分支。有些开发者会称之为“集成分支”，一般也是在这个分支上自动编译打包。  

当 develop 分支上的源码达到了一种稳定的状态，并且转杯发布上线了，所有改变应该合到 master 分支，并打上发布版本号的标签。具体细节，下文我们继续讨论。  

因此，每当将新开发代码合并到 master 分支上时，就是产品要发布的时候。只有严格遵守这一点，理论上，才能使用 Git 钩子脚本实现自动构建以及每次将代码转化成服务器上的产品时，都会有个备注提交到主分支上。  

## 支持多分支

除了 master 和 develop 两个主要分支，这个开发模式开发团队成员使用多种多样的支持分支进行并行开发，项目易于增加新功能，随时准备产品发布以及快速响应线上产品bug修复。不想主分支，这些分支一般生命周期很短，并最终会被彻底删除。

常用的不同类型的分支：

* Feature branches
* Release branches
* Hotfix branches

这些分支都有特殊的目的，并且与遵循关于选取某个分支作为原始分支并且必须合并到相应的原始分支上等严格的规则，售后我们将继续探讨这些。  

这些分支的“特殊性”并非来自技术本身的所具有的概念，分支类型的分类取决于我们使用的目的，它们仅仅是 Git 的分支。  

### Feature 分支

始于：

develop

合并到：

develop

分支命名规则：

除了： master, develop, release-*和hot-*。  

![img](https://nvie.com/img/fb@2x.png)  

feature 分支（有时称为 topic 分支）是用于开发即将发布新功能或者扩展线上的一个老功能。当开发新功能时，将要被合并到发布目标的功能或许还是位置的。一个 feature 分支的本质就是会存在于整个新功能的开发过程中，但是最终会被合并到 develop 分支上（确定最终添加新功能到即将发布的版本）或者被废弃（可能是一个没有达到预期效果的功能）。  

典型的 feature 分支只出现在开发者仓库中，而不会出现在 origin 仓库中。

#### <center>新建一个 feature 分支</center>  

开发新功能时，在 develop 分支上新建 feature 分支

     $ git checkout -b myfeature develop
     Switch to a new branch "myfeature"  

#### <center>将 feature 分支合并到 develop 分支</center>

新功能开发完成后，将分支合并到 develop 分支，最终添加到即将发布的版本上：

    $ git checkout develop
    Switch to branch 'develop'
    $ git merge --no-off myfeature
    Updating ea1b82a...05e9557
    (Summary of changes)
    $ git branch -d myfeature
    Delete branch myfeature(was 05e9557).
    $ git push origin develop

合并代码使用 --no-ff 参数，会生成一个新的 commit 信息，即使可以使用 fast-forward 模式合并。这样做可以避免丢失 feature 分支的详细历史信息，会将所有的提交信息随新功能的合并而合并到其他分支上。可以通过下面的图例进行对比两者的不同之处： 

![img](https://nvie.com/img/merge-without-ff@2x.png)

后面那种合并方式，是不能通过 Git 历史记录中查看已经合并的新功能分支在实施过程中的提交信息的——只有通过手动读取所有的历史信息查看。如果使用后面的合并方式，想要恢复整个 feature 分支（例如，一系列的提交信息，是一件很头疼的事，但是如果使用 --no-ff 参数进行合并分支，是很容易实现的。  

当然，使用第一种方式，会生成一个比较大的提交信息，但是利总是大于弊的。  

### Release 分支

始于：

develop

合并到：

develop 和 master

分支命名规则：

release-*

release 分支是用来为新产品发布做准备工作的。在这个分支上允许最后对即将发布的版本进行细节上的调整（dot of i`s and ）。此外还可以对一些小的 bug 进行修复，以及添加与版本发布相关的信息（例如：版本号、打包上线日期等）。在 release 分支上做这些工作的同时, develop 分支可以接受为另外一次大版本发布的新功能开发。  

从 develop 分支上拉取 release 分支的关键点是确定整个开发过程中对 release 分支需求状态的适时反馈。至少能够及时保证所有将要发布打包的新功能已经合并到 develop 分支上。并且规划中的下次版本的迭代新功能没有合并到 develop 分支上——它们需要等 从develop 分支上 创建 release 分支之后。  

恰好在新建一个 release 分支的时候，即将发布的版本获得版本号——不能太早获取。直到那一刻，从 develop 分支上才能获取下一个 release 分支的版本号，除非 release 分支创建好之后，才能确认下个一个 release 分支的版本号最终是 0.3 还是 1.0。release 版本号的确定，取决于 release 创建的时间点，以及项目在版本号规则。

#### <center>创建一个 release 分支</center>

release 分支是创建在 develop 分支上的。假如当前产品的版本号是 1.1.5 并且有个大的版本即将要发布。develop 的状态是可以发布下一个版本，所以可以确定即将发布的版本为 1.2（而不是 1.16.或者 2.0）。所以可以给 release 分支取一个能反馈新版本的名称：

    $ git chekcout -b release-1.2 develop
    Switched to a new branch "release-1.2"
    $ ./bump-version.sh 1.2
    File modified successfully, version bumped to 1.2
    $ git commit -a -m "Bumped version number to 1.2"
    1 files changed, 1 insertions(+), 1 deleltions(-)

新建分支，并切换到新分支，更改版本号。这里，bump-version 是一个虚构的用于改变一些工作空间内关联版本号的文件文件名的脚本。然后提交更改版本号的操作。

这个 release 分支只会存在一段时间，直到当前版本发布。整个分支的生命周期中，会修复一些 bug（而不是在 develop 分支上）。新增大的功能点是被禁止的。该分支必须合并到 develop 分支，然后，等待下一个版本的发布。  

#### <center> release 分支的结束</center>

当 release 分支的状态已经可以成为一个真正的可发布版本，一些流程需要执行。首先要合并到 master 分支（记住，master 分支的提交信息都是一个新 release 分支）。然后， master 分支上的提交信息一定要打标签，方便以后开发时以历史版本作为参考。最终在 release 版本上的更改要合并到 develop 分支，以保证以后的 release 版本能够包含这些修复的 bug。

Git 的前两个操作步骤：

    $ git checkout master
    Switched to branch 'master'
    $ git merge --no-ff release-1.2
    Merge made by recursive
    (summary of changes)
    $ git tag -a 1.2

现在发布已经完成，并且为将来发布打好标记。  

<div style="border: 1px solid rgba(0,0,0,.35); border-radius: 4px; text-indent:10px;padding:20px">
备注：也可以使用 -s 或者 -u 参数为打的标签加密。
</div>

为了保存在 release 分支上做的更改，需要将 release 分支合并到 develop 分支上，所以，使用 Git：

    $ git checkout develop
    Switched to branch 'develop'
    $ git merge --no-ff release-1.2
    Merge made by recursive
    (summary of changes)

这一步很可能会导致冲突（或许甚至，因为改变了版本号）。如果存在冲突，就处理它并提交。  

现在，是真的完成了，release 分支只要不需要它，就可以删除了。

    $ git branch -d release-1.2
    Delete branch release-1.2 (was ff452fe)

### Hotfix 分支

始于：

master

必须合并到：

develop 和 master

分支命名规范：

hotfix-*

![img](https://nvie.com/img/hotfix-branches@2x.png)

hotfix 分支的创建也是意味着产品需要发布，在这方面，它们和 release 分支很像，尽管发布不是计划之中的。它们的创建是针对线上产品出现非预期的状态时必须做出应急处理。当一个特定版本的产品出现严重错误时必须立即解决，hotfix 分支，将要从与当前产品版本保持一直的 master 分支上创建。当团队中成员在快速修复 bug 的同时，本质上来说其他开发人员（在 develop 分支上）是可以继续开发其他功能的。

#### <center>创建 hotfix 分支</center>
