import DS from "ember-data";

export default DS.Model.extend({
	present: DS.attr('boolean'),
  	cycle_day_number: function(){
		if(this.get('date')){
			var startCycleDate = moment(this.get('cycle.start_date'));
			startCycleDate.hour(0);
			startCycleDate.minute(0);
			startCycleDate.second(0);

			var periodDate = moment(this.get('date'));
			periodDate.hour(0);
			periodDate.minute(0);
			periodDate.second(0);

			return periodDate.diff(startCycleDate, 'days') + 1; 
		}
	}.property('cycle.start_date', 'date'),
	date: DS.attr('mydatetime'),
	comment: DS.attr('string'),
	cycle: DS.belongsTo('cycle')
});