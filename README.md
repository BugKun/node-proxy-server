# node-proxy-server

description: If you do not understand how to setup web servers such as nginx, you can use this to help you make a reverse proxy server, instead of nginx!

简介：如果你不知道如何配置服务器例如nginx，你可以使用这个来做一个反向代理服务器，来取代用nginx！

## 如何使用
### 前提

安装 nodejs 和 npm 和 git

### 安装
复制该项目到本地硬盘.

	git clone https://github.com/BugKun/node-proxy-server.git

然后运行

	npm install

### 开始运行
命令行输入并运行

	npm start
  
### 使用实例
* 你只需按下列规则修改'option.js'即可。
* 'option.js'返回的数据要是JSON数据，可使用这样的配置来实现。
```JavaScript 
module.exports = {} 
```

#### mode
  只有两个字符串参数，分别是 'normal' 和 'maintainace'，'normal'为正常运行模式，'maintainace'为维护模式，不论访问任何页面都返回维护信息的提示，当然你也可以用   它来做一些网站身份的校验工作。
  
#### maintainace
  配置的是一个object，里面有'value'，即网站维护时提示的信息，'ContentType'为设置类型。
  
  ```JavaScript 
  maintainace: {
        value: "maintainace",
        ContentType: "text/html"
  }
 ```
  
#### errPage
  配置错误页面，仅支持404和500错误。你可以使用'fs'来读取你自定义的错误页面，也可以直接写字符串。
  ```JavaScript 
  errPage: {
        404: {
            HTML: fs.readFileSync('./error/404.html'),
            warning: "Proxy：404页面"
        },
        500: {
            HTML: fs.readFileSync('./error/500.html'),
            warning: "Proxy：500页面"
        }
    }
  ```
  
#### ssl
 配置SSL证书，可使用正则匹配的方式设置多个SSL证书。
 ```JavaScript
 ssl: [
        {
            host: /^www.github.com$/,
            key: fs.readFileSync('./ssl/www.github.com.key'),
            cert: fs.readFileSync('./ssl/www.github.com.crt')
        }
    ]
 ```
 
 #### https
 配置HTTPS的（反向）代理，可使用正则匹配的方式设置多个域名。options的配置与[node-http-proxy](https://github.com/nodejitsu/node-http-proxy)的相同。
 ```JavaScript
 https: [
        {
            host: /^www.github.com$/,
            options: { target: 'http://localhost:8080' },
            description: "Proxy：My github"
        }
    ]
    
 ```
 
 #### http
 与https相同。
 
 #### listen
 配置监听的端口，参数为整型。
 ```JavaScript
 listen: {
        https: 443,
        http: 80
    }
 ```
 
## Usage

### Prerequisite

You will need node and npm install 


### Install
Git clone the repository.

	git clone https://github.com/BugKun/node-proxy-server.git

Then run 

	npm install

### Run
Run 

	npm start
### Use Cases
* You should modify 'option.js' according to the following rules.
* The 'option.js' is return a JSON data.
```JavaScript 
module.exports = {} 
```

#### mode
  There are only two options, 'normal' and 'maintainace'. Maintenance mode can display the maintenance information when users visit any page. Of course, you also can use it to verify the identity for your website.
  
#### maintainace
  Configured is an object, which has 'value' and 'ContentType'. The 'value' is a text, which is the information about the website status , when the site is maintained. 
  ```JavaScript 
  maintainace: {
        value: "maintainace",
        ContentType: "text/html"
  }
  ```
  
#### errPage
  Configuration error page, only 404 and 500 errors are supported. You can use 'fs' to import your custom error page, or write a text.
  ```JavaScript 
  errPage: {
        404: {
            HTML: fs.readFileSync('./error/404.html'),
            warning: "Proxy：404页面"
        },
        500: {
            HTML: fs.readFileSync('./error/500.html'),
            warning: "Proxy：500页面"
        }
    }
  ```
  
#### ssl
 Configure an SSL certificate. You can use regular matching to set multiple SSL certificates.
 ```JavaScript
 ssl: [
        {
            host: /^www.github.com$/,
            key: fs.readFileSync('./ssl/www.github.com.key'),
            cert: fs.readFileSync('./ssl/www.github.com.crt')
        }
    ]
 ```
 
 #### https
 Configure the (reverse) proxy for HTTPS, and use regular matching to set multiple domains. The configuration of options are the same as [node-http-proxy](https://github.com/nodejitsu/node-http-proxy).
 ```JavaScript
 https: [
        {
            host: /^www.github.com$/,
            options: { target: 'http://localhost:8080' },
            description: "Proxy：My github"
        }
    ]
    
 ```
 
 #### http
 It is the same as the https.
 
 #### listen
 This is the instance to configure the listening port, and the listening port must be a integer.
 ```JavaScript
 listen: {
        https: 443,
        http: 80
    }
 ```
