define( [
    'backbone', 'communicator',
    'views/converter'
  ],
  function( Backbone, Communicator,
            ConverterView ) {

    'use strict';

    var App = new Backbone.Marionette.Application();
    var container = new Backbone.Marionette.Region( {
      el: "#application"
    } );
    App.addInitializer( function() {

      var AppLayoutView = Backbone.Marionette.LayoutView.extend( {
        template: "#template-layout",
        regions: {
          navigation: "#nav",
          content: "#content"
        }
      } );

      var layout = new AppLayoutView();
      layout.render();
      container.show( layout );

      layout.getRegion( 'content' ).show( new ConverterView() );

    } );

    return App;

  } );
