import Ember from 'ember';

export default Ember.ObjectController.extend({
  	actions: {
	    remove: function(mucus) {
	       mucus.destroyRecord(); 
	    },
  		
  	}
});
