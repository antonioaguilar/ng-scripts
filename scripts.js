var _ = require('lodash');
var fs = require('fs-extra');
var glob = require('globule');
var parseArgs = require('minimist');
var toKebabCase = require('kebab-case');

var ngrc, notice;
var file, data, compiled;
var ext = ['.js', '.spec.js', '.tpl.html', '.scss'];

module.exports = {

  createController: function (component) {
    var templates = glob.find(['_templates/controller.*'], { srcBase: __dirname });
    _.forEach(templates, function (template, idx) {
      file = fs.readFileSync(__dirname + '/' + template, 'utf8');
      compiled = _.template(file);
      data = compiled({ notice: notice, name: component });
      fs.writeFileSync('src/controllers' + '/' + component + ext[idx], data, 'utf8');
    });
  },

  createService: function (component) {
    var templates = glob.find(['_templates/service.*'], { srcBase: __dirname });
    _.forEach(templates, function (template, idx) {
      file = fs.readFileSync(__dirname + '/' + template, 'utf8');
      compiled = _.template(file);
      data = compiled({ notice: notice, name: component });
      fs.writeFileSync('src/services' + '/' + component + ext[idx], data, 'utf8');
    });
  },

  createDirective: function (component) {
    var templates = glob.find(['_templates/directive.*'], { srcBase: __dirname });
    try {
      fs.mkdirsSync('src/directives' + '/' + toKebabCase(component));
      _.forEach(templates, function (template, idx) {
        file = fs.readFileSync(__dirname + '/' + template, 'utf8');
        compiled = _.template(file);
        data = compiled({ notice: notice, name: component, style: toKebabCase(component) });
        fs.writeFileSync('src/directives' + '/' + toKebabCase(component) + '/' + toKebabCase(component) + ext[idx], data, 'utf8');
      });
    }
    catch ( e ) {
      console.error('ERROR: could not create sub-folder for directive');
      return false;
    }
  },

  createComponent: function (component) {
    var templates = glob.find(['_templates/component.*'], { srcBase: __dirname });
    try {
      fs.mkdirsSync('src/components' + '/' + toKebabCase(component));
      _.forEach(templates, function (template, idx) {
        file = fs.readFileSync(__dirname + '/' + template, 'utf8');
        compiled = _.template(file);
        data = compiled({ notice: notice, name: component, style: toKebabCase(component) });
        fs.writeFileSync('src/components' + '/' + toKebabCase(component) + '/' + toKebabCase(component) + ext[idx], data, 'utf8');
      });
    }
    catch ( e ) {
      console.error('ERROR: could not create sub-folder for component');
      return false;
    }
  },

  createApp: function (app) {
    try {
      fs.mkdirsSync('./' + app);
      fs.copySync(__dirname + '/_app', './' + app);
      return true;
    }
    catch ( e ) {
      console.error('ERROR: could not create app');
      return false;
    }
  },

  checkConfiguration: function () {
    try {
      fs.statSync('.ngrc').isFile();
      fs.statSync('notice.txt').isFile();
      ngrc = fs.readJSONSync('.ngrc');
      notice = fs.readFileSync(ngrc.path + '/' + ngrc.notice, 'utf8');
      return true;
    }
    catch ( err ) {
      console.error('ERROR: could not find configuration files');
      return false;
    }
  },

  checkArguments: function (args) {
    return _.size(args) < 4;
  },

  getArguments: function (args) {
    return parseArgs(args.slice(2));
  }

};

