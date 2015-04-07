import DS from "ember-data";

export default DS.Model.extend({
	sensation: DS.attr('string'),
	apparency_at_vulva: DS.attr('string'),
	at_cervix: DS.attr('boolean'),
	is_first_day_of_mucus_or_wet: function(){
		return this.get('cycle.first_day_of_mucus_or_wet.cycle_day_number') === this.get('cycle_day_number');
	}.property('cycle.first_day_of_mucus_or_wet', 'cycle_day_number'),
	is_mucus_peak_plus_3_days: function(){
		return this.get('cycle.mucus_peak_plus_3_days') === this.get('cycle_day_number');
	}.property('cycle.mucus_peak_plus_3_days', 'cycle_day_number'),
	cycle_day_number: function(){
		if(this.get('date')){
			var startCycleDate = moment(this.get('cycle.start_date'));
			startCycleDate.hour(0);
			startCycleDate.minute(0);
			startCycleDate.second(0);

			var mucusSampleDate = moment(this.get('date'));
			mucusSampleDate.hour(0);
			mucusSampleDate.minute(0);
			mucusSampleDate.second(0);

			return mucusSampleDate.diff(startCycleDate, 'days') + 1; 
		}
	}.property('cycle.start_date', 'date'),
	date: DS.attr('mydatetime'),
	comment: DS.attr('string'),
	cycle: DS.belongsTo('cycle')
});