import Ember from "ember";

export default Ember.Controller.extend(Ember.Evented, {
  	selectedCycle: null,
    actions: {
      selectCycle: function(cycle) {
          this.set('selectedCycle', cycle);
      }
    }
});