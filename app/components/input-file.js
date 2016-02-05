import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['multiple', 'type'],
  tagName: 'input',
  type: 'file',
  multiple: false,
  fileName:null,
  change: function(event) {
    var files = event.target.files;
    this.set("fileName", files[0]);
    this.get("importFile")();
  }
});