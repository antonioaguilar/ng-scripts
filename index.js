#!/usr/bin/env node

var ng = require('commander');
var cli = require('./scripts');
var args = process.argv;
var flag = cli.getArguments(args);

ng.version('1.0.0');
ng.option('-a, --app', 'create new app');
ng.option('-s, --service', 'create factory service');
ng.option('-c, --controller', 'create controller');
ng.option('-d, --directive', 'create directive');
ng.option('-C, --component', 'create component');
ng.parse(args);

if ( ng.app && !cli.checkArguments(args) ) {
  cli.createApp(flag.app);
}
else if ( cli.checkConfiguration() && !cli.checkArguments(args) ) {
  if ( ng.controller ) cli.createController(flag.controller);
  if ( ng.service ) cli.createService(flag.service);
  if ( ng.directive ) cli.createDirective(flag.directive);
  if ( ng.component ) cli.createComponent(flag.component);
}
else {
  ng.help();
}
