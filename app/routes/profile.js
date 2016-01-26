import Ember from "ember";

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('profile', params.profile_id);
  },
  afterModel: function(){
    this.get('store').findAll('cycle');
    this.get('store').findAll('temperature');
    this.get('store').findAll('mucus-sample');
    this.get('store').findAll('cervix-feeling');
    this.get('store').findAll('period');
  }
});