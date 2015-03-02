import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.route("temperatures", {path: "/temperatures/:cycle_id"});
	this.route("periods", {path: "/periods/:cycle_id"});
	this.route("mucus-samples", {path: "/mucus-samples/:cycle_id"});
	this.route("cervix-feelings", {path: "/cervix-feelings/:cycle_id"});
	this.route("profile", {path:"/profile"});
	this.route("cycle", {path: "/cycle/:cycle_id"});
	this.route("cycles", {path: "/cycles/:profile_id"});
});

export default Router;
