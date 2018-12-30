import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement(){
		if(navigator.splashscreen){
  			navigator.splashscreen.hide();
  		}
	}
});
