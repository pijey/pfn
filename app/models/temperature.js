import DS from "ember-data";

export default DS.Model.extend({
	temperature: DS.attr('number'),
	cycle_day_number: function(){
		if(this.get('date') && this.get('cycle.start_date')){
			var startCycleDate = moment(this.get('cycle.start_date'));
			startCycleDate.hour(0);
			startCycleDate.minute(0);
			startCycleDate.second(0);
			startCycleDate.millisecond(0);

			var temperatureTakingDate = moment(this.get('date'));
			temperatureTakingDate.hour(0);
			temperatureTakingDate.minute(0);
			temperatureTakingDate.second(0);
			temperatureTakingDate.millisecond(0);

			if(!startCycleDate.isAfter(temperatureTakingDate)){
				return temperatureTakingDate.diff(startCycleDate, 'days') + 1; 
			}
			
		}
	}.property('cycle.start_date', 'date'),
	is_third_day_hot_temperature: function(){
	  return this.get('cycle.third_day_hot_temperature') === this.get('cycle_day_number');
	}.property('cycle.third_day_hot_temperature', 'cycle_day_number'),
	date: DS.attr('mydatetime'),
	temperature_corrected: function(){
		if(this.get('cycle.profile.temperature_taking_hour') && this.get('date') && !isNaN(parseFloat(this.get('temperature')))){
			var temperatureTakingDateFixed = moment(this.get('cycle.profile.temperature_taking_hour'));
			var temperatureTakingDate = moment(this.get('date'));
			if(temperatureTakingDate.hour() >= 4 && temperatureTakingDate.hour() < 11){
				temperatureTakingDate.hour(temperatureTakingDateFixed.hour());
				temperatureTakingDate.minute(temperatureTakingDateFixed.minute());
				temperatureTakingDate.second(0);
				temperatureTakingDate.millisecond(0);

				var diff = moment(this.get('date')).diff(temperatureTakingDate, 'hours', true); 
				return Math.round((parseFloat(this.get('temperature'))-diff/10)*100)/100;
			}
		}
	}.property('date','temperature', 'cycle.profile.temperature_taking_hour'),
	comment: DS.attr('string'),
	ignore: DS.attr('boolean', { defaultValue: false }),
	cycle: DS.belongsTo('cycle')
});
