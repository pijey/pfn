import Ember from "ember";

export default Ember.Route.extend({
  model(params) {
    if(params.period_id === 'new'){
      var that = this;
      return this.store.find('cycle', params.cycle_id).then(function(cycle){
        return that.store.createRecord('period', {
          date:moment(),
          present:false,
          cycle:cycle
        });
      });
    }
    else {
      return this.store.find('period', params.period_id);
    }
  }
});