import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement(){
		Ember.$('.opening-popover[data-toggle="popover"]').popover({
			container:'body'
		});
	}
});
