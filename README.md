# iptables2web

## Usage
> :warning: **Warning: Restrict web access to your `cgi-bin` and `iptables2web` locations in order to not reveal sensitive informations about your iptables rules!!!**  

### Install iptables XML provider
- Download [iptables2xml](https://github.com/frnktrgr/iptables2web/blob/master/cgi-bin/iptables2xml)
- Put `iptables2xml` in your web server's `cgi-bin` directory and make it executable:
```bash
chmod a+x /usr/lib/cgi-bin/iptables2xml
```
- Give your web server password-less access to `/sbin/iptables-save`, e.g. Ubuntu/Apache2:
```bash
visudo
# add a line like
www-data ALL= NOPASSWD: /sbin/iptables-save -c
```

### Install iptables2web app
- Download zip file from [latest release](https://github.com/frnktrgr/iptables2web/releases)
- Unzip and move to web space, e.g. Ubuntu/Apache2:
```bash
unzip iptables2web-0.1.0.zip
mv dist /var/www/html/iptables2web
```
- Edit config:
```
cd /var/www/html/iptables2web
vi iptables2web.json
```
- `dataUrl`: path to iptables XML provider (see above) (default: `/cgi-bin/iptables2xml`)
- `enableLogin`: enable/disable login/logout links (default: `true`)
- `loginUrl`:  Login URL (default: `/mellon/login?ReturnTo=RETURN_TO_URL`)
- `logoutUrl`: Logout URL (default: `/mellon/logout?ReturnTo=RETURN_TO_URL`)
- `loginUrl` and `logoutUrl` support `RETURN_TO_URL` placeholder 

**Try it!**

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