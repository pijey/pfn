import Ember from "ember";

export default Ember.Controller.extend(Ember.Evented, {
    queryParams: ['isPopup', 'pageName'],
	isPopup: false,
	pageName: false,
	goBack:false,
	startDateDesc:["start_date:desc"],
	lastCycles:Ember.computed.sort("model.cycles.[]", "startDateDesc")
	// actions:{
	// 	back(){
	// 		this.set("goBack", true);
	// 	}
	// }
});