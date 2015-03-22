import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ["application"],
	reRender:false,
	colorTemperatureCorrected : "rgba(151,187,205,1)",
	colorTemperature : "rgba(220,220,220,1)",
	chartOptions: {
		responsive:true,
		offsetGridLines:true,
		scaleIntegersOnly:false,
		scaleShowGridLines:true,
		multiTooltipTemplate: "<%= value %> °",
		scaleLabel: "<%= value %> °",
		datasetFill: false,
		animation: false,
	},
	noPhases: function(){
		return !this.get('phaseIDuration') && !this.get('phaseIIDuration') && !this.get('phaseIIIDuration');
	}.property('phaseIDuration', 'phaseIIDuration', 'phaseIIIDuration'),
	phaseIDuration: function(){
		if(this.get('model.endOfPhaseI')){
			return this.get('model.endOfPhaseI');
		}
	}.property('model.endOfPhaseI'),
	phaseIIDuration: function(){
		if(this.get('model.beginningOfPhaseIII') && this.get('model.beginningOfPhaseII')){
			return this.get('model.beginningOfPhaseIII') - this.get('model.beginningOfPhaseII');
		} else if(this.get('model.beginningOfPhaseII')) {
			return this.get('model.cycle_length') - this.get('model.beginningOfPhaseII') + 1;
		} else {
			return this.get('model.cycle_length');
		}
	}.property('model.beginningOfPhaseIII', 'model.beginningOfPhaseII'),
	phaseIIIDuration: function(){
		if(this.get('model.endOfPhaseII')){
			return this.get('model.cycle_length') - this.get('model.endOfPhaseII');
		}
	}.property('model.cycle_length', 'model.endOfPhaseII'),
	daysOfPhases: function(){
		var ps = [];
		for (var i = 0; i < this.get("model.cycle_length"); i++) {
			if(i + 1 > this.get('phaseIDuration') + this.get('phaseIIDuration') || i + 1 < this.get('phaseIDuration')){
				ps.push("INFERTILE");
			}
			else {
				ps.push("FERTILE");
			}
		}
		return ps;
	}.property('phaseIDuration', 'phaseIIDuration'),
	periods: function(){
		var ps = [];
		for (var i = 0; i < this.get("model.cycle_length"); i++) {
			ps.push({cycle_day_number:i+1});
		}
		this.get('model.periods').forEach(function(period){
			ps[period.get('cycle_day_number')-1] = period;
		});
		return ps;
	}.property('model.cycle_length', 'model.periods.@each.present'),
	mucusSamples: function(){
		var ps = [];
		for (var i = 0; i < this.get("model.cycle_length"); i++) {
			ps.push({cycle_day_number:i+1});
		}
		this.get('model.mucusSamples').forEach(function(mucus){
			ps[mucus.get('cycle_day_number')-1] = mucus;
		});
		
		return ps;
	}.property('model.cycle_length', 'model.mucusSamples.@each.sensation'),
	cervixFeelings: function(){
		var ps = [];
		for (var i = 0; i < this.get("model.cycle_length"); i++) {
			ps.push({cycle_day_number:i+1});
		}
		this.get('model.cervixFeelings').forEach(function(cervixFeeling){
			ps[cervixFeeling.get('cycle_day_number')-1] = cervixFeeling;
		});
		
		return ps;
	}.property('model.cycle_length', 'model.cervixFeelings.@each.sensation'),
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

	    for (var i = 0; i < this.get("model.cycle_length"); i++) {
			chartLabels.push(i+1);
			chartDatasets[0].data.push(null);
			chartDatasets[1].data.push(null);
		}

	    var cacheTemperature = this.get('model.cacheTemperature');

    	this.get('model.temperatures').sortBy('cycle_day_number').forEach(function(temperature){
    		if(!temperature.get('isDirty') && temperature.get('ignore') !== true){
    			var myTempCorrected = parseFloat(temperature.get('temperature_corrected'));
    	
		       	chartDatasets[0].data[temperature.get('cycle_day_number')-1] = parseFloat(temperature.get('temperature'));
		       	chartDatasets[1].data[temperature.get('cycle_day_number')-1] = myTempCorrected;
		       	if(cacheTemperature > 0){
		       		chartDatasets[2].data.push(cacheTemperature); 
		       	}
		    }  	
		});
	    return {
	    	labels: chartLabels,
		    datasets: chartDatasets
		};    
 	}.property('model.temperatures.@each.temperature_corrected'),
  	observesSelectedCycle: function() {
  	  this.transitionToRoute('synthese', this.get('controllers.application.selectedCycle.id'));
  	}.observes("controllers.application.selectedCycle"),
  	reRenderChart: function(){
		this.set('reRender', true);
	}.observes("controllers.application.selectedCycle"),
  	actions:{
  		selectRow: function(temperature){
  			Ember.$(".table.synthese > tbody > tr > td.info:not(." + temperature.label + ")").removeClass('info');
  			Ember.$(".table.synthese > tbody > tr > td." + temperature.label).toggleClass('info');
  		}
  	}
});
