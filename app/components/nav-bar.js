import Ember from 'ember';

export default Ember.Component.extend({
	goBack:false,
	actions: {
		back: function(){
			this.sendAction("back");
			this.set("goBack", true);
		},
		selectCycle: function(cycle) {
		    this.set('model.selectedCycle', cycle);
		    this.get("model").save();
		}
	}
});
