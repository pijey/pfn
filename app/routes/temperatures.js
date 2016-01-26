import Ember from "ember";

export default Ember.Route.extend({  
	cycle: null,
	model: function(params) {
		return this.store.find('cycle', params.cycle_id);
	},
	afterModel: function(model) {
	    this.get('store').query('temperature', {cycle:model.get('id')});
	}
});