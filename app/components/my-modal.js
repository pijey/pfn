import Ember from "ember";

var MyModal =  Ember.Component.extend({
  actions: {
    ok: function() {
      Ember.$('.modal').modal('hide');
      this.sendAction('ok');
    }
  },
  show: function() {
    Ember.$('.modal').modal().on('hidden.bs.modal', function() {
      this.sendAction('close');
    }.bind(this));
  }.on('didInsertElement')
});

export default MyModal;

