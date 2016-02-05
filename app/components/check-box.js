import Ember from 'ember';

export default Ember.Component.extend({
	checked:null,
	didInsertElement(){
		var changeCheckbox = document.querySelector('.ios7-switch');
		var that=this;
		changeCheckbox.onchange = function() {
		  that.set("checked",!that.get("checked"));
		};
	}
});
