import Ember from 'ember';
import EmberValidations, {validator} from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
	applicationController: Ember.inject.controller('application'),
	cyclePage:true,
	validations: {
	    "model.start_date": {
	      inline: validator(function() {
	        
	        // else if(moment(this.model.get('model.cycle.start_date')).isAfter(this.model.get('model.date'), 'day')) {
	        //   return "doit être postérieure à la date de début du cycle";
	        // }
	      }) 
	    },
	},
	cycles: Ember.computed("model.profile.cycles.[]", function(){
		var cycles = [];
		if(this.get('model.profile.cycles.length') > 0){
			var that = this;
			this.get('model.profile.cycles').sortBy('start_date:desc').without(this.get('model')).forEach(function(cycle){
				cycles.push({
					value: cycle,
					label: moment(cycle.get('start_date')).format("DD/MM/YYYY") + " au " + moment(cycle.get('end_date')).format("DD/MM/YYYY")
				});
				that.set("model.previousCycle", cycle);
			});
		}
		return cycles;
	}),
  	actions: {
	    save(cycle) {
	    	if(cycle.get('start_date')){
	    		var startDate = moment(cycle.get('start_date'));
    			startDate.hour(0);
    			startDate.minute(0);
    			startDate.second(0);
    			startDate.millisecond(0);
    			cycle.set("start_date",startDate);

	    	}
	    	if(cycle.get('end_date')){
	    		cycle.set('ongoing', false);
	    		var endDate = moment(cycle.get('end_date'));
    			endDate.hour(23);
    			endDate.minute(59);
    			endDate.second(59);
    			endDate.millisecond(0);
    			cycle.set("end_date",endDate);
	    	} else {
	    		cycle.set('ongoing', true);
	    		if(cycle.get("previousCycle") && cycle.get("previousCycle.ongoing")){
	    			cycle.set("previousCycle.end_date",cycle.get("start_date"));
	    			cycle.set("previousCycle.ongoing",false);
	    			cycle.get("previousCycle").then(function(previousCycle){previousCycle.save();});
	    		}
	    		this.set("model.profile.selectedCycle", cycle);
	    		this.get("model.profile").then(function(profile){profile.save();});
	    	}
	      	cycle.save();
	    },
	    selectPreviousCycle(cycle) {
        	this.set('model.previousCycle', cycle);
      	}
  	}
});
