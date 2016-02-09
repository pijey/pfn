import Ember from "ember";

export default Ember.Controller.extend(Ember.Evented, {
    queryParams: ['isPopup', 'pageName'],
	isPopup: false,
	isLoading:false,
	pageName: false,
	goBack:false,
	currentController:null,
	startDateDesc:["start_date:desc"],
	lastCycles:Ember.computed.sort("model.cycles.[]", "startDateDesc"),
	actions:{
	    goBack:function(){
	      	this.get("currentController").send("goBack");
	    },
	    changeSelectedCycle:function(){
	    	this.set("currentController.model", this.get("model.selectedCycle"));
	    }
	}
});