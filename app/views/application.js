import Ember from 'ember';
export default Ember.View.extend({
	fixMenu: function(){
		Ember.$('.nav a').not('.dropdown-toggle').on('click', function(){
		    Ember.$(".navbar-toggle:visible").click(); //bootstrap 3.x by Richard
		});
	}.on('didInsertElement')
});