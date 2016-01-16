import Ember from "ember";

export default Ember.Route.extend({
  model: function(params) {
  	if(params.cycle_id === 'new'){
  		return this.store.createRecord('cycle', {
  			start_date:moment(),
  		});
  	}
  	else {
  		return this.store.find('cycle', params.cycle_id);
  	}
  },
  setupController: function(controller, model) {
    model.set("profile", this.controllerFor("application").get('model'));
    this._super(controller, model);
  },
  afterModel: function(model) {
    this.get('store').find('cycle', {profile: model.get('profile.id')});
    this.get('store').find('temperature', {cycle: model.get('id')});
    this.get('store').find('mucus-sample', {cycle: model.get('id')});
    this.get('store').find('cervix-feeling', {cycle: model.get('id')});
    this.get('store').find('period', {cycle: model.get('id')});
  }
});