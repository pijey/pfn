import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ['application'],
	cycles: function(){
		var cycles = [];
		this.get('model.profile.cycles').sortBy('start_date:desc').without(this.get('model')).forEach(function(cycle){
			cycles.push({
				id: cycle,
				label: moment(cycle.get('start_date')).format("DD/MM/YYYY") + " au " + moment(cycle.get('end_date')).format("DD/MM/YYYY")
			});
		});
		return cycles;
	}.property('model.profile.cycles'),
  	actions: {
	    save: function(cycle) {
	    	if(cycle.get('end_date')){
	    		cycle.set('ongoing', false);
	    	} else {
	    		cycle.set('ongoing', true);
	    	}
	    	var that = this;
	      	cycle.save().then(function(){
	      		that.get('controllers.application.model.cycles').then(function(){
		      		that.get("controllers.application.model.cycles").pushObject(cycle);
		      		that.get('controllers.application.model').save().then(function(){
		      			that.transitionToRoute('cycles', that.get('controllers.application.model.id'));
		      		});
		      	});
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
