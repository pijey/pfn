import Ember from 'ember';

export default Ember.ObjectController.extend({
	applicationController: Ember.inject.controller('application'),
	cycles: Ember.computed("model.profile.cycles.[]", function(){
		var cycles = [];
		if(this.get('model.profile.cycles.length') > 0){
			var that = this;
			this.get('model.profile.cycles').sortBy('start_date:desc').without(this.get('model')).forEach(function(cycle){
				cycles.push({
					id: cycle,
					label: moment(cycle.get('start_date')).format("DD/MM/YYYY") + " au " + moment(cycle.get('end_date')).format("DD/MM/YYYY")
				});
				that.set("model.previousCycle", cycle);
			});
		}
		return cycles;
	}),
  	actions: {
	    save: function(cycle) {
	    	if(cycle.get('start_date')){
	    		var startDate = moment(cycle.get('start_date'));
    			startDate.hour(0);
    			startDate.minute(0);
    			startDate.second(0);
    			startDate.millisecond(0);
    			cycle.set("start_date",startDate);

	    	}
	    	if(cycle.get('end_date')){
	    		cycle.set('ongoing', false);
	    		var endDate = moment(cycle.get('end_date'));
    			endDate.hour(23);
    			endDate.minute(59);
    			endDate.second(59);
    			endDate.millisecond(0);
    			cycle.set("end_date",endDate);
	    	} else {
	    		cycle.set('ongoing', true);
	    		if(cycle.get("previousCycle") && cycle.get("previousCycle.ongoing")){
	    			cycle.set("previousCycle.end_date",cycle.get("start_date"));
	    			cycle.set("previousCycle.ongoing",false);
	    			cycle.get("previousCycle").save();
	    		}
	    	}
	    	var that = this;
	      	cycle.save().then(function(){
	      		// that.get("applicationController.model.cycles").then(function(){
		      		that.get("applicationController.model.cycles").pushObject(cycle);
		      		that.get('applicationController.model').save().then(function(){
		      			that.transitionToRoute('cycles', that.get('applicationController.model.id'));
		      		});
		      	// });
	      	});
	    },
	    remove: function(cycle){
	    	cycle.destroyRecord();
	    }
  	},
  	observesSelectedCycle: function() {
  	  this.transitionToRoute('cycle', this.get('controllers.application.selectedCycle.id'));
  	}.observes("controllers.application.selectedCycle"),
});
