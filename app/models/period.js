import DS from "ember-data";

export default DS.Model.extend({
	present: DS.attr('boolean', { defaultValue: false }),
  	cycle_day_number: function(){
		if(this.get('date')){
			var startCycleDate = moment(this.get('cycle.start_date'));
			startCycleDate.hour(0);
			startCycleDate.minute(0);
			startCycleDate.second(0);
			startCycleDate.millisecond(0);

			var periodDate = moment(this.get('date'));
			periodDate.hour(0);
			periodDate.minute(0);
			periodDate.second(0);
			periodDate.millisecond(0);

			return periodDate.diff(startCycleDate, 'days') + 1; 
		}
	}.property('cycle.start_date', 'date'),
	date: DS.attr('mydatetime'),
	volume: DS.attr('string'),
	comment: DS.attr('string'),
	cycle: DS.belongsTo('cycle')
});