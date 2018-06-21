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
###### 生成新的 SSH 秘钥
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
###### 添加 SSH 秘钥到 SSH 代理
When adding your SSH key to the agent, use the default macOS ssh-add command, and not an application installed 
by macports, homebrew, or some other external source.
把 SSH 秘钥添加到代理时，使用默认的 macOs ssh-add 命令，而不是使用 macports、homebrew 或者其他的外部资源安装的应用。
1. 在后台启动 ssh-agent

        $ eval "$(ssh-agent -s)"
        Agent pid 595662.  
2.  如果使用的时 macOs Sierra 10.12 或者更新的版本， 需要更改 ~/.ssh/config 文件去自动生成 ssh-agent 使用的秘钥，并且存储语句到本地的钥匙串。  

    <div style="border: 1px solid #819b69;color:#4d712b;">
        Host *  <br/>
          AddKeysToAgent yes <br/>
          UseKeychain yes <br/>
          IdentityFile ~/.ssh/id_rsa
    </div>
         
#### 四、
#### 五、
