import Ember from 'ember';

export default Ember.Route.extend({
	dayNumber:null,
	model: function(params) {

		this.get('store').find('temperature', {cycle: params.cycle_id});
		this.get('store').find('mucus-sample', {cycle: params.cycle_id});
		this.get('store').find('cervix-feeling', {cycle: params.cycle_id});
		this.get('store').find('period', {cycle: params.cycle_id});

		this.set("dayNumber", parseInt(params.day_number));
		
		return this.store.find('cycle', params.cycle_id);
	},
	setupController: function(controller, model){
		controller.set("dayNumber", this.get("dayNumber"));
		var now = moment();
		var takingDate = moment(model.get("start_date")).add(this.get("dayNumber")-1,'days').hour(now.hour()).minute(now.minute()).second(0).millisecond(0);
		this.store.createRecord('temperature', {
          date:takingDate,
          cycle:model
        });
        this.store.createRecord('mucus-sample', {
          date:takingDate,
          cycle:model
        });
        this.store.createRecord('cervix-feeling', {
          date:takingDate,
          cycle:model
        });
        this.store.createRecord('period', {
          date:takingDate,
          cycle:model
        });
        controller.get("newTemperatures").push(this.get("dayNumber"));
        controller.get("newMucus").push(this.get("dayNumber"));
        controller.get("newCervix").push(this.get("dayNumber"));
        controller.get("newPeriods").push(this.get("dayNumber"));

		controller.set("model", model);
	},
});
