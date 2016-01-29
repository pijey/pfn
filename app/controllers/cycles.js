import Ember from 'ember';

export default Ember.Controller.extend({
	applicationController: Ember.inject.controller('application'),
  	actions: {
	    remove(cycle){
    		cycle.destroyRecord();
    		cycle.save();
    		this.get('applicationController.model.cycles').removeObject(cycle);
    		this.get('applicationController.model').save();
	    },
	    selectCycle(cycle){
	    	this.set("applicationController.model.selectedCycle", cycle);
	    	this.get("applicationController.model").save();
	    }
  	}
});
