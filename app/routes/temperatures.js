import Ember from "ember";

export default Ember.Route.extend({  
	cycle: null,
	model: function(params) {
		this.cycle = this.store.find('cycle', params.cycle_id);
		return this.cycle;
	},
	actions:{
  		showModal: function(name, title, temperature) {
			this.controllerFor(name).set('title', title);
			if(temperature === 'new'){
				var newTemperature = this.store.createRecord('temperature', {
				  cycle: this.cycle,
				  date: moment()
				});
				this.controllerFor(name).set('model', newTemperature);
			}
			else {
				this.mode = 'edit';
				this.controllerFor(name).set('model', temperature);
			}

			this.render(name, {
				into: 'application',
				outlet: 'modal'
			});
		},
		removeModal: function() {
			this.disconnectOutlet({
				outlet: 'modal',
				parentView: 'application'
			});
		}
  	}
});