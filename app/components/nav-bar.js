import Ember from 'ember';

export default Ember.Component.extend({
	currentController:null,
	actions: {
		back: function(){
			this.get("goBack")();
		},
		selectCycle: function(cycle) {
		    this.set('model.selectedCycle', cycle);
		    this.get("model").save();
		}
	}
});
