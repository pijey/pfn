import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement(){
		Ember.$('.inclining-popover[data-toggle="popover"]').popover({
			container:'body'
		});
	}
});
