import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ["application"],
	colorTemperatureCorrected : "rgba(151,187,205,1)",
	colorTemperature : "rgba(220,220,220,1)",
	chartOptions: {
		scaleIntegersOnly:false,
		scaleShowGridLines:true,
		multiTooltipTemplate: "<%= value %> °",
		scaleLabel: "<%= value %> °",
		datasetFill: false,
		animation:false

	},
 	dataChart: function(){
 		var chartLabels = [];
 		var chartDatasets = [
	        {
	            label: "Températures relevées",
	            fillColor: "rgba(220,220,220,0.2)",
	            strokeColor: this.colorTemperature,
	            pointColor: this.colorTemperature,
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: []
	        },
	        {
	            label: "Températures corrigées",
	            fillColor: "rgba(151,187,205,0.2)",
	            strokeColor: this.colorTemperatureCorrected,
	            pointColor: this.colorTemperatureCorrected,
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(151,187,205,1)",
	            data: []
	        },
	        {
	            label: "Ligne de cache",
	            fillColor: "rgba(0,0,0,1)",
	            strokeColor: "rgba(0,0,0,1)",
	            pointColor: "rgba(0,0,0,0)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(151,187,205,1)",
	            data: []
	        }
	    ];

	    var cacheTemperature = this.get('model.cacheTemperature');

    	this.get('model.temperatures').sortBy('cycle_day_number').forEach(function(temperature){
    		var myTempCorrected = parseFloat(temperature.get('temperature_corrected'));
    	
	    	chartLabels.push(temperature.get('cycle_day_number'));
	       	chartDatasets[0].data.push(parseFloat(temperature.get('temperature')));
	       	chartDatasets[1].data.push(myTempCorrected);
	       	chartDatasets[2].data.push(cacheTemperature);    	
		});
		   
	    return {
	    	labels: chartLabels,
		    datasets: chartDatasets
		};    
 	}.property('model.temperatures.@each.temperature_corrected'),
  	actions: {
	    remove: function(temperature) {
	       temperature.destroyRecord(temperature); 
	    },
  		
  	},
  	observesSelectedCycle: function() {
  	  this.transitionToRoute('temperatures', this.get('controllers.application.selectedCycle.id'));
  	}.observes("controllers.application.selectedCycle"),
});
