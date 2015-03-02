import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ['application'],
  	actions: {
	    save: function(profile) {
	    	profile.save();
	    }
  	}
});