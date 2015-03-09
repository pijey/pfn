import Ember from "ember";

export default Ember.ObjectController.extend({
  	selectedCycle: null,
    actions: {
      selectCycle: function(cycle) {
          this.set('selectedCycle', cycle);
          this.get('store').find('temperature', {cycle: cycle.id});
          this.get('store').find('mucus-sample', {cycle: cycle.id});
          this.get('store').find('cervix-feeling', {cycle: cycle.id});
          this.get('store').find('period', {cycle: cycle.id});
      }
    }
});