#!/usr/bin/env node

var pkg = require('./package.json');
var program = require('commander');
var cli = require('./scripts');
var args = process.argv;
var flag = cli.getArguments(args);

program.version(pkg.version);
program.option('-n, --new', 'create new app');
program.option('-s, --service', 'create service');
program.option('-c, --controller', 'create controller');
program.option('-d, --directive', 'create directive');
program.option('-C, --component', 'create component');
program.parse(args);

if(program.new && !cli.checkArguments(args)) {
  cli.createApp(flag.new);
  return 0;
}
else if(cli.checkConfiguration() && !cli.checkArguments(args)) {
  if(program.controller) cli.createController(flag.controller);
  if(program.service) cli.createService(flag.service);
  if(program.directive) cli.createDirective(flag.directive);
  if(program.component) cli.createComponent(flag.component);
  return 0;
}
else {
  program.help();
  return 0;
}
