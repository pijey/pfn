import DS from "ember-data";

export default DS.Model.extend({
  surname: DS.attr('string'),
  temperature_taking_hour: DS.attr('string'),
  temperature_taking_mode: DS.attr('string'),
  shortest_cycle: function() {
      var shortestCycle = 999;
      this.get("cycles").forEach(function(cycle){
          if(cycle.get('cycle_length') < shortestCycle){
            shortestCycle = cycle.get('cycle_length');
          }
      });
      return shortestCycle;
  }.property('cycles.@each.cycle_length'),
  longest_cycle: function() {
      var shortestCycle = 0;
      this.get("cycles").forEach(function(cycle){
          if(cycle.get('cycle_length') > shortestCycle){
            shortestCycle = cycle.get('cycle_length');
          }
      });
      return shortestCycle;
  }.property('cycles.@each.cycle_length'),
  activeCycle: function() {
      var activeCycle = null;
      this.get("cycles").forEach(function(cycle){
          if(cycle.get('ongoing') === true){
            activeCycle = cycle;
          }
      });
      return activeCycle;
  }.property('cycles.@each.ongoing'),
  cycles: DS.hasMany('cycle')
});
