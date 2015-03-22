import Ember from "ember";
import EmberValidations from 'ember-validations';

export default Ember.ObjectController.extend(EmberValidations.Mixin, {
  needs: ['application'],
  inline:false,
  sensations: [{label: 'Dur', value: "HARD"},{label: 'Mou', value: "SOFT"}],
  openings: [{label: 'Fermé', value: "CLOSED"},{label: 'Légèrement ouvert', value: "SLIGHTLY_OPENNED"},{label: 'Ouvert', value: "OPENNED"}],
  positions: [{label: 'Bas', value: "LOW"},{label: 'Moyen', value: "MEDIUM"},{label: 'Haut', value: "HIGH"}],
  inclinings: [{label: 'Horizontal', value: "HORIZONTAL"},{label: 'Presque horizontal', value: "NEARLY_HORIZONTAL"},{label: 'Presque vertical', value: "NEARLY_VERTICAL"},{label: 'Vertical', value: "VERTICAL"}],
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
    position: {
      presence: {message: null}
    },
    opening: {
      presence: {message: null}
    },
    cycle:true
  },
  setValidation: function() {
    this.set('validations.sensation.presence.message', this.t("errors.blank"));
    this.set('validations.opening.presence.message', this.t("errors.blank"));
    this.set('validations.position.presence.message', this.t("errors.blank"));
  }.on('init'),
  actions: {
    save: function(cervixFeeling) {
        var that = this;
        cervixFeeling.save().then(function(){
            that.get("controllers.application.model.activeCycle.cervixFeelings").pushObject(cervixFeeling);
            that.get('controllers.application.model.activeCycle').save().then(function(){
              if(!that.get('inline')){
                that.transitionToRoute('cervix-feelings', that.get('controllers.application.model.activeCycle.id'));
              }
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