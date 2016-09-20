#!/usr/bin/env node

var _ = require('lodash');
var ng = require('commander');
var script = require('./scripts');
var component = {};
var args;

ng.version('0.0.1');
ng.option('-a, --app', 'create new app');
ng.option('-s, --service', 'create factory service');
ng.option('-c, --controller', 'create controller');
ng.option('-d, --directive', 'create directive');
ng.option('-C, --component', 'create component');
ng.parse(process.argv);

if( ng.app && process.argv.length > 3 ) {
  script.createApp(_.last(process.argv));
  return;
}

if( !script.checkConfiguration() ) {
  ng.help();
}

else if( ng.controller ) {
  args = script.getArguments(process.argv);
  component.description = _.first(args);
  component.name = args.controller;
  script.createController(component);
}


else if( ng.service ) {
  args = script.getArguments(process.argv);
  component.description = _.first(args);
  component.name = args.service;
  script.createService(component);
}

else if( ng.directive ) {
  args = script.getArguments(process.argv);
  component.description = _.first(args);
  component.name = args.directive;
  script.createDirective(component);
}

else if( ng.component ) {
  args = script.getArguments(process.argv);
  component.description = _.first(args);
  component.name = args.component;
  script.createComponent(component);
}

else {
  console.error('ERROR: missing arguments');
  ng.help();
}
