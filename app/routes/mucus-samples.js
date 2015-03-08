import Ember from "ember";

export default Ember.Route.extend({
  model: function(params) {
	return this.store.find('cycle', params.cycle_id);
	if(params.mucus_sample_id === 'new'){
		var that = this;
		return this.store.find('cycle', params.cycle_id).then(function(cycle){
		  	return that.store.createRecord('mucus-sample', {
			    date:moment(),
			    cycle:cycle
		  	});
		});
	}
	else {
		return this.store.find('mucus-sample', params.mucus_sample_id);
	}
  },
  afterModel: function() {
	return this.get('store').find('mucus-sample');
  }

});