import Ember from "ember";

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('profile', params.profile_id);
  },
  afterModel: function(){
    this.get('store').find('cycle');
    this.get('store').find('temperature');
    this.get('store').find('mucus-sample');
    this.get('store').find('cervix-feeling');
    this.get('store').find('period');
  }
});