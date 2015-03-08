import Ember from 'ember';

export default Ember.ObjectController.extend({
	colorTemperatureCorrected : "rgba(151,187,205,1)",
	colorTemperature : "rgba(220,220,220,1)",
	chartOptions: {
		scaleIntegersOnly:false,
		scaleShowGridLines:true,
		multiTooltipTemplate: "<%= value %> °",
		scaleLabel: "<%= value %> °",
		datasetFill: false

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
	        }
	    ];
    	this.get('model.temperatures').sortBy('cycle_day_number').forEach(function(temperature){
	    	chartLabels.push(temperature.get('cycle_day_number'));
	       	chartDatasets[0].data.push(parseFloat(temperature.get('temperature')));
	       	chartDatasets[1].data.push(parseFloat(temperature.get('temperature_corrected')));
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
  		
  	}
});
