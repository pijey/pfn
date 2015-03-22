import Ember from "ember";
import EmberValidations from 'ember-validations';

export default Ember.ObjectController.extend(EmberValidations.Mixin, {
  needs: ['application'],
  inline:false,
  validations: {
    date: {
      inline: EmberValidations.validator(function() {
        if (!this.model.get('date')){
          return "La date doit être renseignée";
        }
        else if(moment(this.model.get('cycle.start_date')).isAfter(this.model.get('date'), 'day')) {
          return "La date du relevé doit être postérieure à la date de début du cycle";
        }
        else if(this.model.get('cycle.end_date') && moment(this.model.get('cycle.end_date')).isBefore(this.model.get('date'), 'day')) {
          return "La date du relevé doit être antérieure à la date de fin du cycle";
        }
        else if(moment(this.model.get('date')).hour() < 4 || moment(this.model.get('date')).hour() > 11) {
          return "L'heure du relevé doit être effectuée entre 4h et 11h du matin";
        }
        //TODO Tester que le relevé doit etre unique par jour
      }) 
    },
    temperature: {
      presence: {message: null},
      numericality: {
        message:null,
        onlyInteger:false,
        greaterThan:35,
        lessThan: 38
      }
    },
    temperature_corrected: {
      presence: {message: null},
      numericality: {
        onlyInteger:false,
        greaterThan:35,
        lessThan: 38
      }
    },
    cycle:true
  },
  setValidation: function() {
    this.set('validations.temperature.presence.message', this.t("errors.blank"));
    this.set('validations.temperature_corrected.presence.message', this.t("errors.blank"));
    // this.set('validations.temperature_corrected.numericality.message', this.t("errors.notANumber"));
  }.on('init'),
  actions: {
    save: function(temperature) {
      var that = this;

      temperature.save().then(function(){
          that.get("controllers.application.model.activeCycle.temperatures").pushObject(temperature);
          that.get('controllers.application.model.activeCycle').save().then(function(){
            if(!that.get('inline')){
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
    }
  }
});