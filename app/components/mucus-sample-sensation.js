import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement(){
		Ember.$('.ms-sensation-popover[data-toggle="popover"]').popover({
			container:'body'
		});
	}
});
