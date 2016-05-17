import DS from "ember-data";
import Ember from "ember";

export default DS.Model.extend({
  ongoing: DS.attr('boolean'),
  start_date: DS.attr('mydatetime'),
  end_date: DS.attr('mydatetime'),
  cache_temperature_cycle_day: DS.attr('number'),
  ovulation:Ember.computed('third_day_hot_temperature', 'cacheTemperature', 'temperatures.@each.temperature_corrected', function(){
    var hotTemperatures = [];
    var thirdDayHotTemperature = this.get("third_day_hot_temperature");
    var cacheTemperature = this.get("cacheTemperature");
    if(thirdDayHotTemperature > 0){
      this.get('temperatures').sortBy('cycle_day_number').filter(function(item){
        return !item.get('ignore') && item.get('cycle_day_number') >= thirdDayHotTemperature - 2;
      }).forEach(function(temp){
        if(hotTemperatures.length < 10 && temp.get('temperature_corrected') >= cacheTemperature) {
          hotTemperatures.push(temp.get('cycle_day_number'));
        } 
      });
    }
    return hotTemperatures.length === 10;
  }),
  calendarCalculation: Ember.computed('profile.shortest_cycle', function(){
    if(this.get('profile.cycles.length') < 7 || this.get('previousCycle.ovulation') === false) {
      return 1;
    }
    else if(this.get('profile.cycles.length') <= 12){
      return this.get('profile.shortest_cycle') - 21;
    }
    else if(this.get('profile.shortest_cycle')){
      return this.get('profile.shortest_cycle') - 20;
    }
    return null;
  }),
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
  // }.property('cycles.[]'),
  first_day_of_mucus_or_wet: Ember.computed('mucusSamples.@each.sensation', 'mucusSamples.@each.at_cervix',function(){
    var firstDayOfMucusOrWet;
    this.get('mucusSamples').sortBy('cycle_day_number').any(function(mucusSample){
      if(mucusSample.get('at_cervix') || mucusSample.get('sensation') === "HUMID" || mucusSample.get('sensation') === "WET"){
        firstDayOfMucusOrWet = mucusSample.get("cycle_day_number");
        return true;
      }
      return false;
    });
    return firstDayOfMucusOrWet;
  }),
  mucus_peak: Ember.computed('mucusSamples.@each.sensation', function(){
    var previousMucusSample = null;
    var mucusPeak;
    this.get('mucusSamples').sortBy('cycle_day_number').forEach(function(mucusSample){
      if(previousMucusSample != null && 
          (previousMucusSample.get('sensation') === 'HUMID' || previousMucusSample.get('sensation') === 'WET') &&
          mucusSample.get('sensation') === 'DRY'){
        mucusPeak = previousMucusSample.get("cycle_day_number");
      }
      previousMucusSample = mucusSample;
    });
    return mucusPeak;
  }),
  mucus_peak_plus_3_days: Ember.computed('mucus_peak', function() {
    if(this.get('mucus_peak')){
      return this.get('mucus_peak') + 3;
    }
  }),
  first_day_of_cervix_change: Ember.computed('cervixFeelings.@each.position', 'cervixFeelings.@each.sensation', 'cervixFeelings.@each.opening', function(){
    var previousCervixFeeling = null;
    var cervixChangeFeeling = null;
    this.get('cervixFeelings').sortBy('cycle_day_number').any(function(cervixFeeling){
      if(previousCervixFeeling !== null && 
        (
          previousCervixFeeling.get('position') === "LOW" && cervixFeeling.get('position') !== "LOW" ||
          previousCervixFeeling.get('sensation') === "HARD" && cervixFeeling.get('sensation') !== "HARD" ||
          previousCervixFeeling.get('opening') === "CLOSED" && cervixFeeling.get('opening') !== "CLOSED"
        )
      ){
        cervixChangeFeeling = cervixFeeling;
        return true;
      }
      previousCervixFeeling = cervixFeeling;
      return false;
    });
    if(cervixChangeFeeling != null){
      return cervixChangeFeeling.get("cycle_day_number");
    }
  }),
  cervix_peak: Ember.computed('cervixFeelings.@each.position', 'cervixFeelings.@each.opening', 'cervixFeelings.@each.sensation', function(){
    var previousCervixFeeling = null;
    var cervixFeelingsChanges = [];
    this.get('cervixFeelings').sortBy('cycle_day_number').forEach(function(cervixFeeling){
      if(previousCervixFeeling != null &&
        (
          previousCervixFeeling.get('position') === 'MEDIUM' && cervixFeeling.get('position') === 'LOW' || 
          (
            (cervixFeeling.get('position') === 'MEDIUM' || cervixFeeling.get('position') === 'LOW') && 
            previousCervixFeeling.get('position') === 'HIGH'
          )
        )
      )
      {
        cervixFeelingsChanges.push(previousCervixFeeling.get("cycle_day_number"));
      }

      if(previousCervixFeeling != null &&
        (
          previousCervixFeeling.get('opening') === 'SLIGHTLY_OPENNED' && cervixFeeling.get('opening') === 'CLOSED' || 
          (
            (cervixFeeling.get('opening') === 'SLIGHTLY_OPENNED' || cervixFeeling.get('opening') === 'CLOSED') && 
            previousCervixFeeling.get('opening') === 'OPENNED'
          )
        )
      )
      {
        cervixFeelingsChanges.push(previousCervixFeeling.get("cycle_day_number"));
      }

      if(previousCervixFeeling != null && previousCervixFeeling.get('sensation') === 'SOFT' && cervixFeeling.get('sensation') === 'HARD')
      {
        cervixFeelingsChanges.push(previousCervixFeeling.get("cycle_day_number"));
      }

      previousCervixFeeling = cervixFeeling;
    });
    
    let min = Math.min(...cervixFeelingsChanges);
    if(min > 0 && min < Infinity){
      return min;
    }
  }),
  cervix_peak_plus_3_days: function() {
    if(this.get('cervix_peak')){
      return this.get('cervix_peak') + 3;
    }
  }.property('cervix_peak'),
  cycle_length: Ember.computed('start_date', 'end_date', function(){
    if(this.get('start_date') && this.get("end_date")){
      var diff = moment(this.get('end_date')).diff(moment(this.get('start_date')), 'days') + 1;
      return diff > 0 ? diff : undefined;
    } else if(this.get("start_date")){
      return moment().diff(moment(this.get('start_date')), 'days') + 1;
    }
  }),
  endOfPhaseI: function(){
    if(this.get('beginningOfPhaseII') > 1){
      return this.get('beginningOfPhaseII') - 1;
    }
    return null;
  }.property('beginningOfPhaseII'),
  endOfPhaseII: Ember.computed('third_day_hot_temperature', 'cervix_peak_plus_3_days', 'mucus_peak_plus_3_days', function(){
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
    if(days.length > 0) {
      return days.reduce(function (curr, prev) { return curr > prev ? curr : prev; });
    }
  }),
  beginningOfPhaseII: Ember.computed('first_day_of_cervix_change', 'first_day_of_mucus_or_wet', 'calendarCalculation', function(){
    var days = [];
    if(this.get('calendarCalculation')){
      days.push(this.get('calendarCalculation'));
    }
    if(this.get('first_day_of_cervix_change')){
      days.push(this.get('first_day_of_cervix_change'));
    }
    if(this.get('first_day_of_mucus_or_wet')){
      days.push(this.get('first_day_of_mucus_or_wet'));
    } 
    if(days.length > 0){
      return days.reduce(function (curr, prev) { return curr < prev ? curr : prev; });
    }
  }),
  beginningOfPhaseIII: Ember.computed('endOfPhaseII', function(){
    if(this.get('endOfPhaseII')){
      return this.get('endOfPhaseII') + 1;
    }
  }),
  third_day_hot_temperature:Ember.computed('cache_temperature_cycle_day', 'cache_temperature', function(){
    var cacheTemperature = this.get("cacheTemperature");
    var cacheTemperatureCycleDay = this.get("cache_temperature_cycle_day");
    if(!cacheTemperature || !cacheTemperatureCycleDay){
      return;
    }
    var thirdDayHotTemperature;
    var hotTemperatureDayMinus3 = null;
    var hotTemperatureDayMinus2 = null;
    var hotTemperatureDay = null;
    var notFound = true;
    var checkNextHighValue = false;
    var maxTmpPlusMargin = Math.round((cacheTemperature + 0.2)*10)/10;
    this.get('temperatures').sortBy('cycle_day_number').forEach(function(temperature){
      if(temperature.get('cycle_day_number') >= cacheTemperatureCycleDay){
        var myTempCorrected = parseFloat(temperature.get('temperature_corrected'));
        
        //We set the three days before the hot temperature day
        if(hotTemperatureDayMinus3 === null){
          hotTemperatureDayMinus3 = temperature;
        } else if (hotTemperatureDayMinus2 === null){
          hotTemperatureDayMinus2 = temperature;
        }
        else if(cacheTemperature < myTempCorrected && notFound && temperature.get('ignore') !== true) {
            //Test of the fourth high temperature
            if(checkNextHighValue && myTempCorrected > cacheTemperature){
              hotTemperatureDay = temperature;
              thirdDayHotTemperature = temperature.get('cycle_day_number');
              notFound = false;
            }
            else if(hotTemperatureDayMinus3.get('temperature_corrected') > cacheTemperature && 
              hotTemperatureDayMinus2.get('temperature_corrected') > cacheTemperature && 
              myTempCorrected > cacheTemperature){
              //The third hot day of temperature needs to be 0.20 higher than the cache temperature
              if(myTempCorrected >= maxTmpPlusMargin){
                hotTemperatureDay = temperature;
                thirdDayHotTemperature = temperature.get('cycle_day_number');
                notFound = false;
              }
              //If not, check if the next value is above the cache temperature
              else {
                checkNextHighValue = true;
              }
            }
          hotTemperatureDayMinus3 = hotTemperatureDayMinus2;
          hotTemperatureDayMinus2 = temperature;
        }
        else {
          hotTemperatureDayMinus3 = hotTemperatureDayMinus2;
          hotTemperatureDayMinus2 = temperature;
        }
      }
    });
    return thirdDayHotTemperature;
  }),
  cacheTemperature: Ember.computed('temperatures.@each.temperature', 'temperatures.@each.temperature_corrected', function(){
    var cacheTemperature = null;
    var temperatures = [];
    var maxTemperature = 0.0;
    var hotTemperatureDayMinus3 = null;
    var hotTemperatureDayMinus2 = null;
    var notFound = true;
    var that = this;
    this.get('temperatures').sortBy('cycle_day_number').forEach(function(temperature){
      var myTempCorrected = parseFloat(temperature.get('temperature_corrected'));
      //First four days don't count
      if(temperature.get('cycle_day_number') > 4 && notFound && temperature.get('ignore') !== true) {
        //We need at least six temperatures to define the cache temperature
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
            if(hotTemperatureDayMinus3.get('temperature_corrected') > maxTemperature && hotTemperatureDayMinus2.get('temperature_corrected') > maxTemperature && myTempCorrected > maxTemperature){
              cacheTemperature = maxTemperature;
                that.set("cache_temperature_cycle_day", hotTemperatureDayMinus3.get('cycle_day_number'));
                notFound=false;
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
  }),
  periodsPresent: Ember.computed.filterBy('periods', 'present', true),
  temperatures_corrected: Ember.computed.mapBy('temperatures', 'temperature_corrected'),
  temperatures_entered: Ember.computed.mapBy('temperatures', 'temperature'),
  lowest_temperature: Ember.computed.min('temperatures_entered'),
  highest_temperature: Ember.computed.max('temperatures_entered'),
  lowest_temperature_corrected: Ember.computed.min('temperatures_corrected'),
  highest_temperature_corrected: Ember.computed.max('temperatures_corrected'),
  previousCycle: DS.belongsTo('cycle', {inverse: null}),
  profile: DS.belongsTo('profile'),
  periods: DS.hasMany('period'),
  temperatures: DS.hasMany('temperature'),
  mucusSamples: DS.hasMany('mucusSample'),
  cervixFeelings: DS.hasMany('cervixFeeling')
});