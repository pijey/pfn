import DS from "ember-data";

export default DS.Model.extend({
  ongoing: DS.attr('boolean'),
  start_date: DS.attr('mydatetime'),
  end_date: DS.attr('string'),
  first_day_of_mucus_or_wet: DS.attr('number'),
  first_day_of_mucus_or_wet_date: function(){
    if(this.get('first_day_of_mucus_or_wet')){
      return moment(this.get('start_date')).add(this.get('first_day_of_mucus_or_wet')-1, 'days');
    }
  }.property('start_date', 'first_day_of_mucus_or_wet'),
  mucus_peak: DS.attr('number'),
  mucus_peak_date: function(){
    if(this.get('mucus_peak')){
      return moment(this.get('start_date')).add(this.get('mucus_peak')-1, 'days');
    }
  }.property('start_date', 'mucus_peak'),
  mucus_peak_plus_3_days: function() {
    if(this.get('mucus_peak')){
      return this.get('mucus_peak') + 3;
    }
  }.property('mucus_peak'),
  mucus_peak_plus_3_days_date: function(){
    if(this.get('start_date')){
      return moment(this.get('start_date')).add(this.get('mucus_peak_plus_3_days')-1, 'days');
    }
  }.property('start_date', 'mucus_peak_plus_3_days'),
  first_day_of_cervix_change: DS.attr('number'),
  first_day_of_cervix_change_date: function(){
    if(this.get('first_day_of_cervix_change')){
      return moment(this.get('start_date')).add(this.get('first_day_of_cervix_change')-1, 'days');
    }
  }.property('start_date', 'first_day_of_cervix_change'),
  cervix_peak: function(){
    var previousCervixFeeling = null;
    this.get('cervixFeelings').sortBy('cycle_day_number').forEach(function(cervixFeeling){
      if(previousCervixFeeling !== null && previousCervixFeeling.get('position') === "HIGH" && cervixFeeling.get('position') !== "HIGH"){
        return previousCervixFeeling;
      }
      previousCervixFeeling = cervixFeeling;
    });
  }.property('cervixFeelings.@each.position'),
  cervix_peak_plus_3_days: function() {
    if(this.get('cervix_peak')){
      return this.get('cervix_peak') + 3;
    }
  }.property('cervix_peak'),
  cervix_peak_plus_3_days_date: function(){
    if(this.get('cervix_peak_plus_3_days')){
      return moment(this.get('start_date')).add(this.get('cervix_peak_plus_3_days')-1, 'days');
    }
  }.property('start_date', 'cervix_peak_plus_3_days'),
  third_day_hot_temperature: DS.attr('number'),
  third_day_hot_temperature_date: function(){
    if(this.get('third_day_hot_temperature')){
      return moment(this.get('start_date')).add(this.get('third_day_hot_temperature')-1, 'days');
    }
  }.property('start_date', 'third_day_hot_temperature'),
  cycle_length: function(){
    if(this.get('start_date') && this.get("end_date")){
      return moment(this.get('end_date')).diff(moment(this.get('start_date')), 'days');
    }
  }.property('start_date', 'end_date'),
  profile: DS.belongsTo('profile'),
  periods: DS.hasMany('period'),
  temperatures: DS.hasMany('temperature'),
  mucusSamples: DS.hasMany('mucusSample'),
  cervixFeelings: DS.hasMany('cervixFeeling')
});