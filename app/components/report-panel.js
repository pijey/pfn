import Ember from 'ember';
import RecognizerMixin from 'ember-gestures/mixins/recognizers';

export default Ember.Component.extend(RecognizerMixin, {
	recognizers: 'swipe',
	tabs:["temperature", "mucus-sample", "cervix-feeling", "period"],
	swipeRight(){
		var index = this.get("tabs").indexOf(this.get("type"));
		if(index > 0){
			this.set("type", this.get("tabs").objectAt(index - 1));
			this.get("changeReport")();
		}
	},
	swipeLeft(){
		var index = this.get("tabs").indexOf(this.get("type"));
		if(index < this.get("tabs.length")){
			this.set("type", this.get("tabs").objectAt(index + 1));
			this.get("changeReport")();
		}
	}
});
