import Ember from 'ember';

export default Ember.Component.extend({
	idChart:"myChart",
	width:"400",
	height:"400",
	data:null,
	options:null,
	onClick:false,
	didInsertElement:function(){
		var ctx = document.getElementById(this.get("idChart")).getContext("2d");
		var myChart = new Chart(ctx).Line(this.get("data"), this.get("options"));
		var that = this;
		document.getElementById(this.get("idChart")).onclick = function(evt){
			that.sendAction("onClick", myChart.getPointsAtEvent(evt)[0]);
		};
	}
});
