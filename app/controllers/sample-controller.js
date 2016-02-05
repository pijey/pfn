import Ember from "ember";

export default Ember.Controller.extend({
  queryParams: ["extended"],
  backRoute:null,
  actions: {
    save: function() {
        this.get("model").save();
    },
    goBack:function(){
      var cycleId = this.get('model.cycle.id');
      if(this.get('model').get('isNew')){
        this.get('model').destroyRecord();
      }
      else {
        this.get('model').rollbackAttributes();
      } 
      this.transitionToRoute(this.get("backRoute"), cycleId, {queryParams:{isPopup:false}});
    },
  }
});