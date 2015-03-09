import DS from "ember-data";
import Ember from "ember";

export default DS.Model.extend({
  ongoing: DS.attr('boolean'),
  start_date: DS.attr('mydatetime'),
  end_date: DS.attr('mydatetime'),
  first_day_of_mucus_or_wet: function(){
    var previousMucusSample = null;
    var firstDayWet = null;
    Ember.$.each(this.get('mucusSamples').sortBy('cycle_day_number'), function(index, mucusSample){
      if(
        previousMucusSample !== null && 
        (
          previousMucusSample.get('at_cervix') === true && mucusSample.get('position') !== true ||
          previousMucusSample.get('sensation') === "DRY" && mucusSample.get('sensation') !== "DRY"
        )
      ){
        firstDayWet = previousMucusSample;
        return false;
      }
      previousMucusSample = mucusSample;
    });
    return firstDayWet;
  }.property('mucusSamples.@each.sensation', 'mucusSamples.@each.at_cervix'),
  mucus_peak: function(){
    var previousMucusSample = null;
    var mucusPeak = null;
    Ember.$.each(this.get('mucusSamples').sortBy('cycle_day_number'), function(index, mucusSample){
      if(previousMucusSample !== null && previousMucusSample.get('sensation') !== 'DRY' && mucusSample.get('position') !== 'DRY'){
        mucusPeak = previousMucusSample;
      }
      previousMucusSample = mucusSample;
    });
    return mucusPeak;
  }.property('mucusSamples.@each.sensation'),
  mucus_peak_plus_3_days: function() {
    if(this.get('mucus_peak.cycle_day_number')){
      return this.get('mucus_peak.cycle_day_number') + 3;
    }
  }.property('mucus_peak'),
  first_day_of_cervix_change: function(){
    var previousCervixFeeling = null;
    var cervixChangeFeeling = null;
    Ember.$.each(this.get('cervixFeelings').sortBy('cycle_day_number'), function(index, cervixFeeling){
      if(
        previousCervixFeeling !== null && 
        (
          previousCervixFeeling.get('position') === "LOW" && cervixFeeling.get('position') !== "LOW" ||
          previousCervixFeeling.get('sensation') === "HARD" && cervixFeeling.get('sensation') !== "HARD" ||
          previousCervixFeeling.get('opening') === "CLOSED" && cervixFeeling.get('opening') !== "CLOSED"
        )
      ){
        cervixChangeFeeling = cervixFeeling;
        return false;
      }
      previousCervixFeeling = cervixFeeling;
    });
    return cervixChangeFeeling;
  }.property('cervixFeelings.@each.position', 'cervixFeelings.@each.sensation', 'cervixFeelings.@each.opening'),
  cervix_peak: function(){
    var previousCervixFeeling = null;
    var cervixPeakFeeling = null;
    Ember.$.each(this.get('cervixFeelings').sortBy('cycle_day_number'), function(index, cervixFeeling){
      if(previousCervixFeeling !== null && previousCervixFeeling.get('position') === "HIGH" && cervixFeeling.get('position') !== "HIGH"){
        cervixPeakFeeling = previousCervixFeeling;
        return false;
      }
      previousCervixFeeling = cervixFeeling;
    });
    return cervixPeakFeeling;
  }.property('cervixFeelings.@each.position'),
  cervix_peak_plus_3_days: function() {
    if(this.get('cervix_peak.cycle_day_number')){
      return this.get('cervix_peak.cycle_day_number') + 3;
    }
  }.property('cervix_peak'),
  third_day_hot_temperature: null,
  cycle_length: function(){
    if(this.get('start_date') && this.get("end_date")){
      return moment(this.get('end_date')).diff(moment(this.get('start_date')), 'days');
    }
  }.property('start_date', 'end_date'),
  endOfPhaseI: function(){
    return this.get('beginningOfPhaseII') - 1;
  }.property('beginningOfPhaseII'),
  endOfPhaseII: function(){
    return [this.get('third_day_hot_temperature'), this.get('cervix_peak_plus_3_days'), this.get('mucus_peak_plus_3_days')].reduce(function (curr, prev) { return curr > prev ? curr : prev; });
  }.property('third_day_hot_temperature', 'cervix_peak_plus_3_days', 'mucus_peak_plus_3_days'),
  beginningOfPhaseII: function(){
    return [this.get('first_day_of_cervix_change.cycle_day_number'), this.get('first_day_of_mucus_or_wet.cycle_day_number')].reduce(function (curr, prev) { return curr < prev ? curr : prev; });
  }.property('first_day_of_cervix_change', 'first_day_of_mucus_or_wet'),
  beginningOfPhaseIII: function(){
    return this.get('endOfPhaseII') + 1;
  }.property('endOfPhaseII'),
  cacheTemperature: function(){
    var cacheTemperature = null;
    var temperatures = [];
    var maxTemperature = 0.0;
    var hotTemperatureDayMinus3 = null;
    var hotTemperatureDayMinus2 = null;
    var hotTemperatureDay = null;
    var notFound = true;
    var that = this;
    Ember.$.each(this.get('temperatures').sortBy('cycle_day_number'), function(index, temperature){
      var myTempCorrected = parseFloat(temperature.get('temperature_corrected'));
      if(temperature.get('cycle_day_number') > 4 && notFound) {
        if(temperatures.length < 6){
          temperatures.push(myTempCorrected);
          maxTemperature = temperatures.reduce(function (curr, prev) { return curr > prev ? curr : prev; });
        }
        else {
          if(hotTemperatureDayMinus3 === null){
            hotTemperatureDayMinus3 = temperature;
          } else if (hotTemperatureDayMinus2 === null){
            hotTemperatureDayMinus2 = temperature;
          } else {
            var maxTmpPlusMargin = Math.round((maxTemperature + 0.2)*10)/10;
            if(hotTemperatureDayMinus3.get('temperature_corrected') > maxTemperature && hotTemperatureDayMinus2.get('temperature_corrected') > maxTemperature && myTempCorrected >= maxTmpPlusMargin){
              cacheTemperature = maxTemperature;
              hotTemperatureDay = temperature;
              that.set('third_day_hot_temperature', temperature.get('cycle_day_number'));
              notFound = false;
            } else {
              temperatures.push(hotTemperatureDayMinus3.get('temperature_corrected'));
              hotTemperatureDayMinus3 = hotTemperatureDayMinus2;
              hotTemperatureDayMinus2 = temperature;
              temperatures.splice(0,1);
              maxTemperature = temperatures.reduce(function (curr, prev) { return curr > prev ? curr : prev; });
            }
          }
        }
      }
    });
    return cacheTemperature;
  }.property('temperatures.@each.temperature_corrected'),
  profile: DS.belongsTo('profile'),
  periods: DS.hasMany('period'),
  temperatures: DS.hasMany('temperature'),
  mucusSamples: DS.hasMany('mucusSample'),
  cervixFeelings: DS.hasMany('cervixFeeling')
});