// vue.config.js
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/iptables2web/' : '/',
    crossorigin: 'use-credentials',
}