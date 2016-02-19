import Ember from 'ember';

export default Ember.Component.extend({
	currentController:null,
	type:"temperature",
	tagName:"nav",
	classNames:["navbar", "navbar-default", "navbar-fixed-top"],
	actions: {
		back: function(){
			this.get("goBack")();
		},
		selectCycle: function(cycle) {
		    this.set('model.selectedCycle', cycle);
		    this.get("model").save();
		    this.get("changeSelectedCycle")();
		}
	},
	didInsertElement(){
		Ember.$(".navbar-fixed-top").autoHidingNavbar({
			showOnBottom:false
		});
	}
});
