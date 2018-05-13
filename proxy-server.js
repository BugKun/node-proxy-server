const httpProxy = require('http-proxy'),
    tls = require('tls'),
    option = require("./option.js"),
    https = require('https'),
    http = require('http'),
    proxy = httpProxy.createProxyServer({});


if (option.mode === "maintainace") {
    http.createServer((req, res) => {
        let host = req.headers.host,
            ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        console.log(`\n${new Date().toLocaleString()}
        client ip: ${ip}
        client UA: ${req.headers["user-agent"]}
        host: ${host}
        url: http://${host + req.url}`);

        res.writeHead(200, {'Content-Type': option.verify.ContentType});
        res.end(option.verify.value);
    }).listen(option.listen.http);
    console.log(`verifying mode is active and listening on port ${option.listen.http}`);
    return;
}


// catch error
proxy.on('error', (err, req, res) => {
    console.log("Oops, error", err);
    res.writeHead(500, {
        'Content-Type': 'text/html'
    });
    res.end(option.errPage["500"].HTML);
    console.log(option.errPage["500"].warning);
});

const proxyServer = (req, res, rule, protocol) => {
    let host = req.headers.host,
        ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        isNoMatch = true;

    console.log(`\n${new Date().toLocaleString()}
    client ip: ${ip}
    client UA: ${req.headers["user-agent"]}
    host: ${host}
    url: ${protocol}://${host + req.url}`);

    for (let _option of rule) {
        if (_option.host.test(req.headers.host)) {
            isNoMatch = false;
            req.headers['x-forwarded-for'] = ip;
            console.log(_option.description);
            proxy.web(req, res, _option.options);
            break;
        }
    }
    if (isNoMatch) {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.end(option.errPage["404"].HTML);
        console.log(option.errPage["404"].warning);
    }
};


if (option.https) {
    https.createServer({
        honorCipherOrder: true,
        SNICallback: (hostname, callback) => {
            let ctx = null;
            for (let ssl of option.ssl) {
                if (ssl.host.test(hostname)) {
                    ctx = tls.createSecureContext({
                        key: ssl.key,
                        cert: ssl.cert
                    });
                    break;
                }
            }
            return (ctx) ? callback(null, ctx) : callback();
        }
    }, (req, res) => {
        proxyServer(req, res, option.https, "https");
    }).listen(option.listen.https);
}


if (option.http) {
    http.createServer((req, res) => {
        proxyServer(req, res, option.http, "http");
    }).listen(option.listen.http);
}


console.log(`listening on port ${option.listen.http} and ${option.listen.https}`);
