import DS from 'ember-data';

var ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'api'
});

export default ApplicationAdapter;