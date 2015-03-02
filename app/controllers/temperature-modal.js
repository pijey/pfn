import Ember from "ember";

export default Ember.ObjectController.extend({
  title:null,
  actions: {
    save: function() {
      var model = this.model;
      model.save().then(function(){
        model.get('cycle.temperatures').pushObject(model);
        model.get('cycle').save();
      });
    }
  }
});