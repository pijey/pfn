import Ember from "ember";

export default Ember.Controller.extend({
  	dayNumber: null,
  	newTemperatures:[],
  	newMucus:[],
  	newCervix:[],
  	newPeriods:[],
	temperature: Ember.computed("model.temperatures.[]", "dayNumber", function(){
		var tmp = null;
		var dayNumber = this.get("dayNumber");
		if(dayNumber && this.get("model.temperatures")){
			this.get("model.temperatures").forEach(function(temp){
		    	if(temp.get("cycle_day_number") === dayNumber){
		    		if(!temp.isNew || temp.isNew && tmp === null){
		    			tmp = temp;
		    		}
		    	}
			});
		}
		
	    return tmp;
	}),
	mucus: Ember.computed("model.mucusSamples.[]", "dayNumber", function(){
		var tmp = null;
		var dayNumber = this.get("dayNumber");
		if(dayNumber && this.get("model.mucusSamples")){
			this.get("model.mucusSamples").forEach(function(temp){
		    	if(temp.get("cycle_day_number") === dayNumber){
		    		if(!temp.isNew || temp.isNew && tmp === null){
		    			tmp = temp;
		    		}
		    	}
			});
		}
		
	    return tmp;
	}),
	cervix: Ember.computed("model.cervixFeelings.[]", "dayNumber", function(){
		var tmp = null;
		var dayNumber = this.get("dayNumber");
		if(dayNumber && this.get("model.cervixFeelings")){
			this.get("model.cervixFeelings").forEach(function(temp){
		    	if(temp.get("cycle_day_number") === dayNumber){
		    		if(!temp.isNew || temp.isNew && tmp === null){
		    			tmp = temp;
		    		}
		    	}
			});
		}
		
	    return tmp;
	}),
	period: Ember.computed("model.periods.[]", "dayNumber", function(){
		var tmp = null;
		var dayNumber = this.get("dayNumber");
		if(dayNumber && this.get("model.periods")){
			this.get("model.periods").forEach(function(temp){
		    	if(temp.get("cycle_day_number") === dayNumber){
		    		if(!temp.isNew || temp.isNew && tmp === null){
		    			tmp = temp;
		    		}
		    	}
			});
		}
		
	    return tmp;
	}),
  	previousNumber: Ember.computed("dayNumber", function(){
  		return this.get("dayNumber")>1 ? this.get("dayNumber") -1 : null;
  	}),
  	nextNumber: Ember.computed("dayNumber", "model.cycle_length", function(){
  		return this.get("dayNumber") < this.get("model.cycle_length") ? parseInt(this.get("dayNumber")) + 1 : null;
  	}),
	actions:{
		changeDay: function(day){
			var takingDate = moment(this.get("model.start_date")).add(day-1,'days').second(0).millisecond(0);
			if(!this.get("newTemperatures").contains(day)){
				this.store.createRecord('temperature', {
		          date:takingDate,
		          cycle:this.get("model")
		        });
		        this.get("newTemperatures").push(day);
			}
			if(!this.get("newMucus").contains(day)){
				this.store.createRecord('mucus-sample', {
		          date:takingDate,
		          cycle:this.get("model")
		        });
		        this.get("newMucus").push(day);
			}
			if(!this.get("newCervix").contains(day)){
				this.store.createRecord('cervix-feeling', {
		          date:takingDate,
		          cycle:this.get("model")
		        });
		        this.get("newCervix").push(day);
			}
			if(!this.get("newPeriods").contains(day)){
				this.store.createRecord('period', {
		          date:takingDate,
		          cycle:this.get("model")
		        });
		        this.get("newPeriods").push(day);
			}
			this.set("dayNumber", day);
		}
	}
});