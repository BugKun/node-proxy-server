# node-proxy-server

description: If you do not understand how to setup web servers such as nginx, you can use this to help you make a reverse proxy server, instead of nginx!

简介：如果你不知道如何配置服务器例如nginx，你可以使用这个来做一个反向代理服务器，来取代用nginx！

## 如何使用
* 你只需按下列规则修改option.js即可。
* option.js返回的数据要是JSON数据，可使用
```JavaScript 
module.exports = {} 
```
来实现。

#### mode
  只有两个字符串参数，分别是 normal 和 maintainace，normal为正常运行，maintainace为维护模式，不论访问任何页面都返回维护信息的提示，当然你也可以用   它来做一些网站身份的校验工作。
#### maintainace
  配置的是一个object，里面有value，即网站维护时提示的信息，ContentType为设置类型
  ```JavaScript 
  maintainace: {
        value: "maintainace",
        ContentType: "text/html"
  }
  ```
#### errPage
  配置错误页面，仅支持404和500错误。你可以使用fs来读取你自定义的错误页面，也可以直接写字符串。
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
 
## How to use it
