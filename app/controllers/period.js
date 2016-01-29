import Ember from "ember";
import EmberValidations, {validator} from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  applicationController: Ember.inject.controller('application'),
  queryParams: ["extended"],
  goBack:false,
  validations: {
    "model.date": {
      inline: validator(function() {
        if (!this.model.get('model.date')){
          return "doit être renseignée";
        }
        else if(moment(this.model.get('model.cycle.start_date')).isAfter(this.model.get('model.date'), 'day')) {
          return "doit être postérieure à la date de début du cycle";
        }
        else if(this.model.get('model.cycle.end_date') && moment(this.model.get('model.cycle.end_date')).isBefore(this.model.get('model.date'), 'day')) {
          return "doit être antérieure à la date de fin du cycle";
        }
        //TODO Tester que le relevé doit etre unique par jour
      }) 
    }
  },
  cancel: Ember.observer("applicationController.goBack", function(){
    if(this.get("applicationController.goBack") === true){
      var cycleId = this.get('model.cycle.id');
      if(this.get('model').get('isNew')){
        this.get('model').destroyRecord();
      }
      else {
        this.get('model').rollbackAttributes();
      } 
      this.transitionToRoute('periods', cycleId, {queryParams:{isPopup:false}});
      this.set("applicationController.goBack", false);
    }
  }),
  actions: {
    save: function() {
        this.get("model").save();
    },
    
    togglePresent(){
      this.set("model.present", !this.get("model.present"));
    }
  }
});