import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("synthese", {path: "/synthese/:cycle_id"});
  this.route("temperatures", {path: "/temperatures/:cycle_id"});
  this.route("temperature", {path: "/temperature/:cycle_id/:temperature_id"});
  this.route("period", {path: "/period/:cycle_id/:period_id"});
  this.route("periods", {path: "/periods/:cycle_id"});
  this.route("mucus-sample", {path: "/mucus-sample/:cycle_id/:mucus_sample_id"});
  this.route("mucus-samples", {path: "/mucus-samples/:cycle_id"});
  this.route("cervix-feeling", {path: "/cervix-feeling/:cycle_id/:cervix_feeling_id"});
  this.route("cervix-feelings", {path: "/cervix-feelings/:cycle_id"});
  this.route("profile", {path:"/profile/:profile_id"});
  this.route("cycle", {path: "/cycle/:cycle_id"});
  this.route("cycles", {path: "/cycles/:profile_id"});
  this.route('daily-report', {path: "/daily-report/:cycle_id/:day_number"});
});

export default Router;
