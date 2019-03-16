// vue.config.js
let myPackage = require('./package.json');
const CopyPlugin = require('copy-webpack-plugin')

function modify(buffer) {
    let myJson = JSON.parse(buffer.toString());

    // make any modifications you like, such as
    myJson.version = myPackage.version;

    return JSON.stringify(myJson, null, 2);
}

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/iptables2web/' : '/',
    crossorigin: 'use-credentials',

    configureWebpack: {
        plugins: [
            new CopyPlugin([
                {
                    from: "./src/iptables2web.json",
                    to:   "./iptables2web.json",
                    transform (content, path) {
                        return modify(content)
                    }
                }])
        ]
    }
}