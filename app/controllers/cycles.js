import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ["application"],
  	actions: {
	    remove: function(cycle){
    		cycle.destroyRecord();
    		cycle.save();
    		this.get('controllers.application.model.cycles').removeObject(cycle);
    		this.get('controllers.application.model').save();
	    }
  	}
});
