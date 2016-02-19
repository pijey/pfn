import Ember from 'ember';

export default Ember.Component.extend({
	idChart:"myChart",
	viewPortWidthPercentage:100,
	viewPortHeightPercentage:40,
	height:null,
	width:null,
	data:null,
	chart:null,
	options:null,
	onClick:false,
	drawChart(){
		if(this.get("height") === null){
			this.set("height", Math.round(document.documentElement.clientHeight*this.get("viewPortHeightPercentage")/100));
		}
		if(this.get("width") === null){
			this.set("width", Math.round(document.documentElement.clientWidth*this.get("viewPortWidthPercentage")/100));
		}
		Ember.$("#"+this.get("idChart")).attr("height", this.get("height"));
		Ember.$("#"+this.get("idChart")).attr("width", this.get("width"));

		var ctx = document.getElementById(this.get("idChart")).getContext("2d");
		var myChart = new Chart(ctx).Line(this.get("data"), this.get("options"));
		this.set("chart", myChart);
		var that = this;
		document.getElementById(this.get("idChart")).onclick = function(evt){
			that.sendAction("onClick", myChart.getPointsAtEvent(evt)[0]);
		};
	},
	didInsertElement(){
		this.drawChart();
	    this.addObserver('data.[]', this, this.dataChanged);
	    this.addObserver('width', this, this.dataChanged);
	    this.addObserver('height', this, this.dataChanged);
	},
	dataChanged(){
		if(this.get("chart")){
			this.get("chart").destroy();
		}
		this.drawChart();
	},
});
