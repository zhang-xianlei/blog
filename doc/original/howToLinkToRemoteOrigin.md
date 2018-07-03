## 使用 SSH 连接到 GitHub
[原文内容](https://help.github.com/articles/connecting-to-github-with-ssh/)

#### 一、什么是 SSH
使用 SSH 协议，可以连接并获得认证到远程的服务器和服务。使用 SSH 秘钥，访问 GitHub 就不需要每次提供名称和密码了。  
设置 SSH 秘钥时，
[需要生成一个 SSH 秘钥并添加到 SSH 代理](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)，
然后[添加秘钥到 GitHub 账户](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/)。添加 SSH 秘钥到
SSH 代理时，为了确保 SSH 秘钥拥有一个额外的安全层，可以设置一个密码。更多详细内容可以查看
[使用 SSH 秘钥密码](https://help.github.com/articles/working-with-ssh-key-passphrases/)。  
如果仓库的拥有的组织使用 SAML 单点登陆方式，在使用 SSH 秘钥连接的时候需要先授权。详情可查看
[授权 SSH 秘钥连接到一个 SAML 单点登录的组织](https://help.github.com/articles/authorizing-an-ssh-key-for-use-with-a-saml-single-sign-on-organization/)。  
建议定期检查 SSH 秘钥列表，废除无效和可能存在危险的列表。
#### 二、检查已经存在的 SSH 秘钥
在生成 SSH 秘钥之前，要检查当地是否已经存在 SSH 秘钥。
<div style="background:#dbe2d4;border: 1px solid #819b69;color:#4d712b;">
    注意：DSA 秘钥在 OpenSSH 7.0 不被支持。如果你的操作系统使用 OpenSSH，配置 SSH 时，需要使用一个替代类型，例如 RSA 秘钥。例如，如果你的
    操作系统是 MacOs Sierra，可以使用 RSA 秘钥配置 SSH。
</div> 
具体的步骤如下：

1.  打开终端。
2. 输入 ls -al ~/.ssh 查看本地是否已经有 SSH 秘钥：  

        ls -al ~/.ssh
        # Lists the files in your .ssh directory, if they exist
3. 检查文件夹列表去查看是否已经存在一个 SSH 公钥。

公钥的文件名，默认是下面的其中一个：  
id_dsa.pub  
id_ecdsa.pub  
id_ed25519.pub  
id_rsa.pub  

如果公钥和私钥没有成对出现，或者不想使用已存在的 SSH 秘钥用于连接 GitHub，可以生成新的 SSH 秘钥。  

如果你想用已经存在的一对公钥和私钥去连接 GitHub，你可以添加 SSH 秘钥到 SSh 代理。
<div style="background:#d6e8f4;border: 1px solid #98c1d9;color:#284d70;">
提示：如果终端返回一个错误 '~/.ssh 不存在'，不用担心！接下来，我们通过生成一个新的 SSH 秘钥去创建它。
</div>


#### 三、生成 SSH 秘钥并添加到 SSH 代理
如果在使用 SSH 秘钥时，不想每次重新登录时使用密码，你可以添加秘钥到 SSH 代理，代理能够管理秘钥并记住密码。
##### 生成新的 SSH 秘钥
1. 打开终端。
2. 复制下面的脚本，并替换成自己的 GitHub 邮箱地址。  

        ssh-keygen -t rsa -b 4096 -C "your_email@example.com"  
    这样就使用提供的邮箱地址作为标签生成了一个新的 SSH 秘钥。  

        Generating public/private rsa key pair.
3. 当弹出提示，输入一个文件用于存储秘钥，直接点击 Enter 键。这样就存储到默认的文件地址。  

        Enter a file in which to save the key (/Users/you/.ssh/id_rsa): [Press enter] 
4. 在提示中，输入一个安全密码。更多相关信息，可以点击查看
    ["使用 SSH 秘钥密码"](https://help.github.com/articles/working-with-ssh-key-passphrases/)。
    
        Enter passphrase (empty for no passphrase): [Type a passphrase]
        Enter same passphrase again: [Type passphrase again]
##### 添加 SSH 秘钥到 SSH 代理
把 SSH 秘钥添加到代理时，使用默认的 macOs ssh-add 命令，而不是使用 macports、homebrew 或者其他的外部资源安装的应用。
1. 在后台启动 ssh-agent

        $ eval "$(ssh-agent -s)"
        Agent pid 595662.  
2. 如果使用的时 macOs Sierra 10.12 或者更新的版本， 需要更改 ~/.ssh/config 文件去自动生成 ssh-agent 使用的秘钥，并且存储语句到本地的钥匙串。  

    <div style="border: 1px solid #819b69;color:#4d712b;">
        Host *  <br/>
          AddKeysToAgent yes <br/>
          UseKeychain yes <br/>
          IdentityFile ~/.ssh/id_rsa
    </div>
3. 添加 SSH 私钥到 ssh-agent 并且保存钥匙串的密码。如果使用不同的名字新建的钥匙，或者添加的是已经存在的名称不相同的钥匙，在终端命令里将 id_rsa
替换成和私钥的文件名。
        $ ssh-add -K ~/.ssh/id_rsa  
    <div style="border: 1px solid #819b69;color:#4d712b;">
        注意： -K 是 Apple 标准版本的 ssh-add 选项，是当向 ssh-agent 中添加 ssh 秘钥时，在钥匙串中存储密码的。
        如果没有安装 Apple 标准版本，将会报错。查看更多关于报错的信息，请查看 
        <a href="https://help.github.com/articles/error-ssh-add-illegal-option-k/">ERROR: ssh-add: illegal option --K</a>
    </div>    
4. 添加 SSH 秘钥到 GitHub 账户。
#### 四、添加一个新的 SSH 秘钥到 GitHub 账户
使用 SSH 秘钥配置 GitHub 账户，需要添加秘钥到 GitHub 账户中。

<div style="border: 1px solid #819b69;color:#4d712b;">
    注意： DSA 秘钥在 OpenSSH 7.0 是不被支持的。如果操作系统使用 OpenSSH，设置 SSH 时，需要使用一个替代类型的秘钥，例如 RSA 秘钥。举个例子，
    如果操作系统是 MacOs Sierra，设置 SSH 时可以使用一个 RSA 秘钥。
</div>   

1. 复制 SSH 秘钥到剪贴板  
如果SSH秘钥文件使用与例子的代码不同的文件名，改变文件名以匹配当前的步骤。拷贝秘钥的时候，不能添加空白和新行。    

        $ pbcopy < ~/.ssh/id_rsa.pub
        # Copies the contents of the id_rsa.pub file to your clipboard
2. 在任意页面的右上侧，点击头像，然后点击设置。
3. 在用户设置侧边栏，点击 SSH and GPG keys。
4. 点击 New SSH key 或者 Add SSH key。
5. 在 'title' 区，为新的秘钥添加一个描述标签。例如，如果你在使用一个私人 Mac，你可以称之为'Personal Macbook Air'。
6. 复制秘钥到 'key' 区。
7. 点击添加。
8. 如果有弹窗，输入 GitHub 密码确认。
#### 五、测试 SSH 连结
测试连接时，需要使用之前设置的 SSH 秘钥时的密码授权。
1. 打开终端。
2. 输入下面的命令。   

        $ ssh -T git@github.com
        # Aiiempts to ssh to GitHub
    你会看到如下提示语：
        
        The authenticity of host 'github.com (IP ADDRESS)' can't be established.
        RSA key fingerprint is 16:27:ac:a5:76:28:2d:36:63:1b:56:4d:eb:df:a6:48.
        Are you sure you want to continue connecting (yes/no)?
    或者是以下提示语：
        
        The authenticity of host 'github.com (IP ADDRESS)' can't be established.
        RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.
        Are you sure you want to continue connecting (yes/no)?
3. 验证步骤2中出现的任意一条中出现的指纹图谱，然后输入 yes

        Hi username! You've successfully authenticated, but GitHub does not
        provide shell access.
4. 检验结果语句中是否包含自己的用户名，如果接收到 'permission denied'的语句，查看 
['Error:Permission denied(public key)'](https://help.github.com/articles/error-permission-denied-publickey)

这样就可以在本地愉快的玩耍了。
