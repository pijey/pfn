import Ember from "ember";

export default Ember.ObjectController.extend({
  needs: ['application'],
    actions: {
      save: function(cervixFeeling) {
          var that = this;
          cervixFeeling.save().then(function(){
              that.get("controllers.application.model.activeCycle.cervixFeelings").pushObject(cervixFeeling);
              that.get('controllers.application.model.activeCycle').save().then(function(){
                that.transitionToRoute('cervix-feelings', that.get('controllers.application.model.activeCycle.id'));
              });
          });
      },
      cancel: function(cervixFeeling){
        if(cervixFeeling.get('isNew')){
          cervixFeeling.destroyRecord();
        }
        else {
          cervixFeeling.rollback();
        } 
        this.transitionToRoute('cervix-feelings', this.get('controllers.application.model.activeCycle.id'));
      }
    }
});