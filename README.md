# ng-scripts - Create AngularJS projects quickly


## Install

```bash
npm install -g ng-scripts
```

## Usage

```bash
ng --help

  Usage: ng [options]

  Options:

    -h, --help        output usage information
    -V, --version     output the version number
    -n, --new         create new app
    -s, --service     create service
    -c, --controller  create controller
    -d, --directive   create directive
    -C, --component   create component
```

## Getting Started

### Create new app

```bash
ng --new your-app-name
```
This command creates a new app with the following structure:

```bash
.
├── README.md
├── app
│   ├── app.js
│   ├── assets
│   │   ├── config
│   │   │   └── env.json
│   │   └── index.html
│   ├── config.js
│   ├── controllers
│   │   └── controllers.js
│   ├── directives
│   │   └── directives.js
│   ├── global.js
│   ├── routes
│   │   └── routes.js
│   ├── services
│   │   ├── providers.js
│   │   └── services.js
│   └── templates
│       └── layout.tpl.html
├── bower.json
├── brunch-config.js
├── bundle.js
├── notice.txt
├── package.json
└── styles
    └── main.scss
```
The project is setup to use [Brunch](http://brunch.io/), [SASS](http://sass-lang.com/) and [Bower](https://bower.io/). 

After the project is created, you need to install [Brunch](http://brunch.io/), the node packages dependencies and third-party libraries. 

```bash
npm install -g brunch 
```

```bash
npm install
```

```bash
bower install
```

To run the project using Brunch:

```bash
brunch watch --server
15:24:44 - info: application started on http://localhost:9000/
15:24:45 - info: compiled 20 files into 4 files, copied 2 in 1.5 sec
```

Third-party libraries are installed in the ```vendor``` folder and included in ```bundle.js```

```javascript
module.exports = {
  files: [
    'vendor/lodash/dist/lodash.js',
    'vendor/jquery/dist/jquery.js',
    'vendor/angular/angular.js',
    'vendor/angular-bus/angular-bus.js',
    'vendor/angular-mocks/angular-mocks.js',
    'vendor/angular-ui-router/release/angular-ui-router.js'
  ]
};
```


### Create service

Create a factory service

```bash
ng --service Accounts
```

### Create controller

```bash
ng --controller RegisterAccount
```

### Create directive

```bash
ng --directive sideMenu
```

### Create component

```bash
ng --component homeContainer
```

## Example Project

```bash
.
├── README.md
├── app
│   ├── app.js
│   ├── assets
│   │   ├── config
│   │   │   └── env.json
│   │   └── index.html
│   ├── components
│   │   └── home-container
│   │       ├── home-container.js
│   │       ├── home-container.scss
│   │       └── home-container.tpl.html
│   ├── config.js
│   ├── controllers
│   │   ├── RegisterAccount.js
│   │   └── controllers.js
│   ├── directives
│   │   ├── directives.js
│   │   └── side-menu
│   │       ├── side-menu.js
│   │       ├── side-menu.scss
│   │       └── side-menu.tpl.html
│   ├── global.js
│   ├── routes
│   │   └── routes.js
│   ├── services
│   │   ├── Accounts.js
│   │   ├── providers.js
│   │   └── services.js
│   └── templates
│       └── layout.tpl.html
├── bower.json
├── brunch-config.js
├── bundle.js
├── notice.txt
├── package.json
└── styles
    └── main.scss
```

## License

[MIT](http://opensource.org/licenses/MIT) © [Antonio Aguilar](https://www.antonio-aguilar.com/about/), 2017. 
