import Ember from "ember";

export default Ember.Route.extend({
  model: function(params) {
	return this.store.find('cycle', params.cycle_id);
  },
  afterModel: function() {
	this.get('store').find('period');
  }

});