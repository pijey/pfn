import Ember from "ember";

export default Ember.Route.extend({

  model: function(params) {
  	return this.store.find('cycle', params.cycle_id);
  },
  afterModel: function(model) {
    this.get('store').query('temperature', {cycle: model.get('id')});
    this.get('store').query('mucus-sample', {cycle: model.get('id')});
    this.get('store').query('cervix-feeling', {cycle: model.get('id')});
    this.get('store').query('period', {cycle: model.get('id')});
  }
});