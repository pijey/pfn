import Ember from "ember";

export default Ember.Controller.extend({
  	dayNumber: null,
  	type: null,
  	previousNumber: Ember.computed("dayNumber", function(){
  		return this.get("dayNumber")>1 ? this.get("dayNumber") -1 : null;
  	}),
  	nextNumber: Ember.computed("dayNumber", "model.cycle_length", function(){
  		return this.get("dayNumber") < this.get("model.cycle_length") ? parseInt(this.get("dayNumber")) + 1 : null;
  	}),
	actions:{
		changeDay(){
			this.transitionToRoute('daily-report.report', this.get("model.id"), this.get("dayNumber"), this.get("type"));
		},
		changeReport(){
			this.transitionToRoute('daily-report.report', this.get("model.id"), this.get("dayNumber"), this.get("type"));	
		}
	}
});