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
  afterModel: function() {
    return this.get('store').find('cycle');
    return this.get('store').find('temperature');
  }
});