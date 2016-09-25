/*
 * Copyright (c) 2016 Antonio Aguilar
 *
 * This software is provided "as is", without warranty of any kind, express or
 * implied, including but not limited to the warranties of merchantability,
 * fitness for a particular purpose and non-infringement. In no event shall the
 * authors or copyright holders be liable for any claim, damages or other
 * liability, whether in an action of contract, tort or otherwise, arising from,
 * out of or in connection with the software or the use or other dealings in this
 * software.
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 */

module.exports = function (grunt) {

  require('jit-grunt')(grunt);

  var buildConfig = {
    build_dir: 'public',
    compile_dir: 'release',
    app_files: {
      js: ['src/**/*.js', '!src/**/*.spec.js', '!src/**/*.e2e.js'],
      jsunit: ['src/**/*.spec.js'],
      e2e: ['src/**/*.e2e.js'],
      atpl: ['src/**/*.tpl.html'],
      html: ['src/app.html'],
      sass: ['scss/main.scss']
    },
    vendor_files: require('./bundle.js')
  };

  var buildTasks = {
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      all: {
        src: ['<%= build_dir %>', '<%= compile_dir %>'],
        options: {
          force: true
        }
      }
    },

    copy: {
      build_app_assets: {
        files: [
          {
            src: ['**'],
            dest: '<%= build_dir %>/assets/',
            cwd: 'assets',
            expand: true
          }
        ]
      },
      build_appjs: {
        files: [
          {
            src: ['<%= app_files.js %>'],
            dest: '<%= build_dir %>/',
            cwd: '.',
            expand: true
          }
        ]
      },
      build_vendorjs: {
        files: [
          {
            src: ['<%= vendor_files.js %>'],
            dest: '<%= build_dir %>/',
            cwd: '.',
            expand: true
          }
        ]
      },
      compile_assets: {
        files: [
          {
            src: ['**'],
            dest: '<%= compile_dir %>/assets',
            cwd: '<%= build_dir %>/assets',
            expand: true
          }
        ]
      }
    },

    concat: {
      build_css: {
        src: ['<%= build_dir %>/assets/<%= pkg.name %>.css'],
        dest: '<%= build_dir %>/assets/<%= pkg.name %>.css'
      },
      compile_js: {
        src: [
          '(function ( window, angular, undefined ) {',
          '<%= vendor_files.js %>',
          '<%= build_dir %>/src/**/*.js',
          '<%= html2js.app.dest %>',
          '})( window, window.angular );'
        ],
        dest: '<%= compile_dir %>/assets/app.js'
      }
    },

    ngAnnotate: {
      compile: {
        files: [
          {
            src: ['<%= app_files.js %>'],
            cwd: '<%= build_dir %>',
            dest: '<%= build_dir %>',
            expand: true
          }
        ]
      }
    },

    uglify: {
      compile: {
        files: {
          '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
        }
      }
    },

    sass: {
      build: {
        options: {
          sourceMap: true,
          outputStyle: 'expanded'
        },
        files: {
          '<%= build_dir %>/assets/<%= pkg.name %>.css': '<%= app_files.sass %>'
        }
      },
      compile: {
        options: {
          sourceMap: false,
          outputStyle: 'compressed'
        },
        files: {
          '<%= build_dir %>/assets/<%= pkg.name %>.css': '<%= app_files.sass %>'
        }
      }
    },

    htmlmin: {
      index: {
        options: {
          removeComments: true,
          removeCommentsFromCDATA: true,
          minifyJS: true,
          collapseWhitespace: true
        },
        files: {
          '<%= compile_dir %>/index.html': '<%= compile_dir %>/index.html'
        }
      }
    },

    html2js: {
      app: {
        options: {
          module: 'app.templates',
          quoteChar: '\'',
          fileHeaderString: '/* eslint-disable */',
          fileFooterString: '/* eslint-enable */',
          base: 'src',
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
          }
        },
        src: ['<%= app_files.atpl %>'],
        dest: '<%= build_dir %>/app.templates.js'
      }
    },

    karma: {
      options: {
        configFile: '<%= build_dir %>/karma.js'
      },
      continuous: {
        singleRun: true
      }
    },

    karmaconfig: {
      unit: {
        dir: '<%= build_dir %>',
        src: ['<%= vendor_files.js %>', '<%= html2js.app.dest %>']
      }
    },

    run: {
      protractor: {
        exec: 'protractor e2e.conf'
      }
    },

    index: {
      build: {
        dir: '<%= build_dir %>',
        src: [
          '<%= vendor_files.js %>',
          '<%= build_dir %>/src/**/*.js',
          '<%= html2js.app.dest %>',
          '<%= build_dir %>/assets/<%= pkg.name %>.css'
        ]
      },
      compile: {
        dir: '<%= compile_dir %>',
        src: [
          '<%= concat.compile_js.dest %>',
          '<%= build_dir %>/assets/<%= pkg.name %>.css'
        ]
      }
    },

    express: {
      development: {
        options: {
          port: 9000,
          hostname: '0.0.0.0',
          bases: '<%= build_dir %>',
          livereload: true
        }
      }
    },

    eslint: {
      options: {
        configFile: '.eslintrc',
        format: 'stylish'
      },
      target: ['src/**/*.js', '!src/**/*.spec.js', '!src/**/*.e2e.js']
    },

    watch: {

      jssrc: {
        files: ['<%= app_files.js %>'],
        tasks: ['newer:copy:build_appjs'],
        options: {
          spawn: false,
          livereload: true
        }
      },

      tpls: {
        files: ['<%= app_files.atpl %>'],
        tasks: ['html2js'],
        options: {
          spawn: false,
          livereload: true
        }
      },

      sass: {
        files: ['scss/**/*.scss'],
        tasks: ['sass:build'],
        options: {
          spawn: false,
          livereload: true
        }
      },

      assets: {
        files: ['assets/**/*'],
        tasks: ['newer:copy:build_app_assets'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }

  };

  grunt.initConfig(grunt.util._.extend(buildTasks, buildConfig));

  grunt.registerTask('default', ['development', 'express', 'watch']);
  grunt.registerTask('development', ['clean:all', 'html2js', 'sass:build', 'concat:build_css', 'copy:build_app_assets', 'copy:build_appjs', 'copy:build_vendorjs', 'index:build']);
  grunt.registerTask('livereload', ['development', 'express', 'watch']);
  grunt.registerTask('production', ['clean:all', 'html2js', 'sass:compile', 'concat:build_css', 'copy:build_app_assets', 'copy:build_appjs', 'copy:build_vendorjs', 'index:build', 'copy:compile_assets', 'ngAnnotate', 'concat:compile_js', 'uglify', 'index:compile', 'htmlmin:index']);
  grunt.registerTask('test', ['development', 'karmaconfig', 'karma:continuous']);
  grunt.registerTask('e2e', ['development', 'express', 'run:protractor']);

  function filterForJS(files) {
    return files.filter(function (file) {
      return file.match(/\.js$/);
    });
  }

  function filterForCSS(files) {
    return files.filter(function (file) {
      return file.match(/\.css$/);
    });
  }

  grunt.registerMultiTask('index', 'Generate index.html', function () {
    var dirRE = new RegExp('^(' + grunt.config('build_dir') + '|' + grunt.config('compile_dir') + ')\/', 'g');

    var jsFiles = filterForJS(this.filesSrc).map(function (file) {
      return file.replace(dirRE, '');
    });

    var cssFiles = filterForCSS(this.filesSrc).map(function (file) {
      return file.replace(dirRE, '');
    });

    grunt.file.copy('src/app.html', this.data.dir + '/index.html', {
      process: function (contents) {
        return grunt.template.process(contents, {
          data: {
            scripts: jsFiles,
            styles: cssFiles,
            version: grunt.config('pkg.version'),
            author: grunt.config('pkg.author'),
            date: grunt.template.today("yyyy")
          }
        });
      }
    });
  });

  grunt.registerMultiTask('karmaconfig', 'Genrate karma config', function () {
    var scripts = filterForJS(this.filesSrc);

    grunt.file.copy('karma.conf', grunt.config('build_dir') + '/karma.js', {
      process: function (contents) {
        return grunt.template.process(contents, {
          data: {
            scripts: scripts
          }
        });
      }
    });
  });

};
