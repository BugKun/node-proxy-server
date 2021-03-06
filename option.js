﻿const path = require("path");
const fs = require("fs");

module.exports = {
    mode: "normal", //normal or maintainace
    maintainace: {
        value: "maintainace",
        ContentType: "text/html"
    },
    errPage: {
        404: {
            HTML: fs.readFileSync('./error/404.html'),
            warning: "Proxy：404页面"
        },
        500: {
            HTML: fs.readFileSync('./error/500.html'),
            warning: "Proxy：500页面"
        }
    },
    ssl: [
        {
            host: /^www.github.com$/,
            key: fs.readFileSync('./ssl/www.github.com.key'),
            cert: fs.readFileSync('./ssl/www.github.com.crt')
        }
    ],
    https: [
        {
            host: /^www.github.com$/,
            options: { target: 'http://localhost:8080' },
            description: "Proxy：My github"
        }
    ],
    http: [
        {
            host: /^www.github.com$/,
            options: { target: 'http://localhost:8080' },
            description: "Proxy：My github"
        },
        {
            host: /^proxy.domian.com$/,
            options: { target: 'http://www.google.com', changeOrigin: true },
            description: "Proxy：My proxy github"
        }
    ],
    listen: {
        https: 443,
        http: 80
    }
}
