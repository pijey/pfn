import Ember from "ember";

export default Ember.Route.extend({  
	cycle: null,
	model: function(params) {
		this.cycle = this.store.find('cycle', params.cycle_id);
		return this.cycle;
	},
	afterModel: function() {
	    return this.get('store').find('temperature');
	}
});