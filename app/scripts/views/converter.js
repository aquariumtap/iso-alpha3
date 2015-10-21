define(["papaparse", "models/countries", "tpl!template/converter.html"],
  function(Papa, Countries, Template) {

  return Backbone.Marionette.ItemView.extend({

    template: Template,

    events: {
      "click #start-conversion": function(e) {
        e.preventDefault();
        this.doConversion();
      }
    },

    config: {
      countryCodeFieldSuffix: "_isoa3"
    },

    papaConfig: {
      delimiter: "",	// auto-detect
      newline: "",	// auto-detect
      header: true,
      dynamicTyping: true,
      preview: 0,
      encoding: "",
      worker: false,
      comments: false,
      step: undefined,
      complete: undefined,
      error: undefined,
      download: false,
      skipEmptyLines: true,
      chunk: undefined,
      fastMode: undefined,
      beforeFirstChunk: undefined,
      withCredentials: undefined
    },

    initialize: function() {

    },

    doConversion: function() {

      var input = $('#data-input').val(),
          output, badOutput,
          papi = Papa.parse(input, this.papaConfig ),
          countryFields = $('#country-fields').val().split(',' ),
          newFields = {},
          badRows = [],
          ext = this.config.countryCodeFieldSuffix;

      // If no country fields defined, search all.
      if (!countryFields.length || !countryFields[0]) countryFields = _.clone(papi.meta.fields);

      _.each(papi.data, function(row, i) {

        // Loop through columns.
        _.each(countryFields, function(field) {

          // Look for the English name.
          var country = Countries.findWhere( {en: row[field]} );

          // Maybe in Dutch?
          if (!country) var country = Countries.findWhere( {nl: row[field]} );

          // Also check to see if it's already a country code.
          if (!country) country = Countries.findWhere( {cc: row[field]} );

          // Register hits.
          if ( country ) {
            papi.data[i][field + ext] = country.get('cc');
            newFields[field + ext] = true;
          }

        });

        // Isolate rows without full matches.
        var populated = 0;
        _.each(countryFields, function(f) {
          if (row[f + ext]) populated++;
        });
        console.log(populated, countryFields.length);
        if (populated < countryFields.length) {
          badRows.push(row);
          delete(papi.data[i]);
        }

      });
      papi.data = _.compact(papi.data);

      var unPapaOptions = {
        quotes: false,
        delimiter: papi.meta.delimiter,
        newline: papi.meta.linebreak
      };

      var goodData = {
        data: _.clone(papi.data),
        fields: _.union(papi.meta.fields, _.keys(newFields))
      };
      var badData = {
        data: badRows,
        fields: papi.meta.fields
      };

      output = Papa.unparse(goodData, unPapaOptions);
      badOutput = Papa.unparse(badData, unPapaOptions);

      $('#data-output').val(output);
      $('#data-bad').val(badOutput);

    }

  });

});