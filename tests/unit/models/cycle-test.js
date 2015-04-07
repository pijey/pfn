import Ember from 'ember';

import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('cycle', {
  // Specify the other units that are required for this test.
  needs: ['model:profile', 'model:temperature', 'model:period', 'model:mucusSample', 'model:cervixFeeling']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

/* Cache temperature & Third day of hot temperature & ovulation */

/* Normal cycle */

test('Normal cycle ', function(assert) {
	var store = this.store();
  	var cycle = this.subject({start_date:'2015-05-01T00:00:00.000'});

  	Ember.run(function() {
  		var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
  		cycle.set('profile', profile);
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-01T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-02T07:00:00.000', temperature:36.65}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-03T07:00:00.000', temperature:36.65}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-04T07:00:00.000', temperature:36.60}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-05T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-06T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-07T07:00:00.000', temperature:36.60}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-08T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-09T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-10T07:00:00.000', temperature:36.45}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-11T07:00:00.000', temperature:36.50}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-12T07:00:00.000', temperature:36.50}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-13T07:00:00.000', temperature:36.60}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-14T07:00:00.000', temperature:36.45}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-15T07:00:00.000', temperature:36.40}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-16T07:00:00.000', temperature:36.60}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-17T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-18T07:00:00.000', temperature:36.80}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-19T07:00:00.000', temperature:36.80}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-20T07:00:00.000', temperature:36.80}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-21T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-22T07:00:00.000', temperature:36.85}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-23T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-24T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-25T07:00:00.000', temperature:36.80}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-26T07:00:00.000', temperature:36.85}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-27T07:00:00.000', temperature:36.85}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-28T07:00:00.000', temperature:36.85}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-29T07:00:00.000', temperature:36.85}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-30T07:00:00.000', temperature:36.90}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-31T07:00:00.000', temperature:36.80}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-06-01T07:00:00.000', temperature:36.70}));
  	});

  	assert.ok(!!cycle);
  	assert.equal(cycle.get('cacheTemperature'), 36.6, 'With the reference cycle, the cache temperature should be 36.6');
  	assert.equal(cycle.get('third_day_hot_temperature'), 19, 'With the reference cycle, the third day of hot temperature is the 19th');
  	assert.equal(cycle.get('ovulation'), true, 'With the reference cycle, there has been an ovulation');
});

/* Cycle with hot temperatures but not high enough above the cache temperature, need to wait for another day above the cache temperature */

test('Cache temperature : Normal cycle ', function(assert) {
	var store = this.store();
  	var cycle = this.subject({start_date:'2015-05-01T00:00:00.000'});

  	Ember.run(function() {
  		var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
  		cycle.set('profile', profile);
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-01T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-02T07:00:00.000', temperature:36.65}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-03T07:00:00.000', temperature:36.65}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-04T07:00:00.000', temperature:36.60}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-05T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-06T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-07T07:00:00.000', temperature:36.60}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-08T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-09T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-10T07:00:00.000', temperature:36.45}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-11T07:00:00.000', temperature:36.50}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-12T07:00:00.000', temperature:36.50}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-13T07:00:00.000', temperature:36.60}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-14T07:00:00.000', temperature:36.45}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-15T07:00:00.000', temperature:36.40}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-16T07:00:00.000', temperature:36.60}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-17T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-18T07:00:00.000', temperature:36.80}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-19T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-20T07:00:00.000', temperature:36.80}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-21T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-22T07:00:00.000', temperature:36.85}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-23T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-24T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-25T07:00:00.000', temperature:36.80}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-26T07:00:00.000', temperature:36.85}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-27T07:00:00.000', temperature:36.85}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-28T07:00:00.000', temperature:36.85}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-29T07:00:00.000', temperature:36.85}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-30T07:00:00.000', temperature:36.90}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-31T07:00:00.000', temperature:36.80}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-06-01T07:00:00.000', temperature:36.70}));
  	});

  	assert.ok(!!cycle);
  	assert.equal(cycle.get('cacheTemperature'), 36.6, 'With this cycle, the cache temperature should be 36.6');
  	assert.equal(cycle.get('third_day_hot_temperature'), 20, 'With a cycle with hot temperatures but not high enough above the cache temperature, the third day of hot temperature is the 20th (needs an extra day above the cache temperature to be sure)');
  	assert.equal(cycle.get('ovulation'), true, 'With this cycle, there has been an ovulation');
});

/* Cycle with high temperature but not high enough during enough time */

test('Cache temperature : Cycle with high temperature but not high enough during enough time ', function(assert) {
	var store = this.store();
  	var cycle = this.subject({start_date:'2015-05-01T00:00:00.000'});

  	Ember.run(function() {
  		var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
  		cycle.set('profile', profile);
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-01T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-02T07:00:00.000', temperature:36.65}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-03T07:00:00.000', temperature:36.65}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-04T07:00:00.000', temperature:36.60}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-05T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-06T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-07T07:00:00.000', temperature:36.60}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-08T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-09T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-10T07:00:00.000', temperature:36.45}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-11T07:00:00.000', temperature:36.50}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-12T07:00:00.000', temperature:36.50}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-13T07:00:00.000', temperature:36.60}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-14T07:00:00.000', temperature:36.45}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-15T07:00:00.000', temperature:36.40}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-16T07:00:00.000', temperature:36.60}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-17T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-18T07:00:00.000', temperature:36.80}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-19T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-20T07:00:00.000', temperature:36.50}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-21T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-22T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-23T07:00:00.000', temperature:36.50}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-24T07:00:00.000', temperature:36.50}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-25T07:00:00.000', temperature:36.50}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-26T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-27T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-28T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-29T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-30T07:00:00.000', temperature:36.50}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-31T07:00:00.000', temperature:36.50}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-06-01T07:00:00.000', temperature:36.50}));
  	});

  	assert.ok(!!cycle);
  	assert.equal(cycle.get('cacheTemperature'), 36.6, 'With this cycle, the cache temperature should be 36.6');
  	assert.equal(cycle.get('third_day_hot_temperature'), null, 'With a cycle which has high temperatures but not high enough, there are no hot days');
  	assert.equal(cycle.get('ovulation'), false, 'With this cycle, there has not been an ovulation');
});

/* Cycle with high temperature but with a slight decrease  */

test('Cache temperature : Cycle with high temperature but with a sligh decrease ', function(assert) {
	var store = this.store();
  	var cycle = this.subject({start_date:'2015-05-01T00:00:00.000'});

  	Ember.run(function() {
  		var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
  		cycle.set('profile', profile);
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-01T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-02T07:00:00.000', temperature:36.65}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-03T07:00:00.000', temperature:36.65}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-04T07:00:00.000', temperature:36.60}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-05T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-06T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-07T07:00:00.000', temperature:36.60}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-08T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-09T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-10T07:00:00.000', temperature:36.45}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-11T07:00:00.000', temperature:36.50}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-12T07:00:00.000', temperature:36.50}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-13T07:00:00.000', temperature:36.60}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-14T07:00:00.000', temperature:36.45}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-15T07:00:00.000', temperature:36.40}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-16T07:00:00.000', temperature:36.60}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-17T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-18T07:00:00.000', temperature:36.80}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-19T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-20T07:00:00.000', temperature:36.60}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-21T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-22T07:00:00.000', temperature:36.85}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-23T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-24T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-25T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-26T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-27T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-28T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-29T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-30T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-31T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-06-01T07:00:00.000', temperature:36.70}));
  	});

	assert.ok(!!cycle);
  	assert.equal(cycle.get('cacheTemperature'), 36.6, 'With this cycle, the cache temperature should be 36.6');
  	assert.equal(cycle.get('third_day_hot_temperature'), 21, 'With this cycle, the third day of hot temperature is the 21st because the 19th is not high enough, and the 20th is not higher than the cache temperature');
  	assert.equal(cycle.get('ovulation'), true, 'With this cycle, there has been an ovulation');
  	
});
/* Cycle with just two high temperatures */

test('Cache temperature : Cycle with just two high temperatures ', function(assert) {
	var store = this.store();
  	var cycle = this.subject({start_date:'2015-05-01T00:00:00.000'});

  	Ember.run(function() {
  		var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
  		cycle.set('profile', profile);
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-01T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-02T07:00:00.000', temperature:36.65}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-03T07:00:00.000', temperature:36.65}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-04T07:00:00.000', temperature:36.60}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-05T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-06T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-07T07:00:00.000', temperature:36.60}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-08T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-09T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-10T07:00:00.000', temperature:36.45}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-11T07:00:00.000', temperature:36.50}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-12T07:00:00.000', temperature:36.50}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-13T07:00:00.000', temperature:36.60}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-14T07:00:00.000', temperature:36.45}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-15T07:00:00.000', temperature:36.40}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-16T07:00:00.000', temperature:36.60}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-17T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-18T07:00:00.000', temperature:36.80}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-19T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-20T07:00:00.000', temperature:36.60}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-21T07:00:00.000', temperature:36.65}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-22T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-23T07:00:00.000', temperature:36.50}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-24T07:00:00.000', temperature:36.50}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-25T07:00:00.000', temperature:36.50}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-26T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-27T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-28T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-29T07:00:00.000', temperature:36.55}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-30T07:00:00.000', temperature:36.50}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-31T07:00:00.000', temperature:36.50}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-06-01T07:00:00.000', temperature:36.60}));
  	});

  	assert.ok(!!cycle);
  	assert.equal(cycle.get('cacheTemperature'), null, 'With this cycle that has only two hot temperature in a row, the cache temperature cannot be calculated');
  	assert.equal(cycle.get('third_day_hot_temperature'), null, 'With this cycle that has only two hot temperature in a row, the third day of hot temperature cannot be calculated');
  	assert.equal(cycle.get('ovulation'), false, 'With this cycle, there has not been an ovulation');
  	
});

/* No high temperatures cycle */

test('Cache temperature : No high temperatures cycle ', function(assert) {
	var store = this.store();
  	var cycle = this.subject({start_date:'2015-05-01T00:00:00.000'});

  	Ember.run(function() {
  		var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
  		cycle.set('profile', profile);
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-01T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-02T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-03T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-04T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-05T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-06T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-07T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-08T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-09T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-10T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-11T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-12T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-13T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-14T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-15T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-16T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-17T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-18T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-19T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-20T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-21T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-22T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-23T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-24T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-25T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-26T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-27T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-28T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-29T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-30T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-31T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-06-01T07:00:00.000', temperature:36.70}));
  	});

  	assert.ok(!!cycle);
  	assert.equal(cycle.get('cacheTemperature'), null, 'With no high temperatures, the cache temperature cannot be calculated');
  	assert.equal(cycle.get('third_day_hot_temperature'), null, 'With no high temperatures, there is not a third day of hot temperature');
  	assert.equal(cycle.get('ovulation'), false, 'With this cycle, there has not been an ovulation');
  	
});

/* High temperatures during the first four days */

test('Cache temperature : High temperatures during the first four days ', function(assert) {
	var store = this.store();
  	var cycle = this.subject({start_date:'2015-05-01T00:00:00.000'});

  	Ember.run(function() {
  		var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
  		cycle.set('profile', profile);
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-01T07:00:00.000', temperature:37.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-02T07:00:00.000', temperature:37.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-03T07:00:00.000', temperature:37.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-04T07:00:00.000', temperature:37.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-05T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-06T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-07T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-08T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-09T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-10T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-11T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-12T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-13T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-14T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-15T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-16T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-17T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-18T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-19T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-20T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-21T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-22T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-23T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-24T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-25T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-26T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-27T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-28T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-29T07:00:00.000', temperature:36.75}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-30T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-31T07:00:00.000', temperature:36.70}));
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-06-01T07:00:00.000', temperature:36.70}));
  	});

  	assert.ok(!!cycle);
  	assert.equal(cycle.get('cacheTemperature'), null, 'With high temperatures during the first four days, the cache temperature cannot be calculated');
  	assert.equal(cycle.get('third_day_hot_temperature'), null, 'With high temperatures during the first four days, there is not a third day of hot temperature');
  	assert.equal(cycle.get('ovulation'), false, 'With this cycle, there has not been an ovulation');
  	
});

/* Ovulation */ 
 
/* There hasn't been 3 days of hot temperature in a row */

/* There are no temperatures */

test('Ovulation : There are no temperatures ', function(assert) {
	var store = this.store();
  	var cycle = this.subject({start_date:'2015-05-15T00:00:00.000'});

  	assert.ok(!!cycle);
  	assert.equal(cycle.get('ovulation'), false, 'When there are no temperatures, we assume that there has not been an ovulation');
});

/* There is just one high temperature */

test('Ovulation : There is just one high temperature ', function(assert) {
	var store = this.store();
  	var cycle = this.subject({start_date:'2015-05-15T00:00:00.000'});

  	Ember.run(function() {
  		cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-20T07:00:00.000', temperature:38}));
  	});

  	assert.ok(!!cycle);
  	assert.equal(cycle.get('ovulation'), false, 'We need at least three days of hot temperature to see if there has been an ovulation');
});