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
			var that = this;
			
			var takingDate = moment(this.get("model.start_date")).add(day-1,'days').second(0).millisecond(0);
			this.store.find('cycle', this.get("model.id")).then(function(m){
				
				if(!that.get("newTemperatures").contains(day)){
					that.store.createRecord('temperature', {
			          date:takingDate,
			          cycle:m
			        });
			        that.get("newTemperatures").push(day);
				}
				if(!that.get("newMucus").contains(day)){
					that.store.createRecord('mucus-sample', {
			          date:takingDate,
			          cycle:m
			        });
			        that.get("newMucus").push(day);
				}
				if(!that.get("newCervix").contains(day)){
					that.store.createRecord('cervix-feeling', {
			          date:takingDate,
			          cycle:m
			        });
			        that.get("newCervix").push(day);
				}
				if(!that.get("newPeriods").contains(day)){
					that.store.createRecord('period', {
			          date:takingDate,
			          cycle:m
			        });
			        that.get("newPeriods").push(day);
				}
				that.set("dayNumber", day);
		        that.set('model', m);
			});
		}
	}
});