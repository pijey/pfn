import Ember from 'ember';
import RecognizerMixin from 'ember-gestures/mixins/recognizers';

export default Ember.Component.extend(RecognizerMixin, {
	recognizers: 'pan',
	baseCellWidth:30,
	screenWidth:null,
	width:Ember.computed('model.cycle_length', 'baseCellWidth', 'screenWidth', function(){
		var minWidth = this.get("model.cycle_length") * this.get("baseCellWidth");
		return minWidth > document.documentElement.clientWidth ? minWidth - 30 : document.documentElement.clientWidth - 30;
	}),
	marginLeft:0,
	colorTemperatureCorrected : "rgba(151,187,205,1)",
	colorTemperature : "rgba(220,220,220,1)",
	cycleDataNotEmpty: Ember.computed("model.mucusSamples.[]","model.periods.[]","model.cervixFeelings.[]", function(){
		return this.get("model.mucusSamples.length") > 0 || 
			this.get("model.periods.length") > 0 || 
			this.get("model.cervixFeelings.length") > 0;
	}),
	chartOptions: Ember.computed("model.highest_temperature", "model.lowest_temperature","model.highest_temperature_corrected", "model.lowest_temperature_corrected", function(){
		var maxTemperature = Math.max(this.get('model.highest_temperature'),this.get('model.highest_temperature_corrected'));
		var minTemperature = Math.min(this.get('model.lowest_temperature'),this.get('model.lowest_temperature_corrected'));
		return {
			responsive:false,
			offsetGridLines:true,
			scaleLineColor: "#666",
			scaleGridLineColor: "rgba(102, 102, 102, .2)",
			scaleIntegersOnly:false,
			scaleShowGridLines:true,
			multiTooltipTemplate: "<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%= value %> °",
			scaleLabel: "<%= value %> °",
			datasetFill: true,
			animation:false,
			tooltipEvents:["touchstart", "click"],
			scaleOverride: true,
	    	scaleSteps: Math.round((maxTemperature - minTemperature) / 0.05) + 2,
	    	scaleStepWidth: 0.05,
	    	scaleStartValue: Math.round(minTemperature*10)/10-0.05,
		};
	}),
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
	}.property('model.cycle_length', 'model.periods.[].present'),
	mucusSamples: function(){
		var ps = [];
		for (var i = 0; i < this.get("model.cycle_length"); i++) {
			ps.push({cycle_day_number:i+1});
		}
		this.get('model.mucusSamples').forEach(function(mucus){
			ps[mucus.get('cycle_day_number')-1] = mucus;
		});
		
		return ps;
	}.property('model.cycle_length', 'model.mucusSamples.[].sensation'),
	cervixFeelings: function(){
		var ps = [];
		for (var i = 0; i < this.get("model.cycle_length"); i++) {
			ps.push({cycle_day_number:i+1});
		}
		this.get('model.cervixFeelings').forEach(function(cervixFeeling){
			ps[cervixFeeling.get('cycle_day_number')-1] = cervixFeeling;
		});
		
		return ps;
	}.property('model.cycle_length', 'model.cervixFeelings.[].sensation'),
 	dataChart: Ember.computed('model.temperatures.[].temperature_corrected', function(){
 		var chartLabels = [];
 		var chartDatasets = [
	        {
	            label: "Température relevée",
	            fillColor: "rgba(220,220,220,0.2)",
	            strokeColor: this.colorTemperature,
	            pointColor: this.colorTemperature,
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: []
	        },
	        {
	            label: "Température corrigée",
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
	            strokeColor: "#F39C12",
	            pointColor: "#F39C12",
	            pointStrokeColor: "rgba(0,0,0,0)",
	            pointHighlightFill: "rgba(0,0,0,1)",
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
 	}),
	panStart:function() {
		console.log("pan");
      	this.set("marginLeft", parseInt( Ember.$( "#synthesis-content").css( "margin-left" ), 0 ));
    },
    pan:function( e ) {
      	var delta = this.get("marginLeft") + e.originalEvent.gesture.deltaX;
      	if ( delta <= 0 && delta >= document.documentElement.clientWidth - this.get("width") - 30) {
        	Ember.$( "#synthesis-content").css( {
        		"margin-left": this.get("marginLeft") + e.originalEvent.gesture.deltaX
      		} );  
      	}
    },
    didInsertElement(){
    	var that = this;
    	Ember.$(window).on("resize orientationchange", function(){
    		that.set("screenWidth", document.documentElement.clientWidth);
    		that.set("marginLeft",0);
    	});
    },
    actions:{
  		selectRow: function(temperature){
  			Ember.$(".table.synthese > tbody > tr > td.info:not(." + temperature.label + ")").removeClass('info');
  			Ember.$(".table.synthese > tbody > tr > td." + temperature.label).toggleClass('info');
  		}
  	} 
});
