import Ember from "ember";

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('profile', params.profile_id);
  },
  afterModel: function(model) {
    this.get('store').query('cycle', {profile:model.get('id')});
  }
});