import DS from "ember-data";

export default DS.Model.extend({
	sensation: DS.attr('string'),//WET/HUMID/DRY
	apparency_at_vulva: DS.attr('string'),
	at_cervix: DS.attr('boolean'),
	cycle_day_number: DS.attr('number'),
	date: DS.attr('date'),
	formatted_date: function(){
		return moment(this.get('cycle.start_date')).add(this.get('cycle_day_number')-1,'days').format('DD/MM/YYYY');
	}.property('cycle_day_number'),
	comment: DS.attr('string'),
	cycle: DS.belongsTo('cycle')
});