import Ember from "ember";

export function initialize(/* application */) {
  Ember.LinkComponent.reopen({
    attributeBindings: ["role"],
  });
}

export default {
  name: 'custom-link-component',
  initialize
};
