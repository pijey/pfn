import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('cycle', 'Unit | Model | cycle', {
  // Specify the other units that are required for this test.
  needs: ["model:profile", "model:period", "model:temperature", "model:mucus-sample", "model:cervix-feeling"]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

// var cycleWithOvulation = Ember.ObjectProxy.create({
//   ovulation: true
// });
// var cycleWithoutOvulation = Ember.ObjectProxy.create({
//   ovulation: false
// });


//*******************
//calendarCalculation
//*******************
test('Calendar calculation first cycle ', function(assert) {
  let cycle = this.subject({start_date:'2015-05-01T00:00:00.000'});
  assert.equal(cycle.get("calendarCalculation"), null, "First cycle, calendar calculation should not be used");
});

test('Calendar calculation with 5 ended cycles (last with ovulation), 1 ongoing', function(assert) {
  var store = this.store();
  var that = this;
  var profile = null;
  var cycle = null;
  Ember.run(function(){
    profile = store.createRecord("profile", {
      surname:"Test",
      temperature_taking_hour:moment().hour(7).minute(0).second(0),
      temperature_taking_mode:"RECTAL"
    });
    //31 days
    store.createRecord("cycle", {
      start_date:'2015-06-02T00:00:00.000',
      end_date:'2015-07-02T00:00:00.000',
      profile:profile
    });
    //30 days
    store.createRecord("cycle", {
      start_date:'2015-07-03T00:00:00.000',
      end_date:'2015-08-01T00:00:00.000',
      profile:profile
    });
    //32 days
    store.createRecord("cycle", {
      start_date:'2015-08-02T00:00:00.000',
      end_date:'2015-09-02T00:00:00.000',
      profile:profile
    });
    //31 days
    store.createRecord("cycle", {
      start_date:'2015-09-03T00:00:00.000',
      end_date:'2015-10-03T00:00:00.000',
      profile:profile
    });
    //32 days
    let previousCycle = store.createRecord("cycle", {
      start_date:'2015-10-04T00:00:00.000',
      end_date:'2015-11-04T00:00:00.000',
      ovulation:true,
      profile:profile
    });
    cycle = that.subject({
      start_date:'2015-11-05T00:00:00.000',
      previousCycle:previousCycle,
      profile:profile
    });
  });
  assert.equal(cycle.get("calendarCalculation"), 1, "6 ended cycles known, last with ovulation, calendar calculation should be shortest cycle - 21 = 30 - 21 = 9");
});

test('Calendar calculation with 6 ended cycles (last with ovulation), 1 ongoing', function(assert) {
  var store = this.store();
  var that = this;
  var profile = null;
  var cycle = null;
  Ember.run(function(){
    profile = store.createRecord("profile", {
      surname:"Test",
      temperature_taking_hour:moment().hour(7).minute(0).second(0),
      temperature_taking_mode:"RECTAL"
    });
    //32 days
    store.createRecord("cycle", {
      start_date:'2015-05-01T00:00:00.000',
      end_date:'2015-06-01T00:00:00.000',
      profile:profile
    });
    //31 days
    store.createRecord("cycle", {
      start_date:'2015-06-02T00:00:00.000',
      end_date:'2015-07-02T00:00:00.000',
      profile:profile
    });
    //30 days
    store.createRecord("cycle", {
      start_date:'2015-07-03T00:00:00.000',
      end_date:'2015-08-01T00:00:00.000',
      profile:profile
    });
    //32 days
    store.createRecord("cycle", {
      start_date:'2015-08-02T00:00:00.000',
      end_date:'2015-09-02T00:00:00.000',
      profile:profile
    });
    //31 days
    store.createRecord("cycle", {
      start_date:'2015-09-03T00:00:00.000',
      end_date:'2015-10-03T00:00:00.000',
      profile:profile
    });
    //32 days
    let previousCycle = store.createRecord("cycle", {
      start_date:'2015-10-04T00:00:00.000',
      end_date:'2015-11-04T00:00:00.000',
      ovulation:true,
      profile:profile
    });
    cycle = that.subject({
      start_date:'2015-11-05T00:00:00.000',
      previousCycle:previousCycle,
      profile:profile
    });
  });
  assert.equal(cycle.get("calendarCalculation"), 9, "6 ended cycles known, last with ovulation, calendar calculation should be shortest cycle - 21 = 30 - 21 = 9");
});

test('Calendar calculation with 6 ended cycles (last without ovulation), 1 ongoing', function(assert) {
  var store = this.store();
  var that = this;
  var profile = null;
  var cycle = null;
  Ember.run(function(){
    profile = store.createRecord("profile", {
      surname:"Test",
      temperature_taking_hour:moment().hour(7).minute(0).second(0),
      temperature_taking_mode:"RECTAL"
    });
    //32 days
    store.createRecord("cycle", {
      start_date:'2015-05-01T00:00:00.000',
      end_date:'2015-06-01T00:00:00.000',
      profile:profile
    });
    //31 days
    store.createRecord("cycle", {
      start_date:'2015-06-02T00:00:00.000',
      end_date:'2015-07-02T00:00:00.000',
      profile:profile
    });
    //30 days
    store.createRecord("cycle", {
      start_date:'2015-07-03T00:00:00.000',
      end_date:'2015-08-01T00:00:00.000',
      profile:profile
    });
    //32 days
    store.createRecord("cycle", {
      start_date:'2015-08-02T00:00:00.000',
      end_date:'2015-09-02T00:00:00.000',
      profile:profile
    });
    //31 days
    store.createRecord("cycle", {
      start_date:'2015-09-03T00:00:00.000',
      end_date:'2015-10-03T00:00:00.000',
      profile:profile
    });
    //32 days
    let previousCycle = store.createRecord("cycle", {
      start_date:'2015-10-04T00:00:00.000',
      end_date:'2015-11-04T00:00:00.000',
      ovulation:false,
      profile:profile
    });
    cycle = that.subject({
      start_date:'2015-11-05T00:00:00.000',
      previousCycle:previousCycle,
      profile:profile
    });
  });
  assert.equal(cycle.get("calendarCalculation"), 1, "6 ended cycles known, last without ovulation, calendar calculation should be 1");
});


test('Calendar calculation with 12 ended cycles (last with ovulation), 1 ongoing', function(assert) {
  var store = this.store();
  var that = this;
  var profile = null;
  var cycle = null;
  Ember.run(function(){
    profile = store.createRecord("profile", {
      surname:"Test",
      temperature_taking_hour:moment().hour(7).minute(0).second(0),
      temperature_taking_mode:"RECTAL"
    });
    //32 days
    store.createRecord("cycle", {
      start_date:'2014-10-22T00:00:00.000',
      end_date:'2014-11-22T00:00:00.000',
      profile:profile
    });
    //31 days
    store.createRecord("cycle", {
      start_date:'2014-11-23T00:00:00.000',
      end_date:'2014-12-23T00:00:00.000',
      profile:profile
    });
    //32 days
    store.createRecord("cycle", {
      start_date:'2014-12-24T00:00:00.000',
      end_date:'2015-01-24T00:00:00.000',
      profile:profile
    });
    //32 days
    store.createRecord("cycle", {
      start_date:'2015-01-25T00:00:00.000',
      end_date:'2015-02-25T00:00:00.000',
      profile:profile
    });
    //32 days
    store.createRecord("cycle", {
      start_date:'2015-02-26T00:00:00.000',
      end_date:'2015-03-29T00:00:00.000',
      profile:profile
    });
    //32 days
    store.createRecord("cycle", {
      start_date:'2015-03-30T00:00:00.000',
      end_date:'2015-04-30T00:00:00.000',
      profile:profile
    });
    //32 days
    store.createRecord("cycle", {
      start_date:'2015-05-01T00:00:00.000',
      end_date:'2015-06-01T00:00:00.000',
      profile:profile
    });
    //31 days
    store.createRecord("cycle", {
      start_date:'2015-06-02T00:00:00.000',
      end_date:'2015-07-02T00:00:00.000',
      profile:profile
    });
    //30 days
    store.createRecord("cycle", {
      start_date:'2015-07-03T00:00:00.000',
      end_date:'2015-08-01T00:00:00.000',
      profile:profile
    });
    //32 days
    store.createRecord("cycle", {
      start_date:'2015-08-02T00:00:00.000',
      end_date:'2015-09-02T00:00:00.000',
      profile:profile
    });
    //31 days
    store.createRecord("cycle", {
      start_date:'2015-09-03T00:00:00.000',
      end_date:'2015-10-03T00:00:00.000',
      profile:profile
    });
    //32 days
    let previousCycle = store.createRecord("cycle", {
      start_date:'2015-10-04T00:00:00.000',
      end_date:'2015-11-04T00:00:00.000',
      ovulation:true,
      profile:profile
    });
    cycle = that.subject({
      start_date:'2015-11-05T00:00:00.000',
      previousCycle:previousCycle,
      profile:profile
    });
  });
  assert.equal(cycle.get("calendarCalculation"), 10, "6 ended cycles known, last with ovulation, calendar calculation should be shortest cycle - 20 = 30 - 20 = 10");
});

test('Calendar calculation with 6 ended cycles (last without ovulation), 1 ongoing', function(assert) {
  var store = this.store();
  var that = this;
  var profile = null;
  var cycle = null;
  Ember.run(function(){
    profile = store.createRecord("profile", {
      surname:"Test",
      temperature_taking_hour:moment().hour(7).minute(0).second(0),
      temperature_taking_mode:"RECTAL"
    });
    //32 days
    store.createRecord("cycle", {
      start_date:'2014-10-22T00:00:00.000',
      end_date:'2014-11-22T00:00:00.000',
      profile:profile
    });
    //31 days
    store.createRecord("cycle", {
      start_date:'2014-11-23T00:00:00.000',
      end_date:'2014-12-23T00:00:00.000',
      profile:profile
    });
    //32 days
    store.createRecord("cycle", {
      start_date:'2014-12-24T00:00:00.000',
      end_date:'2015-01-24T00:00:00.000',
      profile:profile
    });
    //32 days
    store.createRecord("cycle", {
      start_date:'2015-01-25T00:00:00.000',
      end_date:'2015-02-25T00:00:00.000',
      profile:profile
    });
    //32 days
    store.createRecord("cycle", {
      start_date:'2015-02-26T00:00:00.000',
      end_date:'2015-03-29T00:00:00.000',
      profile:profile
    });
    //32 days
    store.createRecord("cycle", {
      start_date:'2015-03-30T00:00:00.000',
      end_date:'2015-04-30T00:00:00.000',
      profile:profile
    });
    //32 days
    store.createRecord("cycle", {
      start_date:'2015-05-01T00:00:00.000',
      end_date:'2015-06-01T00:00:00.000',
      profile:profile
    });
    //31 days
    store.createRecord("cycle", {
      start_date:'2015-06-02T00:00:00.000',
      end_date:'2015-07-02T00:00:00.000',
      profile:profile
    });
    //30 days
    store.createRecord("cycle", {
      start_date:'2015-07-03T00:00:00.000',
      end_date:'2015-08-01T00:00:00.000',
      profile:profile
    });
    //32 days
    store.createRecord("cycle", {
      start_date:'2015-08-02T00:00:00.000',
      end_date:'2015-09-02T00:00:00.000',
      profile:profile
    });
    //31 days
    store.createRecord("cycle", {
      start_date:'2015-09-03T00:00:00.000',
      end_date:'2015-10-03T00:00:00.000',
      profile:profile
    });
    //32 days
    let previousCycle = store.createRecord("cycle", {
      start_date:'2015-10-04T00:00:00.000',
      end_date:'2015-11-04T00:00:00.000',
      ovulation:false,
      profile:profile
    });
    cycle = that.subject({
      start_date:'2015-11-05T00:00:00.000',
      previousCycle:previousCycle,
      profile:profile
    });
  });
  assert.equal(cycle.get("calendarCalculation"), 1, "6 ended cycles known, last without ovulation, calendar calculation should be 1");
});

//TODO (but not implemented yed), when post ovulation period < 10 days, or irregular cycles, or long cycles, calendarCalculation should
//be replaced by first day of high temperature of 12 last cycles minus 8.

//=========
//Ovulation
//=========

test('Ovulation without high temperatures ', function(assert) {
  var store = this.store();
  var cycle = null;
  var that=this;
  Ember.run(function() {
    var profile = store.createRecord("profile", {
      surname:"Test",
      temperature_taking_hour:moment().hour(7).minute(0).second(0),
      temperature_taking_mode:"RECTAL"
    });
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-01T07:00:00.000', temperature:37});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-02T07:00:00.000', temperature:37});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-03T07:00:00.000', temperature:37});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-04T07:00:00.000', temperature:37});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-05T07:00:00.000', temperature:37});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-06T07:00:00.000', temperature:37});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-07T07:00:00.000', temperature:37});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-08T07:00:00.000', temperature:37});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-09T07:00:00.000', temperature:37});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-10T07:00:00.000', temperature:37});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-11T07:00:00.000', temperature:37});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-12T07:00:00.000', temperature:37});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-13T07:00:00.000', temperature:37});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-14T07:00:00.000', temperature:37});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-15T07:00:00.000', temperature:37});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-16T07:00:00.000', temperature:37});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-17T07:00:00.000', temperature:37});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-18T07:00:00.000', temperature:37});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-19T07:00:00.000', temperature:37});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-20T07:00:00.000', temperature:37});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-21T07:00:00.000', temperature:37});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-22T07:00:00.000', temperature:37});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-23T07:00:00.000', temperature:37});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-24T07:00:00.000', temperature:37});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-25T07:00:00.000', temperature:37});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-26T07:00:00.000', temperature:37});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-27T07:00:00.000', temperature:37});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-28T07:00:00.000', temperature:37});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-29T07:00:00.000', temperature:37});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-30T07:00:00.000', temperature:37});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-31T07:00:00.000', temperature:37});
    store.createRecord('temperature', {cycle:cycle, date:'2015-06-01T07:00:00.000', temperature:37});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('ovulation'), false, 'No high temperatures means no ovulation');
    
});

test('Ovulation with 9 high temperatures ', function(assert) {
  var store = this.store();
  var cycle = null;
  var that=this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile, cacheTemperature:36.5, third_day_hot_temperature:26});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-01T07:00:00.000', temperature:36.5});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-02T07:00:00.000', temperature:36.5});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-03T07:00:00.000', temperature:36.5});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-04T07:00:00.000', temperature:36.5});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-05T07:00:00.000', temperature:36.5});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-06T07:00:00.000', temperature:36.5});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-07T07:00:00.000', temperature:36.5});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-08T07:00:00.000', temperature:36.5});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-09T07:00:00.000', temperature:36.5});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-10T07:00:00.000', temperature:36.5});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-11T07:00:00.000', temperature:36.5});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-12T07:00:00.000', temperature:36.5});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-13T07:00:00.000', temperature:36.5});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-14T07:00:00.000', temperature:36.5});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-15T07:00:00.000', temperature:36.5});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-16T07:00:00.000', temperature:36.5});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-17T07:00:00.000', temperature:36.5});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-18T07:00:00.000', temperature:36.5});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-19T07:00:00.000', temperature:36.5});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-20T07:00:00.000', temperature:36.5});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-21T07:00:00.000', temperature:36.5});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-22T07:00:00.000', temperature:36.5});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-23T07:00:00.000', temperature:36.5});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-24T07:00:00.000', temperature:37.3});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-25T07:00:00.000', temperature:37.3});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-26T07:00:00.000', temperature:37.3});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-27T07:00:00.000', temperature:37.3});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-28T07:00:00.000', temperature:37.3});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-29T07:00:00.000', temperature:37.3});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-30T07:00:00.000', temperature:37.3});
    store.createRecord('temperature', {cycle:cycle, date:'2015-05-31T07:00:00.000', temperature:37.3});
    store.createRecord('temperature', {cycle:cycle, date:'2015-06-01T07:00:00.000', temperature:37.3});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('ovulation'), false, '9 high temperatures are not enough to mean ovulation');
    
});

test('Ovulation with 10 high temperatures ', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile, cacheTemperature:36.5, third_day_hot_temperature:25});
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-01T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-02T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-03T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-04T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-05T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-06T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-07T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-08T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-09T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-10T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-11T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-12T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-13T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-14T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-15T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-16T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-17T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-18T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-19T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-20T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-21T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-22T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-23T07:00:00.000', temperature:37.3}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-24T07:00:00.000', temperature:37.3}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-25T07:00:00.000', temperature:37.3}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-26T07:00:00.000', temperature:37.3}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-27T07:00:00.000', temperature:37.3}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-28T07:00:00.000', temperature:37.3}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-29T07:00:00.000', temperature:37.3}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-30T07:00:00.000', temperature:37.3}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-31T07:00:00.000', temperature:37.3}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-06-01T07:00:00.000', temperature:37.3}));
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('ovulation'), true, '10 high temperatures mean ovulation');
    
});

test('Ovulation with 11 high temperatures but not 10 in a row ', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile, cacheTemperature:36.5, third_day_hot_temperature:25});
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-01T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-02T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-03T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-04T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-05T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-06T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-07T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-08T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-09T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-10T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-11T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-12T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-13T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-14T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-15T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-16T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-17T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-18T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-19T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-20T07:00:00.000', temperature:36.5}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-21T07:00:00.000', temperature:37.3}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-22T07:00:00.000', temperature:37.3}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-23T07:00:00.000', temperature:37.3}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-24T07:00:00.000', temperature:37.3}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-25T07:00:00.000', temperature:36.4}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-26T07:00:00.000', temperature:37.3}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-27T07:00:00.000', temperature:37.3}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-28T07:00:00.000', temperature:37.3}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-29T07:00:00.000', temperature:37.3}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-30T07:00:00.000', temperature:37.3}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-05-31T07:00:00.000', temperature:37.3}));
    cycle.get('temperatures').pushObject(store.createRecord('temperature', {date:'2015-06-01T07:00:00.000', temperature:37.3}));
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('ovulation'), false, 'Not 10 high temperatures in a row means no ovulation');
    
});

test('Ovulation with 10 high temperatures but 1 ignored ', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile, cacheTemperature:36.5, third_day_hot_temperature:25});
    store.createRecord('temperature', {date:'2015-05-01T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-02T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-03T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-04T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-05T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-06T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-07T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-08T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-09T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-10T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-11T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-12T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-13T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-14T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-15T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-16T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-17T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-18T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-19T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-20T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-21T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-22T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-23T07:00:00.000', temperature:37.3, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-24T07:00:00.000', temperature:37.3, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-25T07:00:00.000', temperature:37.5, ignore:true, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-26T07:00:00.000', temperature:37.3, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-27T07:00:00.000', temperature:37.3, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-28T07:00:00.000', temperature:37.3, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-29T07:00:00.000', temperature:37.3, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-30T07:00:00.000', temperature:37.3, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-31T07:00:00.000', temperature:37.3, cycle:cycle});
    store.createRecord('temperature', {date:'2015-06-01T07:00:00.000', temperature:37.3, cycle:cycle});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('ovulation'), false, '10 high temperatures including one ignored means no ovulation');
    
});

//============
//Cycle length
//============
test('Cycle without start_date', function(assert) {
  let cycle = this.subject({start_date:null, end_date:null});

  assert.ok(!!cycle);
  assert.equal(cycle.get('cycle_length'), undefined, 'a cycle without start date has no length');
});

test('Cycle with start_date after end_date ', function(assert) {
  var start = "2015-05-01T07:00:00.000";
  var startPlusThirtyDays = "2015-05-31T07:00:00.000";
  let cycle = this.subject({start_date:startPlusThirtyDays, end_date:start});

  assert.ok(!!cycle);
  assert.equal(cycle.get('cycle_length'), undefined, 'a cycle with start_date after end_date has no length');
});

test('Cycle length with cycle started today ', function(assert) {
  var now = moment();
  let cycle = this.subject({start_date:now, end_date:null});

  assert.ok(!!cycle);
  assert.equal(cycle.get('cycle_length'), 1, 'a cycle started today has a length of 1');
});

test('Cycle 31 days long', function(assert) {
  var start = "2015-05-01T07:00:00.000";
  var startPlusThirtyDays = "2015-05-31T07:00:00.000";
  //Today + 30 days = 31 days
  let cycle = this.subject({start_date:start, end_date:startPlusThirtyDays});

  assert.ok(!!cycle);
  assert.equal(cycle.get('cycle_length'), 31, 'Cycle 31 days long has a length of 31');
});

//=========================
//First day of mucus or wet
//=========================

test('First day of mucus or wet : empty cycle', function(assert) {
  let cycle = this.subject();
  assert.ok(!!cycle);
  assert.equal(cycle.get('first_day_of_mucus_or_wet'), undefined, 'Empty cycle : first day of mucus or wet is undefined');
});

test('First day of mucus or wet : Mucus at cervix at day 5', function(assert) {
  let cycle = this.subject({start_date:'2015-05-01T07:00:00.000'});
  var store = this.store();
  Ember.run(function(){
    store.createRecord("mucus-sample", {date:'2015-05-01T07:00:00.000', sensation:'DRY', cycle:cycle, at_cervix:false});
    store.createRecord("mucus-sample", {date:'2015-05-02T07:00:00.000', sensation:'DRY', cycle:cycle, at_cervix:null});
    store.createRecord("mucus-sample", {date:'2015-05-03T07:00:00.000', sensation:'DRY', cycle:cycle, at_cervix:undefined});
    store.createRecord("mucus-sample", {date:'2015-05-04T07:00:00.000', sensation:'DRY', cycle:cycle});
    store.createRecord("mucus-sample", {date:'2015-05-05T07:00:00.000', sensation:'DRY', cycle:cycle, at_cervix:true});
  });
  assert.ok(!!cycle);
  assert.equal(cycle.get('first_day_of_mucus_or_wet'), 5, 'At cervix is true at day 5 : First day of mucus or wet should be 5');
});

test('First day of mucus or wet : Mucus at cervix at day 5, Wet sensation at day 6', function(assert) {
  let cycle = this.subject({start_date:'2015-05-01T07:00:00.000'});
  var store = this.store();
  Ember.run(function(){
    store.createRecord("mucus-sample", {date:'2015-05-01T07:00:00.000', sensation:'DRY', cycle:cycle, at_cervix:false});
    store.createRecord("mucus-sample", {date:'2015-05-02T07:00:00.000', sensation:'DRY', cycle:cycle, at_cervix:null});
    store.createRecord("mucus-sample", {date:'2015-05-03T07:00:00.000', sensation:'DRY', cycle:cycle, at_cervix:undefined});
    store.createRecord("mucus-sample", {date:'2015-05-04T07:00:00.000', sensation:'DRY', cycle:cycle});
    store.createRecord("mucus-sample", {date:'2015-05-05T07:00:00.000', sensation:'DRY', cycle:cycle, at_cervix:true});
    store.createRecord("mucus-sample", {date:'2015-05-06T07:00:00.000', sensation:'WET', cycle:cycle});
  });
  assert.ok(!!cycle);
  assert.equal(cycle.get('first_day_of_mucus_or_wet'), 5, 'At cervix is true at day 5 and sensation wet at day 6 : First day of mucus or wet should be 5');
});

test('First day of mucus or wet : Mucus at cervix at day 6, Wet sensation at day 5', function(assert) {
  let cycle = this.subject({start_date:'2015-05-01T07:00:00.000'});
  var store = this.store();
  Ember.run(function(){
    store.createRecord("mucus-sample", {date:'2015-05-01T07:00:00.000', sensation:'DRY', cycle:cycle, at_cervix:false});
    store.createRecord("mucus-sample", {date:'2015-05-02T07:00:00.000', sensation:'DRY', cycle:cycle, at_cervix:null});
    store.createRecord("mucus-sample", {date:'2015-05-03T07:00:00.000', sensation:'DRY', cycle:cycle, at_cervix:undefined});
    store.createRecord("mucus-sample", {date:'2015-05-04T07:00:00.000', sensation:'DRY', cycle:cycle});
    store.createRecord("mucus-sample", {date:'2015-05-05T07:00:00.000', sensation:'WET', cycle:cycle});
    store.createRecord("mucus-sample", {date:'2015-05-06T07:00:00.000', sensation:'DRY', cycle:cycle, at_cervix:true});
  });
  assert.ok(!!cycle);
  assert.equal(cycle.get('first_day_of_mucus_or_wet'), 5, 'At cervix is true at day 6 and sensation wet at day 5 : First day of mucus or wet should be 5');
});

test('First day of mucus or wet : Mucus at cervix at day 6, Humid sensation at day 5', function(assert) {
  let cycle = this.subject({start_date:'2015-05-01T07:00:00.000'});
  var store = this.store();
  Ember.run(function(){
    store.createRecord("mucus-sample", {date:'2015-05-01T07:00:00.000', sensation:'DRY', cycle:cycle, at_cervix:false});
    store.createRecord("mucus-sample", {date:'2015-05-02T07:00:00.000', sensation:'DRY', cycle:cycle, at_cervix:null});
    store.createRecord("mucus-sample", {date:'2015-05-03T07:00:00.000', sensation:'DRY', cycle:cycle, at_cervix:undefined});
    store.createRecord("mucus-sample", {date:'2015-05-04T07:00:00.000', sensation:'DRY', cycle:cycle});
    store.createRecord("mucus-sample", {date:'2015-05-05T07:00:00.000', sensation:'HUMID', cycle:cycle});
    store.createRecord("mucus-sample", {date:'2015-05-06T07:00:00.000', sensation:'DRY', cycle:cycle, at_cervix:true});
  });
  assert.ok(!!cycle);
  assert.equal(cycle.get('first_day_of_mucus_or_wet'), 5, 'At cervix is true at day 6 and sensation humid at day 5 : First day of mucus or wet should be 5');
});

//==========
//Mucus peak
//==========

test('Mucus peak : empty cycle', function(assert) {
  let cycle = this.subject();
  assert.ok(!!cycle);
  assert.equal(cycle.get('mucus_peak'), undefined, 'Empty cycle : Mucus peak is undefined');
});

test('Mucus peak : HUMID at day 4 then DRY at day 5', function(assert) {
  let cycle = this.subject({start_date:'2015-05-01T07:00:00.000'});
  var store = this.store();
  Ember.run(function(){
    store.createRecord("mucus-sample", {date:'2015-05-01T07:00:00.000', sensation:'DRY', cycle:cycle});
    store.createRecord("mucus-sample", {date:'2015-05-02T07:00:00.000', sensation:'HUMID', cycle:cycle});
    store.createRecord("mucus-sample", {date:'2015-05-03T07:00:00.000', sensation:'WET', cycle:cycle});
    store.createRecord("mucus-sample", {date:'2015-05-04T07:00:00.000', sensation:'HUMID', cycle:cycle});
    store.createRecord("mucus-sample", {date:'2015-05-05T07:00:00.000', sensation:'DRY', cycle:cycle});
  });
  assert.ok(!!cycle);
  assert.equal(cycle.get('mucus_peak'), 4, 'Last day of wet/humid sensation at day 4 : Mucus peak should be 4');
});

test('Mucus peak : WET at day 3, then DRY at day 4 but WET at day 6', function(assert) {
  let cycle = this.subject({start_date:'2015-05-01T07:00:00.000'});
  var store = this.store();
  Ember.run(function(){
    store.createRecord("mucus-sample", {date:'2015-05-01T07:00:00.000', sensation:'DRY', cycle:cycle});
    store.createRecord("mucus-sample", {date:'2015-05-02T07:00:00.000', sensation:'DRY', cycle:cycle});
    store.createRecord("mucus-sample", {date:'2015-05-03T07:00:00.000', sensation:'WET', cycle:cycle});
    store.createRecord("mucus-sample", {date:'2015-05-04T07:00:00.000', sensation:'DRY', cycle:cycle});
    store.createRecord("mucus-sample", {date:'2015-05-05T07:00:00.000', sensation:'WET', cycle:cycle});
    store.createRecord("mucus-sample", {date:'2015-05-06T07:00:00.000', sensation:'DRY', cycle:cycle});
  });
  assert.ok(!!cycle);
  assert.equal(cycle.get('mucus_peak'), 5, 'Last day of wet/humid sensation at day 5 : Mucus peak should be 5');
});

test('Mucus peak : WET at last day', function(assert) {
  let cycle = this.subject({start_date:'2015-05-01T07:00:00.000'});
  var store = this.store();
  Ember.run(function(){
    store.createRecord("mucus-sample", {date:'2015-05-01T07:00:00.000', sensation:'DRY', cycle:cycle});
    store.createRecord("mucus-sample", {date:'2015-05-02T07:00:00.000', sensation:'DRY', cycle:cycle});
    store.createRecord("mucus-sample", {date:'2015-05-03T07:00:00.000', sensation:'DRY', cycle:cycle});
    store.createRecord("mucus-sample", {date:'2015-05-04T07:00:00.000', sensation:'DRY', cycle:cycle});
    store.createRecord("mucus-sample", {date:'2015-05-05T07:00:00.000', sensation:'DRY', cycle:cycle});
    store.createRecord("mucus-sample", {date:'2015-05-06T07:00:00.000', sensation:'WET', cycle:cycle});
  });
  assert.ok(!!cycle);
  assert.equal(cycle.get('mucus_peak'), undefined, 'Last day : wet/humid sensation : Mucus peak should be undefined');
});

//======================
//Mucus peak plus 3 days
//======================

test('Mucus peak + 3 days : empty cycle', function(assert) {
  let cycle = this.subject();
  assert.ok(!!cycle);
  assert.equal(cycle.get('mucus_peak_plus_3_days'), undefined, 'Empty cycle : Mucus peak plus three days is undefined');
});

test('Mucus peak + 3 days : mucus peak at 4', function(assert) {
  let cycle = this.subject({mucus_peak:4});
  assert.ok(!!cycle);
  assert.equal(cycle.get('mucus_peak_plus_3_days'), 7, 'Mucus peak at day 4 : Mucus peak plus three days should be 7');
});

//==========================
//Cervix peak
//==========================

test('Cervix peak : empty cycle', function(assert) {
  let cycle = this.subject();
  assert.ok(!!cycle);
  assert.equal(cycle.get('cervix_peak'), undefined, 'Empty cycle : Cervix peak is undefined');
});

test('Cervix peak : cervix soft at day 4, hard at day 5', function(assert) {
  let cycle = this.subject({start_date:'2015-05-01T07:00:00.000'});
  var store = this.store();
  Ember.run(function(){
    store.createRecord("cervixFeeling", {date:'2015-05-01T07:00:00.000', sensation:'HARD', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-02T07:00:00.000', sensation:'HARD', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-03T07:00:00.000', sensation:'SOFT', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-04T07:00:00.000', sensation:'SOFT', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-05T07:00:00.000', sensation:'HARD', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-06T07:00:00.000', sensation:'HARD', cycle:cycle});
  });
  assert.equal(cycle.get('cervix_peak'), 4, 'Cervix SOFT at day 4 then HARD at day 5 : cervix peak should be 4');
});

test('Cervix peak : cervix high at day 4, medium at day 5', function(assert) {
  let cycle = this.subject({start_date:'2015-05-01T07:00:00.000'});
  var store = this.store();
  Ember.run(function(){
    store.createRecord("cervixFeeling", {date:'2015-05-01T07:00:00.000', position:'LOW', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-02T07:00:00.000', position:'LOW', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-03T07:00:00.000', position:'LOW', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-04T07:00:00.000', position:'HIGH', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-05T07:00:00.000', position:'MEDIUM', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-06T07:00:00.000', position:'LOW', cycle:cycle});
  });
  assert.equal(cycle.get('cervix_peak'), 4, 'Cervix HIGH at day 4 then MEDIUM at day 5 : cervix peak should be 4');
});

test('Cervix peak : cervix medium at day 4, low at day 5', function(assert) {
  let cycle = this.subject({start_date:'2015-05-01T07:00:00.000'});
  var store = this.store();
  Ember.run(function(){
    store.createRecord("cervixFeeling", {date:'2015-05-01T07:00:00.000', position:'LOW', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-02T07:00:00.000', position:'LOW', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-03T07:00:00.000', position:'LOW', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-04T07:00:00.000', position:'MEDIUM', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-05T07:00:00.000', position:'LOW', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-06T07:00:00.000', position:'LOW', cycle:cycle});
  });
  assert.equal(cycle.get('cervix_peak'), 4, 'Cervix MEDIUM at day 4 then LOW at day 5 : cervix peak should be 4');
});


test('Cervix peak : cervix high at day 4, low at day 5', function(assert) {
  let cycle = this.subject({start_date:'2015-05-01T07:00:00.000'});
  var store = this.store();
  Ember.run(function(){
    store.createRecord("cervixFeeling", {date:'2015-05-01T07:00:00.000', position:'LOW', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-02T07:00:00.000', position:'LOW', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-03T07:00:00.000', position:'LOW', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-04T07:00:00.000', position:'HIGH', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-05T07:00:00.000', position:'LOW', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-06T07:00:00.000', position:'LOW', cycle:cycle});
  });
  assert.equal(cycle.get('cervix_peak'), 4, 'Cervix HIGH at day 4 then LOW at day 5 : cervix peak should be 4');
});

test('Cervix peak : cervix OPENNED at day 4, SLIGHTLY_OPENNED at day 5', function(assert) {
  let cycle = this.subject({start_date:'2015-05-01T07:00:00.000'});
  var store = this.store();
  Ember.run(function(){
    store.createRecord("cervixFeeling", {date:'2015-05-01T07:00:00.000', opening:'CLOSED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-02T07:00:00.000', opening:'CLOSED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-03T07:00:00.000', opening:'CLOSED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-04T07:00:00.000', opening:'OPENNED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-05T07:00:00.000', opening:'SLIGHTLY_OPENNED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-06T07:00:00.000', opening:'CLOSED', cycle:cycle});
  });
  assert.equal(cycle.get('cervix_peak'), 4, 'Cervix OPENNED at day 4 then SLIGHTLY_OPENNED at day 5 : cervix peak should be 4');
});

test('Cervix peak : cervix SLIGHTLY_OPENNED at day 4, CLOSED at day 5', function(assert) {
  let cycle = this.subject({start_date:'2015-05-01T07:00:00.000'});
  var store = this.store();
  Ember.run(function(){
    store.createRecord("cervixFeeling", {date:'2015-05-01T07:00:00.000', opening:'CLOSED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-02T07:00:00.000', opening:'CLOSED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-03T07:00:00.000', opening:'CLOSED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-04T07:00:00.000', opening:'SLIGHTLY_OPENNED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-05T07:00:00.000', opening:'CLOSED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-06T07:00:00.000', opening:'CLOSED', cycle:cycle});
  });
  assert.equal(cycle.get('cervix_peak'), 4, 'Cervix MEDIUM at day 4 then CLOSED at day 5 : cervix peak should be 4');
});


test('Cervix peak : cervix OPENNED at day 4, CLOSED at day 5', function(assert) {
  let cycle = this.subject({start_date:'2015-05-01T07:00:00.000'});
  var store = this.store();
  Ember.run(function(){
    store.createRecord("cervixFeeling", {date:'2015-05-01T07:00:00.000', opening:'CLOSED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-02T07:00:00.000', opening:'CLOSED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-03T07:00:00.000', opening:'CLOSED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-04T07:00:00.000', opening:'OPENNED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-05T07:00:00.000', opening:'CLOSED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-06T07:00:00.000', opening:'CLOSED', cycle:cycle});
  });
  assert.equal(cycle.get('cervix_peak'), 4, 'Cervix OPENNED at day 4 then CLOSED at day 5 : cervix peak should be 4');
});

//=======================
//Cervix peak plus 3 days
//=======================

test('Cervix peak + 3 days : empty cycle', function(assert) {
  let cycle = this.subject();
  assert.ok(!!cycle);
  assert.equal(cycle.get('cervix_peak_plus_3_days'), undefined, 'Empty cycle : Cervix peak plus three days is undefined');
});

test('Cervix peak + 3 days : Cervix peak at 4', function(assert) {
  let cycle = this.subject({cervix_peak:4});
  assert.ok(!!cycle);
  assert.equal(cycle.get('cervix_peak_plus_3_days'), 7, 'Cervix peak at day 4 : Cervix peak plus three days should be 7');
});

//==========================
//First day of cervix change
//==========================

test('First day of cervix change : empty cycle', function(assert) {
  let cycle = this.subject();
  assert.ok(!!cycle);
  assert.equal(cycle.get('first_day_of_cervix_change'), undefined, 'Empty cycle : First day of cervix change is undefined');
});

test('First day of cervix change : cervix hard at day 2, soft at day 3', function(assert) {
  let cycle = this.subject({start_date:'2015-05-01T07:00:00.000'});
  var store = this.store();
  Ember.run(function(){
    store.createRecord("cervixFeeling", {date:'2015-05-01T07:00:00.000', sensation:'HARD', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-02T07:00:00.000', sensation:'HARD', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-03T07:00:00.000', sensation:'SOFT', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-04T07:00:00.000', sensation:'SOFT', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-05T07:00:00.000', sensation:'HARD', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-06T07:00:00.000', sensation:'HARD', cycle:cycle});
  });
  assert.equal(cycle.get('first_day_of_cervix_change'), 3, 'Cervix HARD at day 2 then SOFT at day 3 : First day of cervix change should be 3');
});

test('First day of cervix change : cervix LOW at day 3, HIGH at day 4', function(assert) {
  let cycle = this.subject({start_date:'2015-05-01T07:00:00.000'});
  var store = this.store();
  Ember.run(function(){
    store.createRecord("cervixFeeling", {date:'2015-05-01T07:00:00.000', position:'LOW', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-02T07:00:00.000', position:'LOW', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-03T07:00:00.000', position:'LOW', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-04T07:00:00.000', position:'HIGH', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-05T07:00:00.000', position:'MEDIUM', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-06T07:00:00.000', position:'LOW', cycle:cycle});
  });
  assert.equal(cycle.get('first_day_of_cervix_change'), 4, 'Cervix LOW at day 3 then HIGH at day 4 : First day of cervix change should be 4');
});

test('First day of cervix change : cervix LOW at day 3, MEDIUM at day 4', function(assert) {
  let cycle = this.subject({start_date:'2015-05-01T07:00:00.000'});
  var store = this.store();
  Ember.run(function(){
    store.createRecord("cervixFeeling", {date:'2015-05-01T07:00:00.000', position:'LOW', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-02T07:00:00.000', position:'LOW', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-03T07:00:00.000', position:'LOW', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-04T07:00:00.000', position:'MEDIUM', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-05T07:00:00.000', position:'LOW', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-06T07:00:00.000', position:'LOW', cycle:cycle});
  });
  assert.equal(cycle.get('first_day_of_cervix_change'), 4, 'Cervix LOW at day 3 then MEDIUM at day 4 : First day of cervix change should be 4');
});

test('First day of cervix change : cervix CLOSED at day 3, OPENNED at day 4', function(assert) {
  let cycle = this.subject({start_date:'2015-05-01T07:00:00.000'});
  var store = this.store();
  Ember.run(function(){
    store.createRecord("cervixFeeling", {date:'2015-05-01T07:00:00.000', opening:'CLOSED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-02T07:00:00.000', opening:'CLOSED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-03T07:00:00.000', opening:'CLOSED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-04T07:00:00.000', opening:'OPENNED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-05T07:00:00.000', opening:'SLIGHTLY_OPENNED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-06T07:00:00.000', opening:'CLOSED', cycle:cycle});
  });
  assert.equal(cycle.get('first_day_of_cervix_change'), 4, 'Cervix CLOSED at day 3 then OPENNED at day 4 : First day of cervix change should be 4');
});

test('First day of cervix change : cervix SLIGHTLY_OPENNED at day 4, CLOSED at day 5', function(assert) {
  let cycle = this.subject({start_date:'2015-05-01T07:00:00.000'});
  var store = this.store();
  Ember.run(function(){
    store.createRecord("cervixFeeling", {date:'2015-05-01T07:00:00.000', opening:'CLOSED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-02T07:00:00.000', opening:'CLOSED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-03T07:00:00.000', opening:'CLOSED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-04T07:00:00.000', opening:'SLIGHTLY_OPENNED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-05T07:00:00.000', opening:'CLOSED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-06T07:00:00.000', opening:'CLOSED', cycle:cycle});
  });
  assert.equal(cycle.get('first_day_of_cervix_change'), 4, 'Cervix CLOSED at day 3 then SLIGHTLY_OPENNED at day 4 : First day of cervix change should be 4');
});

test('First day of cervix change : opening, sensation (first sign) and position', function(assert) {
  let cycle = this.subject({start_date:'2015-05-01T07:00:00.000'});
  var store = this.store();
  Ember.run(function(){
    store.createRecord("cervixFeeling", {date:'2015-05-01T07:00:00.000', sensation:'HARD', position:'LOW', opening:'CLOSED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-02T07:00:00.000', sensation:'SOFT', position:'LOW', opening:'CLOSED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-03T07:00:00.000', sensation:'HARD', position:'MEDIUM', opening:'CLOSED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-04T07:00:00.000', sensation:'HARD', position:'LOW', opening:'OPENNED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-05T07:00:00.000', sensation:'HARD', position:'LOW', opening:'CLOSED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-06T07:00:00.000', sensation:'HARD', position:'LOW', opening:'CLOSED', cycle:cycle});
  });
  assert.equal(cycle.get('first_day_of_cervix_change'), 2, 'Cervix HARD at day 1 then SOFT at day 2 : First day of cervix change should be 2');
});

test('First day of cervix change : opening, sensation and position (first sign)', function(assert) {
  let cycle = this.subject({start_date:'2015-05-01T07:00:00.000'});
  var store = this.store();
  Ember.run(function(){
    store.createRecord("cervixFeeling", {date:'2015-05-01T07:00:00.000', sensation:'HARD', position:'LOW', opening:'CLOSED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-02T07:00:00.000', sensation:'HARD', position:'MEDIUM', opening:'CLOSED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-03T07:00:00.000', sensation:'SOFT', position:'LOW', opening:'CLOSED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-04T07:00:00.000', sensation:'HARD', position:'LOW', opening:'OPENNED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-05T07:00:00.000', sensation:'HARD', position:'LOW', opening:'CLOSED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-06T07:00:00.000', sensation:'HARD', position:'LOW', opening:'CLOSED', cycle:cycle});
  });
  assert.equal(cycle.get('first_day_of_cervix_change'), 2, 'Cervix LOW at day 1 then MEDIUM at day 2 : First day of cervix change should be 2');
});

test('First day of cervix change : opening (first sign), sensation and position', function(assert) {
  let cycle = this.subject({start_date:'2015-05-01T07:00:00.000'});
  var store = this.store();
  Ember.run(function(){
    store.createRecord("cervixFeeling", {date:'2015-05-01T07:00:00.000', sensation:'HARD', position:'LOW', opening:'CLOSED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-02T07:00:00.000', sensation:'HARD', position:'LOW', opening:'OPENNED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-03T07:00:00.000', sensation:'HARD', position:'MEDIUM', opening:'CLOSED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-04T07:00:00.000', sensation:'SOFT', position:'LOW', opening:'CLOSED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-05T07:00:00.000', sensation:'HARD', position:'LOW', opening:'CLOSED', cycle:cycle});
    store.createRecord("cervixFeeling", {date:'2015-05-06T07:00:00.000', sensation:'HARD', position:'LOW', opening:'CLOSED', cycle:cycle});
  });
  assert.equal(cycle.get('first_day_of_cervix_change'), 2, 'Cervix LOW at day 1 then MEDIUM at day 2 : First day of cervix change should be 2');
});


//=================
//Cache temperature
//=================
test('Cache temperature without temperatures ', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('cacheTemperature'), undefined, 'No temperature means no cache temperature');
    
});

test('Cache temperature with equals temperature ', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile});
    store.createRecord('temperature', {date:'2015-05-01T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-02T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-03T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-04T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-05T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-06T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-07T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-08T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-09T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-10T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-11T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-12T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-13T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-14T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-15T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-16T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-17T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-18T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-19T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-20T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-21T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-22T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-23T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-24T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-25T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-26T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-27T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-28T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-29T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-30T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-31T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-06-01T07:00:00.000', temperature:36.5, cycle:cycle});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('cacheTemperature'), undefined, 'Identic temperatures mean no cache temperature');
    
});

test('Cache temperature with temperature from 36.5 to 36.6 and then 37.3 ', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile});
    store.createRecord('temperature', {date:'2015-05-01T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-02T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-03T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-04T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-05T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-06T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-07T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-08T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-09T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-10T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-11T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-12T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-13T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-14T07:00:00.000', temperature:36.6, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-15T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-16T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-17T07:00:00.000', temperature:37.3, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-18T07:00:00.000', temperature:37.3, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-19T07:00:00.000', temperature:37.3, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-20T07:00:00.000', temperature:37.3, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-21T07:00:00.000', temperature:37.3, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-22T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-23T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-24T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-25T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-26T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-27T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-28T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-29T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-30T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-31T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-06-01T07:00:00.000', temperature:36.5, cycle:cycle});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('cacheTemperature'), 36.6, 'With temperatures starting from 36.5, to 36.6 and then 37.3, cache temperature should be 36.6');
    
});

test('Cache temperature with temperature from 36.5 to 36.6 and then 37.3 and parasites temperatures', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile});
    store.createRecord('temperature', {date:'2015-05-01T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-02T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-03T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-04T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-05T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-06T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-07T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-08T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-09T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-10T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-11T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-12T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-13T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-14T07:00:00.000', temperature:37.6, cycle:cycle, ignore:true});
    store.createRecord('temperature', {date:'2015-05-15T07:00:00.000', temperature:36.6, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-16T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-17T07:00:00.000', temperature:37.3, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-18T07:00:00.000', temperature:37.3, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-19T07:00:00.000', temperature:37.3, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-20T07:00:00.000', temperature:37.3, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-21T07:00:00.000', temperature:37.3, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-22T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-23T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-24T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-25T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-26T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-27T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-28T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-29T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-30T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-31T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-06-01T07:00:00.000', temperature:36.5, cycle:cycle});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('cacheTemperature'), 36.6, 'With temperatures starting from 36.5, to 36.6 and then 37.3 but with a parasite of 37.6, cache temperature should be 36.6');
    
});

test('Cache temperature with temperatures from 37.1 to 36.5 (but not enough low temperatures, < 6) and then 37', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile});
    store.createRecord('temperature', {date:'2015-05-01T07:00:00.000', temperature:37.1, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-02T07:00:00.000', temperature:37.1, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-03T07:00:00.000', temperature:37.1, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-04T07:00:00.000', temperature:37.1, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-05T07:00:00.000', temperature:37.1, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-06T07:00:00.000', temperature:37.1, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-07T07:00:00.000', temperature:37.1, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-08T07:00:00.000', temperature:37.1, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-09T07:00:00.000', temperature:37.1, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-10T07:00:00.000', temperature:37.1, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-11T07:00:00.000', temperature:37.1, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-12T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-13T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-14T07:00:00.000', temperature:36.5, cycle:cycle, ignore:true});
    store.createRecord('temperature', {date:'2015-05-15T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-16T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-17T07:00:00.000', temperature:37, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-18T07:00:00.000', temperature:37, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-19T07:00:00.000', temperature:37, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-20T07:00:00.000', temperature:37, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-21T07:00:00.000', temperature:37, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-22T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-23T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-24T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-25T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-26T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-27T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-28T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-29T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-30T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-31T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-06-01T07:00:00.000', temperature:36.5, cycle:cycle});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('cacheTemperature'), undefined, 'With temperatures starting from 37.1 to 36.5 and then 37 but without 6 low temperatures, cache temperature should be undefined');
    
});

test('Cache temperature with temperature from 36.5 to 36.6 and then 37.3, but a modification updates the cache temperature', function(assert) {
  var store = this.store();
  var cycle = null;
  var temperatureToUpdate;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile});
    store.createRecord('temperature', {date:'2015-05-01T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-02T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-03T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-04T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-05T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-06T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-07T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-08T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-09T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-10T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-11T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-12T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-13T07:00:00.000', temperature:36.5, cycle:cycle});
    temperatureToUpdate = store.createRecord('temperature', {date:'2015-05-14T07:00:00.000', temperature:36.6, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-15T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-16T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-17T07:00:00.000', temperature:37.3, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-18T07:00:00.000', temperature:37.3, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-19T07:00:00.000', temperature:37.3, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-20T07:00:00.000', temperature:37.3, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-21T07:00:00.000', temperature:37.3, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-22T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-23T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-24T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-25T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-26T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-27T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-28T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-29T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-30T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-31T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-06-01T07:00:00.000', temperature:36.5, cycle:cycle});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('cacheTemperature'), 36.6, 'With temperatures starting from 36.5, to 36.6 and then 37.3, cache temperature should be 36.6');
  
  Ember.run(function() {
    temperatureToUpdate.set("temperature", 36.7);
  });

  assert.equal(cycle.get('cacheTemperature'), 36.7, 'Update of one temperature updates the cache temperature');

});

test('Cache temperature with temperature from 36.5 to 36.6 and then 36.7', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile});
    store.createRecord('temperature', {date:'2015-05-01T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-02T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-03T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-04T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-05T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-06T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-07T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-08T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-09T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-10T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-11T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-12T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-13T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-14T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-15T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-16T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-17T07:00:00.000', temperature:36.7, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-18T07:00:00.000', temperature:36.7, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-19T07:00:00.000', temperature:36.7, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-20T07:00:00.000', temperature:36.7, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-21T07:00:00.000', temperature:36.7, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-22T07:00:00.000', temperature:36.7, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-23T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-24T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-25T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-26T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-27T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-28T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-29T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-30T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-31T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-06-01T07:00:00.000', temperature:36.5, cycle:cycle});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('cacheTemperature'), 36.5, 'With temperatures starting from 36.5 to 36.7, cache temperature should be 36.5');
  
});

test('Cache temperature with high temperatures before day 10', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile});
    store.createRecord('temperature', {date:'2015-05-01T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-02T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-03T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-04T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-05T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-06T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-07T07:00:00.000', temperature:37.1, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-08T07:00:00.000', temperature:37.1, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-09T07:00:00.000', temperature:37.1, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-10T07:00:00.000', temperature:37.1, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-11T07:00:00.000', temperature:37.1, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-12T07:00:00.000', temperature:37.1, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-13T07:00:00.000', temperature:37.1, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-14T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-15T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-16T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-17T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-18T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-19T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-20T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-21T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-22T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-23T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-24T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-25T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-26T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-27T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-28T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-29T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-30T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-31T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-06-01T07:00:00.000', temperature:36.5, cycle:cycle});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('cacheTemperature'), undefined, 'With high temperatures before day 10, cache temperature should be undefined');
  
});

//============================
//Third day of hot temperature
//============================
test('Third day of hot temperature without temperatures ', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('third_day_hot_temperature'), undefined, 'No temperature means no Third day of hot temperature');
    
});

test('Third day of hot temperature with equals temperature ', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile});
    store.createRecord('temperature', {date:'2015-05-01T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-02T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-03T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-04T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-05T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-06T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-07T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-08T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-09T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-10T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-11T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-12T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-13T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-14T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-15T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-16T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-17T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-18T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-19T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-20T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-21T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-22T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-23T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-24T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-25T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-26T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-27T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-28T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-29T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-30T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-31T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-06-01T07:00:00.000', temperature:36.5, cycle:cycle});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('third_day_hot_temperature'), undefined, 'Identic temperatures mean no Third day of hot temperature');
    
});

test('Third day of hot temperature with temperature from 36.5 to 36.6 and then 37.3 ', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile});
    store.createRecord('temperature', {date:'2015-05-01T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-02T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-03T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-04T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-05T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-06T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-07T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-08T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-09T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-10T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-11T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-12T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-13T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-14T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-15T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-16T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-17T07:00:00.000', temperature:36.6, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-18T07:00:00.000', temperature:36.65, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-19T07:00:00.000', temperature:36.7, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-20T07:00:00.000', temperature:36.7, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-21T07:00:00.000', temperature:36.7, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-22T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-23T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-24T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-25T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-26T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-27T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-28T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-29T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-30T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-31T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-06-01T07:00:00.000', temperature:36.5, cycle:cycle});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('third_day_hot_temperature'), 19, 'With temperatures starting from 36.5, to 36.6 and then 37.3 at day 17, Third day of hot temperature should be 19');
    
});

test('Third day of hot temperature with temperature from 36.5 to 36.7 (3 not hot enough temperatures)', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile});
    store.createRecord('temperature', {date:'2015-05-01T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-02T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-03T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-04T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-05T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-06T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-07T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-08T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-09T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-10T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-11T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-12T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-13T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-14T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-15T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-16T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-17T07:00:00.000', temperature:36.69, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-18T07:00:00.000', temperature:36.69, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-19T07:00:00.000', temperature:36.69, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-20T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-21T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-22T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-23T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-24T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-25T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-26T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-27T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-28T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-29T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-30T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-31T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-06-01T07:00:00.000', temperature:36.5, cycle:cycle});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('third_day_hot_temperature'), undefined, 'With temperatures starting from 36.5, and then 36.7 at day 17 for three days, Third day of hot temperature should be undefined (not enough high temperatures)');
    
});

test('Third day of hot temperature with temperature from 36.5 to 36.7 (with 4 not hot enough temperatures', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile});
    store.createRecord('temperature', {date:'2015-05-01T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-02T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-03T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-04T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-05T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-06T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-07T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-08T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-09T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-10T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-11T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-12T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-13T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-14T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-15T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-16T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-17T07:00:00.000', temperature:36.69, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-18T07:00:00.000', temperature:36.69, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-19T07:00:00.000', temperature:36.69, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-20T07:00:00.000', temperature:36.69, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-21T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-22T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-23T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-24T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-25T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-26T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-27T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-28T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-29T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-30T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-31T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-06-01T07:00:00.000', temperature:36.5, cycle:cycle});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('third_day_hot_temperature'), 20, 'With temperatures starting from 36.5, and then 36.7 at day 17 for four days, Third day of hot temperature should be 20 (4 not enough high temperatures)');
    
});

test('Third day of hot temperature with temperature from 36.5 to 37.1 (with 2 hot temperatures', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile});
    store.createRecord('temperature', {date:'2015-05-01T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-02T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-03T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-04T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-05T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-06T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-07T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-08T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-09T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-10T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-11T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-12T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-13T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-14T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-15T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-16T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-17T07:00:00.000', temperature:37.1, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-18T07:00:00.000', temperature:37.1, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-19T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-20T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-21T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-22T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-23T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-24T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-25T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-26T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-27T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-28T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-29T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-30T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-05-31T07:00:00.000', temperature:36.5, cycle:cycle});
    store.createRecord('temperature', {date:'2015-06-01T07:00:00.000', temperature:36.5, cycle:cycle});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('third_day_hot_temperature'), undefined, 'With temperatures starting from 36.5, and then 37.1 at day 17 for two days, Third day of hot temperature should be undefined (not enough high temperatures)');
    
});

//============================
//End of phase I
//============================
test('End of phase I without phase II beginning ', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile, beginningOfPhaseII:null});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('endOfPhaseI'), undefined, 'No phase II beginning means no phase I');
});

test('End of phase I without phase II beginning at day 1', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile, beginningOfPhaseII:1});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('endOfPhaseI'), undefined, 'Phase II beginning at day 1 means no phase I');
});

test('End of phase I without phase II beginning at day 5', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile, beginningOfPhaseII:5});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('endOfPhaseI'), 4, 'Phase II beginning at day 5 means phase I ended at day 4');
});

//============================
//Beginnings of phase II
//============================
test('Beginnings of phase II without the three signs ', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile, calendarCalculation:undefined,first_day_of_mucus_or_wet:undefined,first_day_of_cervix_change:undefined});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('beginningOfPhaseII'), undefined, 'No signs mean no phase I');
});

test('Beginnings of phase II with calendar calculation ', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile, calendarCalculation:5,first_day_of_mucus_or_wet:null,first_day_of_cervix_change:null});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('beginningOfPhaseII'), 5, 'Just calendar calculation sign at day 5 : Beginnings of phase II at day 4');
});

test('Beginnings of phase II with first day of mucus or wet ', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile, calendarCalculation:null,first_day_of_mucus_or_wet:5,first_day_of_cervix_change:null});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('beginningOfPhaseII'), 5, 'Just first day of mucus or wet sign at day 5 : Beginnings of phase II at day 4');
});

test('Beginnings of phase II with first day of cervix change ', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile, calendarCalculation:null,first_day_of_mucus_or_wet:null,first_day_of_cervix_change:5});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('beginningOfPhaseII'), 5, 'Just first day of cervix change sign at day 5 : Beginnings of phase II at day 4');
});

test('Beginnings of phase II with first day of cervix change and then first day of mucus or wet', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile, calendarCalculation:null,first_day_of_mucus_or_wet:6,first_day_of_cervix_change:5});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('beginningOfPhaseII'), 5, 'First day of cervix change sign at day 5 and first day of mucus or wet at day 6 : Beginnings of phase II at day 4');
});

test('Beginnings of phase II with first day of cervix change and calendarCalculation', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile, calendarCalculation:6,first_day_of_mucus_or_wet:null,first_day_of_cervix_change:5});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('beginningOfPhaseII'), 5, 'First day of cervix change sign at day 5 and first day of mucus or wet at day 6 : Beginnings of phase II at day 4');
});

test('Beginnings of phase II with first day of mucus or wet and calendarCalculation', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile, calendarCalculation:5,first_day_of_mucus_or_wet:6,first_day_of_cervix_change:null});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('beginningOfPhaseII'), 5, 'First day of mucus or wet sign at day 6 and calendarCalculation at day 5 : Beginnings of phase II at day 4');
});

test('Beginnings of phase II with the three signs', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile, calendarCalculation:6,first_day_of_mucus_or_wet:5,first_day_of_cervix_change:7});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('beginningOfPhaseII'), 5, 'Three signs with the first at day 5 : Beginnings of phase II at day 4');
});

//============================
//End of phase II
//============================
test('End of phase II without the three signs ', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile, cervix_peak_plus_3_days:undefined,mucus_peak_plus_3_days:undefined,third_day_hot_temperature:undefined});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('endOfPhaseII'), undefined, 'No signs mean no phase III');
});

test('End of phase II with cervix peak ', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile, cervix_peak_plus_3_days:15,mucus_peak_plus_3_days:undefined,third_day_hot_temperature:undefined});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('endOfPhaseII'), 15, 'Just cervix peak plus three days at day 15 : End of phase II at day 15');
});

test('End of phase II with mucus peak ', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile, cervix_peak_plus_3_days:undefined,mucus_peak_plus_3_days:15,third_day_hot_temperature:undefined});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('endOfPhaseII'), 15, 'Just mucus peak plus three days at day 15 : End of phase II at day 15');
});

test('End of phase II with third day hot temperature ', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile, cervix_peak_plus_3_days:undefined,mucus_peak_plus_3_days:undefined,third_day_hot_temperature:15});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('endOfPhaseII'), 15, 'Just third day hot temperature at day 15 : End of phase II at day 15');
});

test('End of phase II with cervix peak and then mucus peak', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile, cervix_peak_plus_3_days:15,mucus_peak_plus_3_days:16,third_day_hot_temperature:undefined});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('endOfPhaseII'), 16, 'Cervix peak plus 3 days at day 15 and cervix peak plus three days at day 16 : End of phase II at day 16');
});

test('End of phase II with cervix peak and then third day of hot temperature', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile, cervix_peak_plus_3_days:15,mucus_peak_plus_3_days:undefined,third_day_hot_temperature:16});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('endOfPhaseII'), 16, 'Cervix peak plus 3 days at day 15 and third day hot temperature at day 16 : End of phase II at day 16');
});

test('End of phase II with mucus peak and third day hot temperature', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile, cervix_peak_plus_3_days:undefined,mucus_peak_plus_3_days:15,third_day_hot_temperature:16});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('endOfPhaseII'), 16, 'Mucus peak plus three days at day 15 and third day hot temperature at day 16 : End of phase II at day 16');
});

test('End of phase II with the three signs', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile, cervix_peak_plus_3_days:15,mucus_peak_plus_3_days:16,third_day_hot_temperature:17});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('endOfPhaseII'), 17, 'Three signs with the last at day 17 : End of phase II at day 17');
});

//============================
//Beginning of phase III
//============================
test('Beginning of phase III without phase II beginning ', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile, endOfPhaseII:null});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('beginningOfPhaseIII'), undefined, 'No phase II ending means no phase III');
});

test('Beginning of phase III without phase II beginning at day 5', function(assert) {
  var store = this.store();
  var cycle = null;
  var that = this;
  Ember.run(function() {
    var profile = store.createRecord('profile', {temperature_taking_hour:'Sat Mar 01 2015 07:00:00'});
    cycle = that.subject({start_date:'2015-05-01T00:00:00.000', profile:profile, endOfPhaseII:15});
  });

  assert.ok(!!cycle);
  assert.equal(cycle.get('beginningOfPhaseIII'), 16, 'Phase II ended at day 15 means phase III began at day 16');
});