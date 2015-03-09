import Ember from 'ember';

export default Ember.ObjectController.extend({
  	needs: ["application"],
  	actions: {
	    remove: function(mucus) {
	       mucus.destroyRecord(); 
	    },
  		
  	},
  	observesSelectedCycle: function() {
  	  this.transitionToRoute('mucus-samples', this.get('controllers.application.selectedCycle.id'));
  	}.observes("controllers.application.selectedCycle")
});
