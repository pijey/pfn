import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement(){
		Ember.$('.period-presence-popover[data-toggle="popover"]').popover({
			container:'body'
		});
	}
});
