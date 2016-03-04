import Ember from "ember";
import DS from "ember-data";

export default DS.Model.extend({
  surname: DS.attr('string'),
  darkMode: DS.attr('boolean'),
  temperature_taking_hour: DS.attr('mydatetime'),
  temperature_taking_mode: DS.attr('string'),
  shortest_cycle: Ember.computed('cycles.@each.cycle_length', function() {
      var shortestCycle = 999;
      this.get("cycles").forEach(function(cycle){
          if(cycle.get('end_date') && cycle.get('cycle_length') < shortestCycle){
            shortestCycle = cycle.get('cycle_length');
          }
      });
      return shortestCycle !== 999 ? shortestCycle : null;
  }),
  longest_cycle: Ember.computed('cycles.@each.cycle_length', function() {
      var longest_cycle = 0;
      this.get("cycles").forEach(function(cycle){
          if(cycle.get("ongoing") === false && cycle.get('cycle_length') > longest_cycle){
            longest_cycle = cycle.get('cycle_length');
          }
      });
      return longest_cycle !== 0 ? longest_cycle : null;
  }),
  activeCycle: Ember.computed('cycles.@each.ongoing', function() {
      var activeCycle = null;
      this.get("cycles").forEach(function(cycle){
          if(cycle.get('ongoing') === true){
            activeCycle = cycle;
          }
      });
      return activeCycle;
  }),
  cycles: DS.hasMany('cycle', { inverse: "profile" }),
  selectedCycle: DS.belongsTo('cycle', { inverse: null })
});
