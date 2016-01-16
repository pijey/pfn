import DS from "ember-data";
import Ember from "ember";

export default DS.Model.extend({
  ongoing: DS.attr('boolean'),
  start_date: DS.attr('mydatetime'),
  end_date: DS.attr('mydatetime'),
  ovulation:function(){
    var that = this;
    if(this.get('third_day_hot_temperature') > 0){
      this.get('temperatures').sortBy('cycle_day_number').forEach(function(temp){
        if(temp.get('cycle_day_number') >= that.get('third_day_hot_temperature') - 3 && temp.get('cycle_day_number') <= that.get('third_day_hot_temperature') + 7){
          if(temp.get('temperature_corrected') < that.get('cacheTemperature')){
            return false;
          }
        }
      });
      return true;
    } else {
      return false;
    }
  }.property('third_day_hot_temperature', 'cacheTemperature', 'temperatures.@each.temperature_corrected'),
  calendarCalculation: function(){
    if(this.get('previousCycle.ovulation') === false || this.get('profile.cycles').length < 6) {
      return 1;
    }
    else if(this.get('profile.cycles').length < 12){
      return this.get('profile.shortest_cycle') - 21;
    }
    else {
      return this.get('profile.shortest_cycle') - 20;
    }
  }.property('profile.shortest_cycle'),
  // ovulationPreviousCycle:function(){
  //   var that = this;
  //   return this.get('profile.cycles').sortBy('start_date:desc').filter(function(item){
  //     if(item.get('id') === that.get('id')){
  //       return false;
  //     } else if(moment(item.get('start_date')).after(that.get('start_date'))){
  //       return false;
  //     }
  //     return true;
  //   }).objectAt(0).get('ovulation');
  // }.property('cycles.@each'),
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
    } else {
      return moment().diff(moment(this.get('start_date')), 'days') + 1;
    }
  }.property('start_date', 'end_date'),
  endOfPhaseI: function(){
    if(this.get('beginningOfPhaseII') > 1){
      return this.get('beginningOfPhaseII') - 1;
    }
  }.property('beginningOfPhaseII'),
  endOfPhaseII: function(){
    var days = [];
    if(this.get('third_day_hot_temperature')){
      days.push(this.get('third_day_hot_temperature'));
    }
    if(this.get('cervix_peak_plus_3_days')){
      days.push(this.get('cervix_peak_plus_3_days'));
    } 
    if(this.get('mucus_peak_plus_3_days')){
      days.push(this.get('mucus_peak_plus_3_days'));
    }
    return days.length > 0 ? days.reduce(function (curr, prev) { return curr > prev ? curr : prev; }) : null;
  }.property('third_day_hot_temperature', 'cervix_peak_plus_3_days', 'mucus_peak_plus_3_days', 'temperatures.@each'),
  beginningOfPhaseII: function(){
    var days = [this.get('calendarCalculation')];
    if(this.get('first_day_of_cervix_change')){
      days.push(this.get('first_day_of_cervix_change.cycle_day_number'));
    }
    if(this.get('first_day_of_mucus_or_wet')){
      days.push(this.get('first_day_of_cervix_change.cycle_day_number'));
    } 
    return days.length > 1 ? days.reduce(function (curr, prev) { return curr < prev ? curr : prev; }) : days[0];
  }.property('first_day_of_cervix_change', 'first_day_of_mucus_or_wet', 'calendarCalculation'),
  beginningOfPhaseIII: function(){
    if(this.get('endOfPhaseII')){
      return this.get('endOfPhaseII') + 1;
    }
  }.property('endOfPhaseII'),
  cacheTemperature: function(){
    this.set('third_day_hot_temperature', null);
    var cacheTemperature = null;
    var temperatures = [];
    var maxTemperature = 0.0;
    var hotTemperatureDayMinus3 = null;
    var hotTemperatureDayMinus2 = null;
    var hotTemperatureDay = null;
    var notFound = true;
    var checkNextHighValue = false;
    var that = this;
    Ember.$.each(this.get('temperatures').sortBy('cycle_day_number'), function(index, temperature){
      var myTempCorrected = parseFloat(temperature.get('temperature_corrected'));
      //First four days don't count
      if(temperature.get('cycle_day_number') > 4 && notFound && temperature.get('ignore') !== true) {
        //We need at least six temperatures to define the cache temperature
        if(temperatures.length < 6){
          temperatures.push(myTempCorrected);
          maxTemperature = temperatures.reduce(function (curr, prev) { return curr > prev ? curr : prev; });
        }
        else {
          //We set the three days before the hot temperature day
          if(hotTemperatureDayMinus3 === null){
            hotTemperatureDayMinus3 = temperature;
          } else if (hotTemperatureDayMinus2 === null){
            hotTemperatureDayMinus2 = temperature;
          } else {
            var maxTmpPlusMargin = Math.round((maxTemperature + 0.2)*10)/10;
            console.log(maxTmpPlusMargin);
            if(checkNextHighValue && myTempCorrected > maxTemperature){
              hotTemperatureDay = temperature;
              that.set('third_day_hot_temperature', temperature.get('cycle_day_number'));
              notFound = false;
            }
            else if(hotTemperatureDayMinus3.get('temperature_corrected') > maxTemperature && hotTemperatureDayMinus2.get('temperature_corrected') > maxTemperature && myTempCorrected > maxTemperature){
              //The third hot day of temperature needs to be 0.10 higher than the cache temperature
              if(myTempCorrected >= maxTmpPlusMargin){
                cacheTemperature = maxTemperature;
                hotTemperatureDay = temperature;
                that.set('third_day_hot_temperature', temperature.get('cycle_day_number'));
                notFound = false;
              }
              //If not, check if the next value is above the cache temperature
              else {
                cacheTemperature = maxTemperature;
                checkNextHighValue = true;
              }
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
  temperatures_corrected: Ember.computed.mapProperty('temperatures', 'temperature_corrected'),
  lowest_temperature: Ember.computed.min('temperatures_corrected'),
  highest_temperature: Ember.computed.max('temperatures_corrected'),
  previousCycle: DS.belongsTo('cycle', {inverse: null}),
  profile: DS.belongsTo('profile'),
  periods: DS.hasMany('period'),
  temperatures: DS.hasMany('temperature'),
  mucusSamples: DS.hasMany('mucusSample'),
  cervixFeelings: DS.hasMany('cervixFeeling')
});