import Ember from "ember";
import EmberValidations, {validator} from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  sensations:[{label: 'Sec', value: 'DRY'},{label: 'Humide', value: 'HUMID'},{label: 'Mouillé', value: 'WET'}],
  queryParams: ["extended"],
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
    },
    "model.sensation": {
      presence: {message: "doit être renseignée"}
    },
    cycle:true
  },
  needs: ['application'],
  setValidation: function() {
    // this.set('validations.model.sensation.presence.message', this.t("errors.blank"));
  }.on('init'),
  actions: {
    save: function() {
        var that = this;
        this.get("model").save().then(function(){
          if(that.get('extended')){
            that.transitionToRoute('mucus-samples', that.get('model.cycle.id'));
          }
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
    },
    selectSensation(sensation){
      this.set('model.sensation', sensation);
    },
    toggleAtCervix(){
      this.set('model.at_cervix', !this.get("model.at_cervix"));
    }
  }
});