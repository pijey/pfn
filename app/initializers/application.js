import Ember from "ember";

export function initialize(/* application */) {
  Ember.Route.reopen({
  	setupController(controller, model){
	    this._super(controller, model);
	    this.controllerFor("application").set("currentController", controller);
	}
  });
}

export default {
  name: 'application',
  initialize
};
