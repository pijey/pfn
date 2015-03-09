import Ember from "ember";

export default Ember.Route.extend({
  model: function() {
  	var that = this;
    return this.store.find('profile').then(function(profiles){
    	if(!Ember.isEmpty(profiles)){
    		return profiles.get('firstObject');
    	}
    	else {
    		return that.store.createRecord('profile').save();
    	}
    });
  },
  setupController: function(controller, model){
    controller.set('model',model);
    controller.set('selectedCycle', model.get('activeCycle'));
  },
  afterModel: function(model) {
    this.get('store').find('cycle', {profile: model.get('id')});
    this.get('store').find('temperature', {cycle: model.get('activeCycle.id')});
    this.get('store').find('mucus-sample', {cycle: model.get('activeCycle.id')});
    this.get('store').find('cervix-feeling', {cycle: model.get('activeCycle.id')});
    this.get('store').find('period', {cycle: model.get('activeCycle.id')});
  }
});