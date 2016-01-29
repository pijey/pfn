import Ember from "ember";

export default Ember.Route.extend({
  model: function() {
  	var that = this;
    return this.store.findAll('profile').then(function(profiles){
    	if(!Ember.isEmpty(profiles)){
    		return profiles.get('firstObject');
    	}
    	else {
    		return that.store.createRecord('profile', {
          cycles:[]
        }).save();
    	}
    });
  },
  setupController: function(controller, model){
    controller.set('model',model);
  },
  afterModel: function(model) {
    this.get('store').query('cycle', {profile: model.get('id')});
    this.get('store').query('temperature', {cycle: model.get('selectedCycle.id')});
    this.get('store').query('mucus-sample', {cycle: model.get('selectedCycle.id')});
    this.get('store').query('cervix-feeling', {cycle: model.get('selectedCycle.id')});
    this.get('store').query('period', {cycle: model.get('selectedCycle.id')});
  }
});