/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'pfn',
    environment: environment,
    rootURL: '/',
    defaultLocationType: 'auto',
    i18n: {
      defaultLocale:'fr'
    },
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
 
     'ember-cli-toggle': {
       includedThemes: ['ios', 'flip'],
       defaultTheme: 'ios',   // defaults to 'default' 
     },
     
     npt: {
       transitionActivated:true,
       defaultTransitionOptions: {
         "direction"        : "left",
         "duration"         :  400,
         "slowdownfactor"   :    1,
         "iosdelay"         :  -1,
         "androiddelay"     :  -1,
         "winphonedelay"    :  -1,
         "fixedPixelsTop"   :    0,
         "fixedPixelsBottom":   0 
       },
       defaultTransitionType: "slide",
       defaultBackTransitionOptions: {
         "direction"        : "right",
         "duration"         :  400,
         "slowdownfactor"   :    1,
         "iosdelay"         :  -1,
         "androiddelay"     :  -1,
         "winphonedelay"    :  -1,
         "fixedPixelsTop"   :    0,
         "fixedPixelsBottom":   0 
       },
       defaultBackTransitionType: "slide",
     },
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.cordova= {
      emberUrl: "http://192.168.1.16:4200",
      rebuildOnChange: false,
      emulate: false,
      liveReload: {
        enabled: true,
        platform: "android"
      }
    };

  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';
    ENV.baseURL = '/';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.cordova= {
      rebuildOnChange: false,
      emulate: false,
    };
  }

  return ENV;
};
