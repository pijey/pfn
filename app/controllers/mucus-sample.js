import Ember from "ember";
import EmberValidations from 'ember-validations';

export default Ember.ObjectController.extend(EmberValidations.Mixin, {
  inline:false,
  sensations:[{label: 'Sec', value: 'DRY'},{label: 'Humide', value: 'HUMID'},{label: 'Mouillé', value: 'WET'}],
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
        //TODO Tester que le relevé doit etre unique par jour
      }) 
    },
    sensation: {
      presence: {message: null}
    },
    cycle:true
  },
  needs: ['application'],
  setValidation: function() {
    this.set('validations.sensation.presence.message', this.t("errors.blank"));
  }.on('init'),
  actions: {
    save: function(mucusSample) {
        var that = this;
        mucusSample.save().then(function(){
            that.get("controllers.application.model.activeCycle.mucusSamples").pushObject(mucusSample);
            that.get('controllers.application.model.activeCycle').save().then(function(){
              if(!that.get('inline')){
                that.transitionToRoute('mucus-samples', that.get('controllers.application.model.activeCycle.id'));
              }
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