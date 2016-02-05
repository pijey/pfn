import SampleController from "./sample-controller";
import EmberValidations, {validator} from 'ember-validations';

export default SampleController.extend(EmberValidations, {
  backRoute: "mucus-samples",
  sensations:[{label: 'Sec', value: 'DRY'},{label: 'Humide', value: 'HUMID'},{label: 'Mouillé', value: 'WET'}],
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
  setValidation: function() {
    // this.set('validations.model.sensation.presence.message', this.t("errors.blank"));
  }.on('init'),
  actions: {
    selectSensation(sensation){
      this.set('model.sensation', sensation);
    },
    toggleAtCervix(){
      this.set('model.at_cervix', !this.get("model.at_cervix"));
    }
  }
});