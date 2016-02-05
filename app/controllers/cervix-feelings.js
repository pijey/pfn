import Ember from 'ember';

export default Ember.Controller.extend({
  	needs: ["application"],
  	cyclePage:true,
  	actions: {
	    remove: function(cervixFeeling) {
	       cervixFeeling.destroyRecord(); 
	    },
  	},
  	observesSelectedCycle: function() {
  	  this.transitionToRoute('cervix-feelings', this.get('controllers.application.selectedCycle.id'));
  	}.observes("controllers.application.selectedCycle"),
});
