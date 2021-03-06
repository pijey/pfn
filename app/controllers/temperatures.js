import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ["application"],
	cyclePage:true,
	colorTemperatureCorrected : "rgba(151,187,205,1)",
	colorTemperature : "rgba(220,220,220,1)",
	chartOptions: Ember.computed("model.highest_temperature", "model.lowest_temperature","model.highest_temperature_corrected", "model.lowest_temperature_corrected", function(){
		var maxTemperature = Math.max(this.get('model.highest_temperature'),this.get('model.highest_temperature_corrected'));
		var minTemperature = Math.min(this.get('model.lowest_temperature'),this.get('model.lowest_temperature_corrected'));

		return {
			responsive:true,
			offsetGridLines:true,
			scaleIntegersOnly:false,
			scaleShowGridLines:true,
			multiTooltipTemplate: "<%= value %> °",
			scaleLabel: "<%= value %> °",
			datasetFill: true,
			animation:false,
			scaleOverride: true,
	    	scaleSteps: Math.round((maxTemperature - minTemperature) / 0.05) + 2,
	    	scaleStepWidth: 0.05,
	    	scaleStartValue: Math.round(minTemperature*10)/10-0.05,
		};
	}),
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
	            fillColor: "rgba(0,0,0,0)",
	            strokeColor: "rgba(0,0,0,1)",
	            pointColor: "rgba(0,0,0,0)",
	            pointStrokeColor: "rgba(0,0,0,0)",
	            pointHighlightFill: "rgba(0,0,0,0)",
	            pointHighlightStroke: "rgba(0,0,0,1)",
	            pointDot: false,
                pointDotRadius: 0,
	            data: []
	        }
	    ];

	    var cacheTemperature = this.get('model.cacheTemperature');

	    for (var i = 0; i < this.get("model.cycle_length"); i++) {
			chartLabels.push(i+1);
			chartDatasets[0].data.push(null);
			chartDatasets[1].data.push(null);
			if(cacheTemperature > 0){
	       		chartDatasets[2].data.push(cacheTemperature); 
	       	}
		}

    	this.get('model.temperatures').sortBy('cycle_day_number').forEach(function(temperature){
    		if(!temperature.get('isNew') && temperature.get('ignore') !== true){
    			var myTempCorrected = parseFloat(temperature.get('temperature_corrected'));
		       	chartDatasets[0].data[temperature.get('cycle_day_number')-1] = parseFloat(temperature.get('temperature'));
		       	chartDatasets[1].data[temperature.get('cycle_day_number')-1] = myTempCorrected;
		    }  	
		});
		   
	    return {
	    	labels: chartLabels,
		    datasets: chartDatasets
		};    
 	}.property('model.temperatures.[].temperature_corrected'),
  	actions: {
	    remove: function(temperature) {
	       temperature.destroyRecord(temperature); 
	    }
  	},
  	observesSelectedCycle: function() {
  	  this.transitionToRoute('temperatures', this.get('controllers.application.selectedCycle.id'));
  	}.observes("controllers.application.selectedCycle"),
});
