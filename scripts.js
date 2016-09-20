var _ = require('lodash');
var fs = require('fs-extra');
var gl = require('globule');
var ap = require('applause');
var minimist = require('minimist');
var toKebabCase = require('kebab-case');

var ngrc, notice;
var ext = ['.js', '.spec.js', '.tpl.html', '.scss', '.e2e.js'];

module.exports = {

  /**
   * Create controller
   * @param  {object} component contains name and description
   * of component
   */
  createController: function( component ) {
    var file, data;
    var options = { patterns: [] };
    var templates = gl.find(['_templates/controller.*'], { srcBase: __dirname });

    options.patterns.push({ match: 'COMPONENT_NAME', replacement: component.name });
    options.patterns.push({ match: 'COMPONENT_DESCRIPTION', replacement: component.description });
    options.patterns.push({ match: 'NOTICE', replacement: notice });

    var pattern = ap.create(options);

    _.forEach(templates, function( template, idx ) {
      file = fs.readFileSync(__dirname + '/' + template, 'utf8');
      data = pattern.replace(file);
      fs.writeFileSync(component.folder + '/' + component.name + ext[idx], data.content, 'utf8');
    });
  },

  /**
   * Create service
   * @param  {object} component name and description of service
   */
  createService: function( component ) {
    var file, data;
    var options = { patterns: [] };
    var templates = gl.find(['_templates/service.*'], { srcBase: __dirname });

    options.patterns.push({ match: 'COMPONENT_NAME', replacement: component.name });
    options.patterns.push({ match: 'COMPONENT_DESCRIPTION', replacement: component.description });
    options.patterns.push({ match: 'NOTICE', replacement: notice });

    var pattern = ap.create(options);

    _.forEach(templates, function( template, idx ) {
      file = fs.readFileSync(__dirname + '/' + template, 'utf8');
      data = pattern.replace(file);
      fs.writeFileSync(component.folder + '/' + component.name + ext[idx], data.content, 'utf8');
    });
  },

  /**
   * Create directive
   * @param  {object} component name and description
   */
  createDirective: function( component ) {
    var file, data;
    var options = { patterns: [] };
    var templates = gl.find(['_templates/directive.*'], { srcBase: __dirname });

    options.patterns.push({ match: 'COMPONENT_NAME', replacement: component.name });
    options.patterns.push({ match: 'COMPONENT_STYLE_NAME', replacement: toKebabCase(component.name) });
    options.patterns.push({ match: 'COMPONENT_DESCRIPTION', replacement: component.description });
    options.patterns.push({ match: 'NOTICE', replacement: notice });

    var pattern = ap.create(options);

    try {
      fs.mkdirsSync(component.folder + '/' + toKebabCase(component.name));
    }
    catch( e ) {
      console.error('ERROR: could not create sub-folder for directive');
      return false;
    }

    _.forEach(templates, function( template, idx ) {
      file = fs.readFileSync(__dirname + '/' + template, 'utf8');
      data = pattern.replace(file);
      fs.writeFileSync(component.folder + '/' + toKebabCase(component.name) + '/' + toKebabCase(component.name) + ext[idx], data.content, 'utf8');
    });
  },

  createComponent: function( component ) {
    var file, data;
    var options = { patterns: [] };
    var templates = gl.find(['_templates/component.*'], { srcBase: __dirname });

    options.patterns.push({ match: 'COMPONENT_NAME', replacement: component.name });
    options.patterns.push({ match: 'COMPONENT_STYLE_NAME', replacement: toKebabCase(component.name) });
    options.patterns.push({ match: 'COMPONENT_DESCRIPTION', replacement: component.description });
    options.patterns.push({ match: 'NOTICE', replacement: notice });

    var pattern = ap.create(options);

    try {
      fs.mkdirsSync(component.folder + '/' + toKebabCase(component.name));
    }
    catch( e ) {
      console.error('ERROR: could not create sub-folder for component');
      return false;
    }

    _.forEach(templates, function( template, idx ) {
      file = fs.readFileSync(__dirname + '/' + template, 'utf8');
      data = pattern.replace(file);
      fs.writeFileSync(component.folder + '/' + toKebabCase(component.name) + '/' + toKebabCase(component.name) + ext[idx], data.content, 'utf8');
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
      fs.statSync('.ngrc');
      ngrc = fs.readJSONSync('.ngrc');
    }
    catch( e ) {
      console.error('ERROR: .ngrc file not found');
      return false;
    }

    if( ngrc.headerFile ) {
      try {
        fs.statSync(ngrc.projectPath + '/' + ngrc.headerFile);
        notice = fs.readFileSync(ngrc.projectPath + '/' + ngrc.headerFile, 'utf8');
      }
      catch( e ) {
        console.error('ERROR: ' + ngrc.headerFile + ' file not found');
        return false;
      }
    }
    else {
      console.error('ERROR: no header file configured in .ngrc');
      return false;
    }

    return true;
  },

  checkArguments: function( args ) {
    return true;
  },

  createFolder: function( name, options ) {

    var baseDir = options.child ? ngrc.projectPath + '/' + options.parent + '/' + name + '/' + options.child : ngrc.projectPath + '/' + options.parent + '/' + name;

    try {
      fs.mkdirsSync(baseDir);
    }
    catch( e ) {
      console.error('ERROR: could not create folder');
      return false;
    }

    return baseDir;
  },

  getArguments: function( args ) {
    return minimist(args.slice(2));
  }

};
