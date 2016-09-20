#!/usr/bin/env node

var ng = require('commander');
var script = require('./scripts');
var component = {};

ng.version('0.1.2');
ng.option('-a, --app', 'create new app');
ng.option('-s, --service', 'create factory service');
ng.option('-c, --controller', 'create controller');
ng.option('-d, --directive', 'create directive');
ng.option('-C, --component', 'create component');
ng.parse(process.argv);

if( ng.app && process.argv.length > 3 ) {
  script.createApp(process.argv[3]);
  return;
}

if( !script.checkConfiguration() ) {
  ng.help();
}

else if( ng.controller ) {
  var args = script.getArguments(process.argv);
  component.description = args._[0];
  component.name = args.controller;
  component.folder = 'src/controllers';
  script.createController(component);
}

else if( ng.service ) {
  var args = script.getArguments(process.argv);
  component.description = args._[0];
  component.name = args.service;
  component.folder = 'src/services';
  script.createService(component);
}

else if( ng.directive ) {
  var args = script.getArguments(process.argv);
  component.description = args._[0];
  component.name = args.directive;
  component.folder = 'src/directives';
  script.createDirective(component);
}

else if( ng.component ) {
  var args = script.getArguments(process.argv);
  component.description = args._[0];
  component.name = args.component;
  component.folder = 'src/components';
  script.createComponent(component);
}

else {
  console.error('ERROR: missing arguments');
  ng.help();
}
