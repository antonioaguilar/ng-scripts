var _ = require('lodash');
var fs = require('fs-extra');
var gl = require('globule');
var minimist = require('minimist');
var toKebabCase = require('kebab-case');

var ngrc, notice;
var file, data, compiled;
var ext = ['.js', '.spec.js', '.tpl.html', '.scss', '.e2e.js'];

module.exports = {

  createController: function( component ) {
    var templates = gl.find(['_templates/controller.*'], { srcBase: __dirname });

    _.forEach(templates, function( template, idx ) {
      file = fs.readFileSync(__dirname + '/' + template, 'utf8');
      compiled = _.template(file);
      data = compiled({ notice: notice, name: component.name });
      fs.writeFileSync('src/controllers' + '/' + component.name + ext[idx], data, 'utf8');
    });
  },

  createService: function( component ) {
    var templates = gl.find(['_templates/service.*'], { srcBase: __dirname });

    _.forEach(templates, function( template, idx ) {
      file = fs.readFileSync(__dirname + '/' + template, 'utf8');
      compiled = _.template(file);
      data = compiled({ notice: notice, name: component.name });
      fs.writeFileSync('src/services' + '/' + component.name + ext[idx], data, 'utf8');
    });
  },

  createDirective: function( component ) {
    var templates = gl.find(['_templates/directive.*'], { srcBase: __dirname });

    try {
      fs.mkdirsSync('src/directives' + '/' + toKebabCase(component.name));
    }
    catch( e ) {
      console.error('ERROR: could not create sub-folder for directive');
      return false;
    }

    _.forEach(templates, function( template, idx ) {
      file = fs.readFileSync(__dirname + '/' + template, 'utf8');
      compiled = _.template(file);
      data = compiled({ notice: notice, name: component.name, style: toKebabCase(component.name) });
      fs.writeFileSync('src/directives' + '/' + toKebabCase(component.name) + '/' + toKebabCase(component.name) + ext[idx], data, 'utf8');
    });

  },

  createComponent: function( component ) {
    var templates = gl.find(['_templates/component.*'], { srcBase: __dirname });

    try {
      fs.mkdirsSync('src/components' + '/' + toKebabCase(component.name));
    }
    catch( e ) {
      console.error('ERROR: could not create sub-folder for component');
      return false;
    }

    _.forEach(templates, function( template, idx ) {
      file = fs.readFileSync(__dirname + '/' + template, 'utf8');
      compiled = _.template(file);
      data = compiled({ notice: notice, name: component.name, style: toKebabCase(component.name) });
      fs.writeFileSync('src/components' + '/' + toKebabCase(component.name) + '/' + toKebabCase(component.name) + ext[idx], data, 'utf8');
    });
  },

  createApp: function( app ) {
    try {
      fs.mkdirsSync('./' + app);
      fs.copySync(__dirname + '/_app', './' + app);
    }
    catch( e ) {
      console.error('ERROR: could not create app');
      return false;
    }
  },

  checkConfiguration: function() {
    try {
      fs.statSync('.ngrc').isFile();
    }
    catch( err ) {
      console.error('ERROR: .ngrc file not found');
      return false;
    }

    try {
      fs.statSync('notice.txt').isFile();
    }
    catch( err ) {
      console.error('ERROR: notice.txt file not found');
      return false;
    }

    ngrc = fs.readJSONSync('.ngrc');
    notice = fs.readFileSync(ngrc.path + '/' + ngrc.notice, 'utf8');

    return true;
  },

  checkArguments: function( args ) {
    return true;
  },

  getArguments: function( args ) {
    return minimist(args.slice(2));
  }

};
