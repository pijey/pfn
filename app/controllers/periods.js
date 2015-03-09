import Ember from 'ember';

export default Ember.ObjectController.extend({
  	needs: ["application"],
  	actions: {
	    remove: function(period) {
	       period.destroyRecord(); 
	    },
  		
  	},
  	observesSelectedCycle: function() {
  	  this.transitionToRoute('periods', this.get('controllers.application.selectedCycle.id'));
  	}.observes("controllers.application.selectedCycle")
});
