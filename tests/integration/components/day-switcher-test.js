import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('day-switcher', 'Integration | Component | day switcher', {
  integration: true
});

test('Day 1, Cycle 5 days long', function(assert) {
  this.set("dayNumber", 1);
  var profile = Ember.Object.create({"start_date": '2015-05-01T00:00:00.000', "cycle_length":5});
  this.set("model", profile);

  this.render(hbs`{{day-switcher model=model dayNumber=dayNumber}}`);

  assert.equal(this.$().text().trim(), 'Jour 1');
  assert.ok(this.$(".previous-day").length === 0, "Day 1, No previous day link");
  assert.ok(this.$(".first-day").length === 0, "Day 1, No first day link");
  assert.ok(this.$(".next-day").length === 1, "Day 1 (and not last), should have a next day link");
  assert.ok(this.$(".last-day").length === 1, "Day 1 (and not last), should have a last day link");
});

test('Day 2, Cycle 5 days long', function(assert) {
  this.set("dayNumber", 2);
  var profile = Ember.Object.create({"start_date": '2015-05-01T00:00:00.000', "cycle_length":5});
  this.set("model", profile);

  this.render(hbs`{{day-switcher model=model dayNumber=dayNumber}}`);

  assert.equal(this.$().text().trim(), 'Jour 2');
  assert.ok(this.$(".previous-day").length === 1, "Day 2, should have a previous day link");
  assert.ok(this.$(".first-day").length === 1, "Day 2, should have a first day link");
  assert.ok(this.$(".next-day").length === 1, "Day 2 (and not last), should have a next day link");
  assert.ok(this.$(".last-day").length === 1, "Day 2 (and not last), should have a last day link");
});

test('Day 5, Cycle 5 days long', function(assert) {
  this.set("dayNumber", 5);
  var profile = Ember.Object.create({"start_date": '2015-05-01T00:00:00.000', "cycle_length":5});
  this.set("model", profile);

  this.render(hbs`{{day-switcher model=model dayNumber=dayNumber}}`);

  assert.equal(this.$().text().trim(), 'Jour 5');
  assert.ok(this.$(".previous-day").length === 1, "Day 5, should have a previous day link");
  assert.ok(this.$(".first-day").length === 1, "Day 5, should have a first day link");
  assert.ok(this.$(".next-day").length === 0, "Day 5 (and last), should not have a next day link");
  assert.ok(this.$(".last-day").length === 0, "Day 5 (and last), should not have a last day link");
});

