import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('profile', 'Unit | Model | profile', {
  // Specify the other units that are required for this test.
  needs: ["model:cycle", "model:period", "model:temperature", "model:mucus-sample", "model:cervix-feeling"]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

//***************
//shortest_cycle
//***************
test('shortest cycle without cycle', function(assert) {
  let model = this.subject();
  assert.equal(model.get("shortest_cycle"),null, "Profile without cycle : shortest_cycle = null");
});

test('shortest cycle with 1 ended cycle', function(assert) {
  let model = this.subject();
  let store = this.store();
  var cycle = null;
  Ember.run(function() {
  	cycle = store.createRecord("cycle",{
  		start_date:{start_date:'2015-05-01T00:00:00.000'},
  		end_date:{start_date:'2015-06-01T00:00:00.000'},
  		profile:model
  	});
  });
  
  assert.equal(model.get("shortest_cycle.id"),cycle.get("id"), "Profile with one ended cycle : shortest_cycle = cycle");
});

test('shortest cycle with 1 ongoing cycle', function(assert) {
  let model = this.subject();
  let store = this.store();
  var cycle = null;
  Ember.run(function() {
  	cycle = store.createRecord("cycle",{
  		start_date:{start_date:'2015-05-01T00:00:00.000'},
  		end_date:null,
  		profile:model
  	});
  });
  
  assert.equal(model.get("shortest_cycle.id"),null, "Profile with one ongoing cycle : shortest_cycle = null");
});

test('shortest cycle with 3 ended cycles', function(assert) {
  let model = this.subject();
  let store = this.store();
  var short_cycle = null;
  Ember.run(function() {
  	//31 days
  	store.createRecord("cycle",{
  		start_date:{start_date:'2015-05-01T00:00:00.000'},
  		end_date:{start_date:'2015-06-01T00:00:00.000'},
  		profile:model
  	});
  	//30 days
  	short_cycle = store.createRecord("cycle",{
  		start_date:{start_date:'2015-06-02T00:00:00.000'},
  		end_date:{start_date:'2015-07-02T00:00:00.000'},
  		profile:model
  	});
  	//31 days
  	store.createRecord("cycle",{
  		start_date:{start_date:'2015-07-03T00:00:00.000'},
  		end_date:{start_date:'2015-08-03T00:00:00.000'},
  		profile:model
  	});
  });
  
  assert.equal(model.get("shortest_cycle.id"),short_cycle.get("id"), "Profile with one ongoing cycle : shortest_cycle = null");
});

//***************
//longest_cycle
//***************
test('longest cycle without cycle', function(assert) {
  let model = this.subject();
  assert.equal(model.get("longest_cycle"),null, "Profile without cycle : longest_cycle = null");
});

test('longest cycle with 1 ended cycle', function(assert) {
  let model = this.subject();
  let store = this.store();
  var cycle = null;
  Ember.run(function() {
  	cycle = store.createRecord("cycle",{
  		start_date:{start_date:'2015-05-01T00:00:00.000'},
  		end_date:{start_date:'2015-06-01T00:00:00.000'},
  		profile:model
  	});
  });
  
  assert.equal(model.get("longest_cycle.id"),cycle.get("id"), "Profile with one ended cycle : longest_cycle = cycle");
});

test('longest cycle with 1 ongoing cycle', function(assert) {
  let model = this.subject();
  let store = this.store();
  var cycle = null;
  Ember.run(function() {
  	cycle = store.createRecord("cycle",{
  		start_date:{start_date:'2015-05-01T00:00:00.000'},
  		end_date:null,
  		profile:model
  	});
  });
  
  assert.equal(model.get("longest_cycle.id"),null, "Profile with one ongoing cycle : longest_cycle = null");
});

test('longest cycle with 3 ended cycles', function(assert) {
  let model = this.subject();
  let store = this.store();
  var long_cycle = null;
  Ember.run(function() {
  	//31 days
  	store.createRecord("cycle",{
  		start_date:{start_date:'2015-05-01T00:00:00.000'},
  		end_date:{start_date:'2015-06-01T00:00:00.000'},
  		profile:model
  	});
  	//30 days
  	store.createRecord("cycle",{
  		start_date:{start_date:'2015-06-02T00:00:00.000'},
  		end_date:{start_date:'2015-07-02T00:00:00.000'},
  		profile:model
  	});
  	//32 days
  	long_cycle = store.createRecord("cycle",{
  		start_date:{start_date:'2015-07-03T00:00:00.000'},
  		end_date:{start_date:'2015-08-04T00:00:00.000'},
  		profile:model
  	});
  });
  
  assert.equal(model.get("longest_cycle.id"),long_cycle.get("id"), "Profile with 3 ended cycles : longest_cycle = longest cycle");
});

//***************
//active_cycle
//***************
test('active cycle without cycle', function(assert) {
  let model = this.subject();
  assert.equal(model.get("active_cycle"),null, "Profile without cycle : active_cycle = null");
});

test('active cycle with 1 ended cycle', function(assert) {
  let model = this.subject();
  let store = this.store();
  var cycle = null;
  Ember.run(function() {
  	cycle = store.createRecord("cycle",{
  		start_date:{start_date:'2015-05-01T00:00:00.000'},
  		end_date:{start_date:'2015-06-01T00:00:00.000'},
  		profile:model
  	});
  });
  
  assert.equal(model.get("active_cycle.id"),null, "Profile with one ended cycle : active_cycle = null");
});

test('active cycle with 1 ongoing cycle', function(assert) {
  let model = this.subject();
  let store = this.store();
  var cycle = null;
  Ember.run(function() {
  	cycle = store.createRecord("cycle",{
  		start_date:{start_date:'2015-05-01T00:00:00.000'},
  		end_date:null,
  		profile:model
  	});
  });
  
  assert.equal(model.get("active_cycle.id"),cycle.get("id"), "Profile with one ongoing cycle : active_cycle = cycle");
});

test('active cycle with 2 ended cycles and 1 ongoing', function(assert) {
  let model = this.subject();
  let store = this.store();
  var active_cycle = null;
  Ember.run(function() {
  	store.createRecord("cycle",{
  		start_date:{start_date:'2015-05-01T00:00:00.000'},
  		end_date:{start_date:'2015-06-01T00:00:00.000'},
  		profile:model
  	});
  	store.createRecord("cycle",{
  		start_date:{start_date:'2015-06-02T00:00:00.000'},
  		end_date:{start_date:'2015-07-02T00:00:00.000'},
  		profile:model
  	});
  	active_cycle = store.createRecord("cycle",{
  		start_date:{start_date:'2015-07-03T00:00:00.000'},
  		end_date:null,
  		profile:model
  	});
  });
  
  assert.equal(model.get("active_cycle.id"),active_cycle.get("id"), "Profile with 2 ended cycles and 1 ongoing : active_cycle = ongoing cycle");
});