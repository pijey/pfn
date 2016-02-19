import Ember from 'ember';
import RecognizerMixin from 'ember-gestures/mixins/recognizers';

export default Ember.Component.extend(RecognizerMixin, {
	recognizers: 'swipe',
  	dayNumber: null,
  	model: null,
  	previousNumber: Ember.computed("dayNumber", function(){
  		return this.get("dayNumber")>1 ? this.get("dayNumber") -1 : null;
  	}),
  	nextNumber: Ember.computed("dayNumber", "model.cycle_length", function(){
  		return this.get("dayNumber") < this.get("model.cycle_length") ? parseInt(this.get("dayNumber")) + 1 : null;
  	}),
	actions:{
		changeDay: function(day){
			this.set("dayNumber", day);
			this.get("changeDay")(day);
		}
	},
	swipeRight(){
		var day = this.get("dayNumber");
		if(day > 1){
			this.set("dayNumber", day - 1);
			this.get("changeDay")(day);
		}
	},
	swipeLeft(){
		var day = this.get("dayNumber");
		if(day < this.get("model.cycle_length")){
			this.set("dayNumber", day + 1);
			this.get("changeDay")(day);
		}
	}
});
