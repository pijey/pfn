import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params) {
	    return this.store.find('cycle', params.cycle_id);
	},
	renderTemplate: function() {
		this.render('daily-report');
	    
		this.renderTemperature();
		this.renderMucus();
		this.renderCervix();
		this.renderPeriod();
	},
	renderTemperature: function(){
		var controllerTemperature = this.controllerFor('temperature');
		var that = this;
	    var temperature = null;
	    this.currentModel.get('temperatures').forEach(function(temp){
	    	if(temp.get("cycle_day_number") === that.currentModel.get('cycle_length')){
	    		if(!temp.isNew || temp.isNew && temperature === null){
	    			temperature = temp;
	    		}
	    	}
	    });


	    if(temperature === null){
	    	var takingHour = moment(this.currentModel.get('profile.temperature_taking_hour')).hour();
	    	var takingMinute = moment(this.currentModel.get('profile.temperature_taking_hour')).minute();
	    	var takingDate = moment().hour(takingHour).minute(takingMinute).second(0).millisecond(0);
	    	temperature = this.store.createRecord('temperature', {
	          date:takingDate,
	          cycle:this.currentModel
	        });
	    }
	    temperature.set('inline', true);
	    // Render the `favoritePost` template into
	    // the outlet `posts`, and use the `favoritePost`
	    // controller.
	    this.render('temperature', {
	      into: 'daily-report',
	      outlet: 'temperature',
	      controller: controllerTemperature,
	      model:temperature
	    });
	},
	renderMucus: function(){
		var controllerMucusSample = this.controllerFor('mucusSample');
	    var that = this;
	    var mucusSample = null;
	    this.currentModel.get('mucusSamples').forEach(function(temp){
	    	if(temp.get("cycle_day_number") === that.currentModel.get('cycle_length')){
	    		if(!temp.isDirty || temp.isDirty && mucusSample === null){
	    			mucusSample = temp;
	    		}
	    	}
	    });


	    if(mucusSample === null){
	    	mucusSample = this.store.createRecord('mucusSample', {
	          date:moment(),
	          cycle:this.currentModel
	        });
	    }

	    mucusSample.set('inline', true);

	    // Render the `favoritePost` template into
	    // the outlet `posts`, and use the `favoritePost`
	    // controller.
	    this.render('mucusSample', {
	      into: 'daily-report',
	      outlet: 'mucusSample',
	      controller: controllerMucusSample,
	      model:mucusSample
	    });
	},
	renderCervix: function(){
		var controllerCervixFeeling = this.controllerFor('cervixFeeling');
	    var that = this;
	    var cervixFeeling = null;
	    this.currentModel.get('cervixFeelings').forEach(function(temp){
	    	if(temp.get("cycle_day_number") === that.currentModel.get('cycle_length')){
	    		if(!temp.isDirty || temp.isDirty && cervixFeeling === null){
	    			cervixFeeling = temp;
	    		}
	    	}
	    });


	    if(cervixFeeling === null){
	    	cervixFeeling = this.store.createRecord('cervixFeeling', {
	          date:moment(),
	          cycle:this.currentModel
	        });
	    }

	    cervixFeeling.set('inline', true);

	    // Render the `favoritePost` template into
	    // the outlet `posts`, and use the `favoritePost`
	    // controller.
	    this.render('cervixFeeling', {
	      into: 'daily-report',
	      outlet: 'cervixFeeling',
	      controller: controllerCervixFeeling,
	      model:cervixFeeling
	    });
	},
	renderPeriod: function(){
		var controllerPeriod = this.controllerFor('period');
	    var that = this;
	    var period = null;
	    this.currentModel.get('periods').forEach(function(temp){
	    	if(temp.get("cycle_day_number") === that.currentModel.get('cycle_length')){
	    		if(!temp.isDirty || temp.isDirty && period === null){
	    			period = temp;
	    		}
	    	}
	    });


	    if(period === null){
	    	period = this.store.createRecord('period', {
	          date:moment(),
	          cycle:this.currentModel
	        });
	    }

		cervixFeeling.set('inline', true);

	    // Render the `favoritePost` template into
	    // the outlet `posts`, and use the `favoritePost`
	    // controller.
	    this.render('period', {
	      into: 'daily-report',
	      outlet: 'period',
	      controller: controllerPeriod,
	      model:period
	    });
	}
});
