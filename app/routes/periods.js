import Ember from "ember";

export default Ember.Route.extend({
  isPopup:false,
  model: function(params) {
	return this.store.find('cycle', params.cycle_id);
  },
  afterModel: function(model) {
	this.get('store').query('period', {cycle:model.get('id')});
  }

});