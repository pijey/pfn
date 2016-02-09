import DS from "ember-data";

export default DS.Model.extend({
	sensation: DS.attr('string'),//HARD/SOFT
  	opening: DS.attr('string'),//CLOSED/SLIGHTLY_OPENNED/OPENNED
  	position: DS.attr('string'),//LOW/MEDIUM/HIGH
  	inclining: DS.attr('string'),//HORIZONTAL/NEARLY_HORIZONTAL/NEARLY_VERTICAL/VERTICAL
  	is_first_day_of_cervix_change: function(){
  		return this.get('cycle.first_day_of_cervix_change') === this.get('cycle_day_number');
  	}.property('cycle.first_day_of_cervix_change', 'cycle_day_number'),
  	is_cervix_peak_plus_3_days: function(){
  		return this.get('cycle.cervix_peak_plus_3_days') === this.get('cycle_day_number');
  	}.property('cycle.cervix_peak_plus_3_days', 'cycle_day_number'),
  	cycle_day_number: function(){
		if(this.get('date')){
			var startCycleDate = moment(this.get('cycle.start_date'));
			startCycleDate.hour(0);
			startCycleDate.minute(0);
			startCycleDate.second(0);
			startCycleDate.millisecond(0);

			var cervixFeelingDate = moment(this.get('date'));
			cervixFeelingDate.hour(0);
			cervixFeelingDate.minute(0);
			cervixFeelingDate.second(0);
			cervixFeelingDate.millisecond(0);

			return cervixFeelingDate.diff(startCycleDate, 'days') + 1; 
		}
	}.property('cycle.start_date', 'date'),
  	date: DS.attr('mydatetime'),
  	comment: DS.attr('string'),
  	cycle: DS.belongsTo('cycle')
});
