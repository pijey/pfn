import Ember from "ember";

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('cycle', params.cycle_id);
    if(params.cervix_feeling_id === 'new'){
      var that = this;
      return this.store.find('cycle', params.cycle_id).then(function(cycle){
          return that.store.createRecord('cervix-feeling', {
            date:moment(),
            cycle:cycle
          });
      });
    }
    else {
      return this.store.find('cervix-feeling', params.cervix_feeling_id);
    }
  },
  afterModel: function() {
    return this.get('store').find('cervix-feeling');
  }

});