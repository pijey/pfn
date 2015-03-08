import Ember from "ember";

export default Ember.ObjectController.extend({
  needs: ['application'],
    actions: {
      save: function(mucusSample) {
          var that = this;
          mucusSample.save().then(function(){
              that.get("controllers.application.model.activeCycle.mucusSamples").pushObject(mucusSample);
              that.get('controllers.application.model.activeCycle').save().then(function(){
                that.transitionToRoute('mucus-samples', that.get('controllers.application.model.activeCycle.id'));
              });
          });
      },
      cancel: function(mucusSample){
        if(mucusSample.get('isNew')){
          mucusSample.destroyRecord();
        }
        else {
          mucusSample.rollback();
        } 
        this.transitionToRoute('mucus-samples', this.get('controllers.application.model.activeCycle.id'));
      }
    }
});