import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement(){
		Ember.$('[data-toggle="popover"]').popover({
			container:'body'
		});
	}
});
