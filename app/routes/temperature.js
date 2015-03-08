import Ember from "ember";

export default Ember.Route.extend({
  model: function(params) {
    if(params.temperature_id === 'new'){
      var that = this;
      return this.store.find('cycle', params.cycle_id).then(function(cycle){
        return that.store.createRecord('temperature', {
          date:moment(),
          cycle:cycle
        });
      });
  	}
  	else {
  		return this.store.find('temperature', params.temperature_id);
  	}
  }
});