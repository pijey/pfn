import Ember from 'ember';

export default Ember.Component.extend({
	idChart:"myChart",
	width:"400",
	height:"400",
	data:null,
	options:null,
	didInsertElement:function(){
		var ctx = document.getElementById(this.get("idChart")).getContext("2d");
		var myChart = new Chart(ctx).Line(this.get("data"), this.get("options"));
	}
});
