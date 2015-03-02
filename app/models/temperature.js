import DS from "ember-data";

export default DS.Model.extend({
	temperature: DS.attr('number'),
	cycle_day_number: function(){
		if(this.get('date')){
			var startCycleDate = moment(this.get('cycle.start_date'));
			startCycleDate.hour(0);
			startCycleDate.minute(0);
			startCycleDate.second(0);

			var temperatureTakingDate = moment(this.get('date'));
			temperatureTakingDate.hour(0);
			temperatureTakingDate.minute(0);
			temperatureTakingDate.second(0);

			return temperatureTakingDate.diff(startCycleDate, 'days') + 1; 
		}
	}.property('cycle.start_date', 'date'),
	date: DS.attr('string'),
	temperature_corrected: function(){
		if(this.get('date')){
			var temperatureTakingDateFixed = moment(this.get('cycle.profile.temperature_taking_hour'));
			var temperatureTakingDate = moment(this.get('date'));
			temperatureTakingDate.hour(temperatureTakingDateFixed.hour());
			temperatureTakingDate.minute(temperatureTakingDateFixed.minute());
			temperatureTakingDate.second(0);

			var diff = moment(this.get('date')).diff(temperatureTakingDate, 'hours', true); 
			return Math.round((parseFloat(this.get('temperature'))+diff/10)*100)/100;
		}
	}.property('date','temperature', 'cycle.profile'),
	comment: DS.attr('string'),
	cycle: DS.belongsTo('cycle')
});
