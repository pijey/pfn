import Ember from "ember";

export default Ember.ObjectController.extend({
  needs: ['application'],
    actions: {
      save: function(temperature) {
          var that = this;
          temperature.save().then(function(){
              that.get("controllers.application.model.activeCycle.temperatures").pushObject(temperature);
              that.get('controllers.application.model.activeCycle').save().then(function(){
                that.transitionToRoute('temperatures', that.get('controllers.application.model.activeCycle.id'));
              });
          });
      },
      cancel: function(temperature){
        if(temperature.get('isNew')){
          temperature.destroyRecord();
        }
        else {
          temperature.rollback();
        } 
        this.transitionToRoute('temperatures', this.get('controllers.application.model.activeCycle.id'));
      }
    }
});