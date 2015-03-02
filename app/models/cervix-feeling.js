import DS from "ember-data";

export default DS.Model.extend({
	sensation: DS.attr('string'),//HARD/SOFT
  	opening: DS.attr('string'),//CLOSED/SLIGHTLY_OPENNED/OPENNED
  	position: DS.attr('string'),//LOW/MEDIUM/HIGH
  	inclining: DS.attr('string'),//HORIZONTAL/NEARLY_HORIZONTAL/NEARLY_VERTICAL/VERTICAL
  	cycle_day_number: DS.attr('number'),
  	date: DS.attr('date'),
  	formatted_date: function(){
   		return moment(this.get('cycle.date')).add(this.get('cycle_day_number')-1,'days').format('DD/MM/YYYY');
  	}.property('cycle_day_number'),
  	comment: DS.attr('string'),
  	cycle: DS.belongsTo('cycle')
});
