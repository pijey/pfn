import Ember from "ember";

export default Ember.Controller.extend({
  needs: ['application'],
  queryParams: ["extended"],
  actions: {
    save: function() {
        var that = this;
        this.get("model").save().then(function(){
            that.get('controllers.application.model.activeCycle').save().then(function(){
              if(!that.get('inline')){
                that.transitionToRoute('periods', that.get('controllers.application.model.activeCycle.id'));
              }
            });
        });
    },
    cancel: function(period){
      if(period.get('isNew')){
        period.destroyRecord();
      }
      else {
        period.rollback();
      } 
      this.transitionToRoute('periods', this.get('controllers.application.model.activeCycle.id'));
    },
    togglePresent(){
      this.set("model.present", !this.get("model.present"));
    }
  }
});