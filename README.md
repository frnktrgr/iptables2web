# iptables2web

## Usage
**Warning**: Restrict web access to your `cgi-bin` and `iptables2web` locations in order to not reveal sensitive informations about your iptables rules!!!  

### Install iptables XML provider
- Put `cgi-bin/iptables2xml` in your web server's `cgi-bin` directory and make it executable:
```bash
chmod a+x /usr/lib/cgi-bin/iptables2xml
```
- Give your web server password-less access to `/sbin/iptables-save`, e.g. Ubuntu/Apache2:
```bash
visudo
# add a line like
www-data ALL= NOPASSWD: /sbin/iptables-save
```

### Install iptables2web app
- *TODO*: deployment of iptables2web app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).