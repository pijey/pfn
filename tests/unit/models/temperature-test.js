import DS from 'ember-data';
import Ember from 'ember';

import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('temperature', 'Temperature Model', {
    needs: ['model:profile', 'model:cycle', 'model:period', 'model:mucusSample', 'model:cervixFeeling']
 });

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

/* Cycle day number */

/* OK */

test('Cycle day number : Temperature date equals cycle start date', function(assert) {
	var store = this.store();
  	var temperature = this.subject({date:'2015-05-15T07:00:00.000'});
  	
  	Ember.run(function() {
  		temperature.set('cycle', store.createRecord('cycle', {start_date:'2015-05-15T00:00:00.000'}));
  	});

  	assert.ok(!!temperature);
  	assert.equal(temperature.get('cycle_day_number'), 1, 'When temperature date is equal to the cycle start date, cycle day number is 1');
});

test('Cycle day number : Temperature date after cycle start date', function(assert) {
	var store = this.store();
  	var temperature = this.subject({date:'2015-05-17T07:00:00.000'});
  	
  	Ember.run(function() {
  		temperature.set('cycle', store.createRecord('cycle', {start_date:'2015-05-15T00:00:00.000'}));
  	});

  	assert.ok(!!temperature);
  	assert.equal(temperature.get('cycle_day_number'), 3, 'When temperature date is after the cycle start date, cycle day number can be computed');
});

/* Cycle without start date */

test('Cycle day number : Cycle without start date', function(assert) {
	var store = this.store();
  	var temperature = this.subject({date:'2015-05-15T07:00:00.000'});
  	
  	Ember.run(function() {
  		temperature.set('cycle', store.createRecord('cycle', {start_date:null}));
  	});

  	assert.ok(!!temperature);
  	assert.equal(temperature.get('cycle_day_number'), null, 'When cycle has no start date, cycle day number cannot be computed');
});

/* Cycle with start date after temperature date*/


test('Cycle day number : Cycle with start date after temperature date', function(assert) {
	var store = this.store();
  	var temperature = this.subject({date:'2015-05-14T07:00:00.000'});
  	
  	Ember.run(function() {
  		temperature.set('cycle', store.createRecord('cycle', {start_date:'2015-05-15T00:00:00.000'}));
  	});

  	assert.ok(!!temperature);
  	assert.equal(temperature.get('cycle_day_number'), null, 'When cycle\'s start date is after the temperature date, cycle day number cannot be computed');
});

/* Cycle without temperature date*/

test('Cycle day number : No temperature date', function(assert) {
	var store = this.store();
  	var temperature = this.subject({date:null});
  	
  	Ember.run(function() {
  		temperature.set('cycle', store.createRecord('cycle', {start_date:'2015-05-15T00:00:00.000'}));
  	});

  	assert.ok(!!temperature);
  	assert.equal(temperature.get('cycle_day_number'), null, 'When temperature date is null, cycle day number cannot be computed');
});

/* Temperature corrected */

/* OK */

test('Temperature corrected : Temperature taken at profile taking hour ', function(assert) {
	var store = this.store();
  	var temperature = this.subject({date:'2015-05-15T07:00:00.000', temperature:37});
  	
  	Ember.run(function() {
  		var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 07 2015 07:00:00'});
  		var cycle = store.createRecord('cycle', {profile: profile, start_date:'2015-05-15T00:00:00.000'});
  		temperature.set('cycle', cycle);
  	});

  	assert.ok(!!temperature);
  	assert.equal(temperature.get('temperature_corrected'), 37, 'When the temperature is taken according to the temperature taking hour of the profile, the teperature corrected is equal to the temperature');
});

/* Temperature before taking hour */

test('Temperature corrected : Temperature taken 30 minutes before taking hour ', function(assert) {
	var store = this.store();
  	var temperature = this.subject({date:'2015-05-15T06:30:00.000', temperature:37});
  	
  	Ember.run(function() {
  		var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 07 2015 07:00:00'});
  		var cycle = store.createRecord('cycle', {profile: profile, start_date:'2015-05-15T00:00:00.000'});
  		temperature.set('cycle', cycle);
  	});

  	assert.ok(!!temperature);
  	assert.equal(temperature.get('temperature_corrected'), 37.05, 'When the temperature is taken 30 minutes before profile\s taking hour, the temperature corrected is superior of 0.05 degree to the temperature');
});


test('Temperature corrected : Temperature taken 60 minutes before taking hour ', function(assert) {
	var store = this.store();
  	var temperature = this.subject({date:'2015-05-15T06:00:00.000', temperature:37});
  	
  	Ember.run(function() {
  		var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 07 2015 07:00:00'});
  		var cycle = store.createRecord('cycle', {profile: profile, start_date:'2015-05-15T00:00:00.000'});
  		temperature.set('cycle', cycle);
  	});

  	assert.ok(!!temperature);
  	assert.equal(temperature.get('temperature_corrected'), 37.1, 'When the temperature is taken 60 minutes before profile\s taking hour, the temperature corrected is superior of 0.1 degree to the temperature');
});

test('Temperature corrected : Temperature taken before 4 AM is not relevant', function(assert) {
	var store = this.store();
  	var temperature = this.subject({date:'2015-05-15T03:30:00.000', temperature:37});
  	
  	Ember.run(function() {
  		var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 07 2015 07:00:00'});
  		var cycle = store.createRecord('cycle', {profile: profile, start_date:'2015-05-15T00:00:00.000'});
  		temperature.set('cycle', cycle);
  	});

  	assert.ok(!!temperature);
  	assert.equal(temperature.get('temperature_corrected'), null, 'When the temperature is taken before 4 AM, the temperature corrected is not relevant');
});

/* Temperature after taking hour */


test('Temperature corrected : Temperature taken 30 minutes after taking hour ', function(assert) {
	var store = this.store();
  	var temperature = this.subject({date:'2015-05-15T07:30:00.000', temperature:37});
  	
  	Ember.run(function() {
  		var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 07 2015 07:00:00'});
  		var cycle = store.createRecord('cycle', {profile: profile, start_date:'2015-05-15T00:00:00.000'});
  		temperature.set('cycle', cycle);
  	});

  	assert.ok(!!temperature);
  	assert.equal(temperature.get('temperature_corrected'), 36.95, 'When the temperature is taken 30 minutes after profile\s taking hour, the temperature corrected is inferior of 0.05 degree to the temperature');
});


test('Temperature corrected : Temperature taken 60 minutes after taking hour ', function(assert) {
	var store = this.store();
  	var temperature = this.subject({date:'2015-05-15T08:00:00.000', temperature:37});
  	
  	Ember.run(function() {
  		var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 07 2015 07:00:00'});
  		var cycle = store.createRecord('cycle', {profile: profile, start_date:'2015-05-15T00:00:00.000'});
  		temperature.set('cycle', cycle);
  	});

  	assert.ok(!!temperature);
  	assert.equal(temperature.get('temperature_corrected'), 36.9, 'When the temperature is taken 60 minutes after profile\s taking hour, the temperature corrected is inferior of 0.1 degree to the temperature');
});

test('Temperature corrected : Temperature taken after 11 AM ', function(assert) {
	var store = this.store();
  	var temperature = this.subject({date:'2015-05-15T11:00:00.000', temperature:37});
  	
  	Ember.run(function() {
  		var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 07 2015 07:00:00'});
  		var cycle = store.createRecord('cycle', {profile: profile, start_date:'2015-05-15T00:00:00.000'});
  		temperature.set('cycle', cycle);
  	});

  	assert.ok(!!temperature);
  	assert.equal(temperature.get('temperature_corrected'), null, 'When the temperature is taken after 11 AM, the temperature corrected is not relevant');
});

/* Profile without temperature_taking_hour */

test('Temperature corrected : No temperature taking hour ', function(assert) {
	var store = this.store();
  	var temperature = this.subject({date:'2015-05-15T07:00:00.000', temperature:37});
  	
  	Ember.run(function() {
  		var profile = store.createRecord('profile', {temperature_taking_hour:null});
  		var cycle = store.createRecord('cycle', {profile: profile, start_date:'2015-05-15T00:00:00.000'});
  		temperature.set('cycle', cycle);
  	});

  	assert.ok(!!temperature);
  	assert.equal(temperature.get('temperature_corrected'), null, 'When the profile\'s temperature taking hour is null, the temperature corrected cannot be computed');
});