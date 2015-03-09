import Ember from "ember";

export default Ember.Route.extend({
  model: function(params) {
	return this.store.find('cycle', params.cycle_id);
  },
  afterModel: function(model) {
	this.get('store').find('mucus-sample', {cycle:model.get('id')});
  }

});