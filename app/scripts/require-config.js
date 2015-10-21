require.config( {

  baseUrl: "/scripts",

  /* starting point for application */
  deps: ['backbone.marionette', 'boot'],


  shim: {
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    }
  },

  paths: {

    'backbone': '../bower_components/backbone/backbone',
    'backbone.marionette': '../bower_components/backbone.marionette/lib/core/backbone.marionette',
    'backbone.wreqr': '../bower_components/backbone.wreqr/lib/backbone.wreqr',
    'backbone.babysitter': '../bower_components/backbone.babysitter/lib/backbone.babysitter',
    'jquery': '../bower_components/jquery/jquery',
    'papaparse': '../bower_components/papaparse/papaparse',
    'underscore': '../bower_components/underscore/underscore',

    /* Alias text.js for template loading and shortcut the templates dir to tmpl */
    text: '../bower_components/requirejs-text/text',
    template: "../templates",
    tpl: "../bower_components/requirejs-tpl/tpl"
  },

  hbs: {
    disableI18n: true
  }

} );
