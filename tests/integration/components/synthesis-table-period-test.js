import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('synthesis-table-period', 'Integration | Component | synthesis table period', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{synthesis-table-period}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#synthesis-table-period}}
      template block text
    {{/synthesis-table-period}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
