import Ember from 'ember';

export default Ember.Controller.extend({
	applicationController: Ember.inject.controller('application'),
	cyclePage:true,
  	actions: {
	    remove(cycle){
	    	if(confirm("Êtes-vous sûrs de vouloir supprimer ce cycle ?")){
	    		cycle.destroyRecord();
	    	}
	    },
	    selectCycle(cycle){
	    	this.set("applicationController.model.selectedCycle", cycle);
	    	this.get("applicationController.model").save();
	    }
  	}
});
