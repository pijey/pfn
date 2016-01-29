import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement(){
		Ember.$('.position-popover[data-toggle="popover"]').popover({
			container:'body'
		});
	}
});
