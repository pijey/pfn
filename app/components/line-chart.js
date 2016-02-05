import Ember from 'ember';

export default Ember.Component.extend({
	idChart:"myChart",
	viewPortWidthPercentage:100,
	viewPortHeightPercentage:40,
	data:null,
	options:null,
	onClick:false,
	didInsertElement:function(){

		Ember.$("#"+this.get("idChart")).attr("height", Math.round(document.documentElement.clientHeight*this.get("viewPortHeightPercentage")/100));
		Ember.$("#"+this.get("idChart")).attr("width", Math.round(document.documentElement.clientWidth*this.get("viewPortWidthPercentage")/100));

		var ctx = document.getElementById(this.get("idChart")).getContext("2d");
		var myChart = new Chart(ctx).Line(this.get("data"), this.get("options"));
		var that = this;
		document.getElementById(this.get("idChart")).onclick = function(evt){
			that.sendAction("onClick", myChart.getPointsAtEvent(evt)[0]);
		};
	}
});
