import Ember from "ember";
import EmberValidations, {validator} from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  needs: ['application'],
  queryParams: ["extended"],
  sensations: [{label: 'Dur', value: "HARD"},{label: 'Mou', value: "SOFT"}],
  openings: [{label: 'Fermé', value: "CLOSED"},{label: 'Légèrement ouvert', value: "SLIGHTLY_OPENNED"},{label: 'Ouvert', value: "OPENNED"}],
  positions: [{label: 'Bas', value: "LOW"},{label: 'Moyen', value: "MEDIUM"},{label: 'Haut', value: "HIGH"}],
  inclinings: [{label: 'Horizontal', value: "HORIZONTAL"},{label: 'Presque horizontal', value: "NEARLY_HORIZONTAL"},{label: 'Presque vertical', value: "NEARLY_VERTICAL"},{label: 'Vertical', value: "VERTICAL"}],
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
    "model.position": {
      presence: {message: "doit être renseignée"}
    },
    "model.opening": {
      presence: {message: "doit être renseignée"}
    },
    cycle:true
  },
  setValidation: function() {
    // this.set('validations.sensation.presence.message', this.t("errors.blank"));
    // this.set('validations.opening.presence.message', this.t("errors.blank"));
    // this.set('validations.position.presence.message', this.t("errors.blank"));
  }.on('init'),
  actions: {
    save: function() {
        this.get("model").save();
    },
    cancel: function(cervixFeeling){
      var cycleId = this.get("model.cycle.id");
      if(cervixFeeling.get('isNew')){
        cervixFeeling.destroyRecord();
      }
      else {
        cervixFeeling.rollbackAttributes();
      } 
      this.transitionToRoute('cervix-feelings', cycleId, {queryParams:{isPopup:false}});
    },
    selectSensation(sensation){
      this.set('model.sensation', sensation);
    },
    selectOpening(opening){
      this.set('model.opening', opening);
    },
    selectInclining(inclining){
      this.set('model.inclining', inclining);
    },
    selectPosition(position){
      this.set('model.position', position);
    },
  }
});