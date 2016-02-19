/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
    'ember-cli-bootswatch': {
      'theme': 'readable',
      'excludeCSS': true
      // 'excludeJS': true
    },
    lessOptions: {
      paths: [
        "bower_components/bootstrap/less",
        "bower_components/bootswatch"
      ]
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import('bower_components/Chartjs/Chart.js');
  app.import('bower_components/fastclick/lib/fastclick.js');
  app.import('bower_components/FileSaverjs/FileSaver.js');
  app.import('bower_components/xmllint/xmllint.js');
  app.import('bower_components/bootstrap-autohidingnavbar/dist/jquery.bootstrap-autohidingnavbar.min.js');

  return app.toTree();
};
