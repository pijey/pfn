import Ember from "ember";

export default Ember.Component.extend({
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

