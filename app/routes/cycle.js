import Ember from "ember";

export default Ember.Route.extend({

  model: function(params) {
  	if(params.cycle_id === 'new'){
  		return this.store.createRecord('cycle', {
  			start_date:moment()
  		});
  	}
  	else {
  		return this.store.find('cycle', params.cycle_id);
  	}
  }
});