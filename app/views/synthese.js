import Ember from 'ember';
export default Ember.View.extend({
	fixHeight: function(){
		Ember.$('.rotated_cell').css('height', function(){
			return Ember.$(this).find('.rotate_text').text().length * 10;
		});
	}.on('didInsertElement')
});




