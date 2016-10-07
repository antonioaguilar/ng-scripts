var bundle = require('./bundle.js');

module.exports = {

  modules: {
    wrapper: false,
    definition: false
  },

  npm: {
    enabled: false
  },

  paths: {
    public: 'public',
    watched: ['app', 'styles']
  },

  files: {

    javascripts: {

      joinTo: {
        'app.js': /^app/,
        'vendor.js': bundle.files
      },

      order: {
        before: bundle.files
      }
    },

    stylesheets: {
      joinTo: {
        'app.css': [/^styles/, /^app/]
      }
    },

    templates: {
      joinTo: {
        'app.templates.js': /^app/
      }
    }
  },

  plugins: {

    html2js: {
      options: {
        base: 'app',
        quoteChar: '\''
      }
    },

    ng_annotate: {
      pattern: /^app/
    }

  },

  server: {
    //run: true,
    port: 9000
  }

};
