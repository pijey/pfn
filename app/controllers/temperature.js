import Ember from "ember";
import EmberValidations, { validator } from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  needs: ['application'],
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
        else if(moment(this.model.get('model.date')).hour() < 4 || moment(this.model.get('model.date')).hour() > 11) {
          return "L'heure du relevé doit être effectuée entre 4h et 11h du matin";
        }
        //TODO Tester que le relevé doit etre unique par jour
      }) 
    },
    "model.temperature": {
      presence: {message: "doit être renseignée"},
      numericality: {
        messages: { numericality: "doit être numérique" },
        onlyInteger:false,
        greaterThan:35,
        lessThan: 38
      }
    },
    "model.temperature_corrected": {
      presence: {message: "doit être renseignée"},
      numericality: {
        messages: { numericality: "doit être numérique" },
        onlyInteger:false,
        greaterThan:35,
        lessThan: 38
      }
    },
    cycle:true
  },
  setValidation: function() {
    // this.set('validations.model.temperature.presence.message', this.get('i18n').t("errors.blank"));
    // this.set('validations.model.temperature_corrected.presence.message', this.get('i18n').t("errors.blank"));
    // this.set('validations.temperature_corrected.numericality.message', this.get('i18n').t("errors.notANumber"));
  }.on('init'),
  actions: {
    save: function() {
      var that = this;

      this.get("model").save().then(function(temperature){
          // that.get("controllers.application.model.activeCycle.temperatures").pushObject(temperature);
          that.get('controllers.application.model.activeCycle').save().then(function(){
            if(that.get('extended')){
              that.transitionToRoute('temperatures', that.get('controllers.application.model.activeCycle.id'));
            }
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
    },
    toggleIgnoreTemp(){
      this.set("model.ignore", !this.get("model.ignore"));
    }
  }
});