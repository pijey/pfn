import DS from "ember-data";

export default DS.Model.extend({
	sensation: DS.attr('string'),//HARD/SOFT
  	opening: DS.attr('string'),//CLOSED/SLIGHTLY_OPENNED/OPENNED
  	position: DS.attr('string'),//LOW/MEDIUM/HIGH
  	inclining: DS.attr('string'),//HORIZONTAL/NEARLY_HORIZONTAL/NEARLY_VERTICAL/VERTICAL
  	cycle_day_number: function(){
		if(this.get('date')){
			var startCycleDate = moment(this.get('cycle.start_date'));
			startCycleDate.hour(0);
			startCycleDate.minute(0);
			startCycleDate.second(0);

			var cervixFeelingDate = moment(this.get('date'));
			cervixFeelingDate.hour(0);
			cervixFeelingDate.minute(0);
			cervixFeelingDate.second(0);

			return cervixFeelingDate.diff(startCycleDate, 'days') + 1; 
		}
	}.property('cycle.start_date', 'date'),
  	date: DS.attr('mydatetime'),
  	comment: DS.attr('string'),
  	cycle: DS.belongsTo('cycle')
});
