import Ember from 'ember';
      
export default Ember.Route.extend({
	dayNumber:null,
	model: function(params) {

		this.get('store').query('temperature', {cycle: params.cycle_id});
		this.get('store').query('mucus-sample', {cycle: params.cycle_id});
		this.get('store').query('cervix-feeling', {cycle: params.cycle_id});
		this.get('store').query('period', {cycle: params.cycle_id});

		this.set("dayNumber", parseInt(params.day_number));
		
		return this.store.find('cycle', params.cycle_id);
	},
	setupController: function(controller, model){
    this._super(controller, model);
		controller.set("dayNumber", this.get("dayNumber"));
		controller.set("model", model);
	},
  actions: {
    willTransition: function() {
      this.get("controller.model.temperatures").filterBy('isNew', true).forEach(function(temp){
        temp.destroyRecord();
      });
      this.get("controller.model.mucusSamples").filterBy('isNew', true).forEach(function(mucus){
        mucus.destroyRecord();
      });
      this.get("controller.model.cervixFeelings").filterBy('isNew', true).forEach(function(cervix){
        cervix.destroyRecord();
      });
      this.get("controller.model.periods").filterBy('isNew', true).forEach(function(period){
        period.destroyRecord();
      });
    }
  }
});
