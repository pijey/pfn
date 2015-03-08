import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ['application'],
  	actions: {
	    save: function(cycle) {
	    	if(cycle.get('end_date')){
	    		cycle.set('ongoing', false);
	    	} else {
	    		cycle.set('ongoing', true);
	    	}
	    	cycle.set('start_date', moment(cycle.get('start_date').format("YYYY-MM-DD HH:mm:ss")));
	    	cycle.set('profile', this.get('controllers.application.model'));
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
  	}
});
