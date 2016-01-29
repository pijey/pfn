import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement(){
		Ember.$('.sensation-popover[data-toggle="popover"]').popover({
			container:'body'
		});
	}
});
