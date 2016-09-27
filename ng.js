#!/usr/bin/env node

var program = require('commander');
var cli = require('./scripts');
var args = process.argv;
var flag = cli.getArguments(args);

program.version('1.0.2');
program.option('-a, --app', 'create new app');
program.option('-s, --service', 'create factory service');
program.option('-c, --controller', 'create controller');
program.option('-d, --directive', 'create directive');
program.option('-C, --component', 'create component');
program.parse(args);

if ( program.app && !cli.checkArguments(args) ) {
  cli.createApp(flag.app);
}
else if ( cli.checkConfiguration() && !cli.checkArguments(args) ) {
  if ( program.controller ) cli.createController(flag.controller);
  if ( program.service ) cli.createService(flag.service);
  if ( program.directive ) cli.createDirective(flag.directive);
  if ( program.component ) cli.createComponent(flag.component);
}
else {
  program.help();
}
